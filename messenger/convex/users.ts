import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) return;

    await ctx.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      email: args.email,
      bio: args.bio,
      image: args.image,
      clerkId: args.clerkId,
      followers: 0,
      following: 0,
      posts: 0,
    });
  },
});

export const getAuthenticatedUser = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const currentUser = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .first();
  if (!currentUser) throw new Error("User not found");

  return currentUser;
};

export const updateProfile = mutation({
  args: {
    fullname: v.string(),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    await ctx.db.patch(currentUser._id, {
      fullname: args.fullname,
      bio: args.bio,
    });
  },
});

export const getUserByClerkId = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user;
  },
});

export const getUserProfile = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user) throw new Error("User not found");
    return user;
  },
});

export const isFollowing = query({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const follow = await ctx.db
      .query("follows")
      .withIndex("by_both", (q) =>
        q.eq("followerId", currentUser._id).eq("followingId", args.followingId),
      )
      .first();

    return !!follow;
  },
});

export const toggleFollow = mutation({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existing = await ctx.db
      .query("follows")
      .withIndex("by_both", (q) =>
        q.eq("followerId", currentUser._id).eq("followingId", args.followingId),
      )
      .first();

    const targetUser = await ctx.db.get(args.followingId);

    if (!targetUser) throw new Error("User not found");

    if (existing) {
      await ctx.db.delete(existing._id);

      await ctx.db.patch(currentUser._id, {
        following: Math.max(0, currentUser.following - 1),
      });

      await ctx.db.patch(args.followingId, {
        followers: Math.max(0, targetUser.followers - 1),
      });

      return;
    }

    await ctx.db.insert("follows", {
      followerId: currentUser._id,
      followingId: args.followingId,
    });

    await ctx.db.patch(currentUser._id, {
      following: currentUser.following + 1,
    });

    await ctx.db.patch(args.followingId, {
      followers: targetUser.followers + 1,
    });

    await ctx.db.insert("notifications", {
      receiverId: args.followingId,
      senderId: currentUser._id,
      type: "follow",
    });

    if (targetUser?.pushToken) {
      await ctx.scheduler.runAfter(
        0,
        internal.pushNotifications.sendPushNotification,
        {
          pushToken: targetUser.pushToken,
          title: "Новий підписник 👤",
          body: `${currentUser.username} підписався на вас`,
          data: { userId: currentUser._id },
        },
      );
    }
  },
});

export const getStoriesUsers = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const now = Date.now();

    const follows = await ctx.db
      .query("follows")
      .withIndex("by_follower", (q) => q.eq("followerId", currentUser._id))
      .collect();

    const followingUsers = await Promise.all(
      follows.map((f) => ctx.db.get(f.followingId)),
    );

    const hasActiveStory = async (userId: Id<"users">) => {
      const story = await ctx.db
        .query("stories")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .filter((q) => q.gt(q.field("expiresAt"), now))
        .first();
      return !!story;
    };

    const currentUserHasStory = await hasActiveStory(currentUser._id);

    const stories = [
      {
        id: currentUser._id,
        username: "You",
        avatar: currentUser.image,
        hasStory: currentUserHasStory, // реальна перевірка
      },
      ...(await Promise.all(
        followingUsers
          .filter((user) => user !== null)
          .map(async (user) => ({
            id: user!._id,
            username: user!.username,
            avatar: user!.image,
            hasStory: await hasActiveStory(user!._id), // реальна перевірка
          })),
      )),
    ];

    return stories;
  },
});

export const savePushToken = mutation({
  args: {
    pushToken: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    await ctx.db.patch(currentUser._id, {
      pushToken: args.pushToken,
    });
  },
});

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const toggleBookmark = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existing = await ctx.db
      .query("bookmarks")
      .withIndex("by_both", (q) =>
        q.eq("userId", currentUser._id).eq("postId", args.postId),
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false; // unbookmarked
    } else {
      await ctx.db.insert("bookmarks", {
        userId: currentUser._id,
        postId: args.postId,
      });
      return true; // bookmarked
    }
  },
});

export const getBookmarkedPosts = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => q.eq("userId", currentUser._id))
      .order("desc")
      .collect();

    const bookmarksWithInfo = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const post = await ctx.db.get(bookmark.postId);
        if (!post) return null;

        const author = await ctx.db.get(post.userId);
        if (!author) return null;

        const like = await ctx.db
          .query("likes")
          .withIndex("by_user_and_post", (q) =>
            q.eq("userId", currentUser._id).eq("postId", post._id),
          )
          .first();

        return {
          ...post,
          author: {
            _id: author._id,
            username: author.username,
            image: author.image,
          },
          isLiked: !!like,
          isBookmarked: true,
        };
      }),
    );

    return bookmarksWithInfo.filter((p): p is NonNullable<typeof p> => p !== null);
  },
});


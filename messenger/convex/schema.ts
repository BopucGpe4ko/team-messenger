import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.optional(v.string()),
    fullname: v.optional(v.string()),
    name: v.optional(v.string()),
    email: v.string(),
    bio: v.optional(v.string()),
    image: v.optional(v.string()),
    externalId: v.optional(v.string()),
    clerkId: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()),
    followers: v.optional(v.number()),
    following: v.optional(v.number()),
    posts: v.optional(v.number()),
  }).index("by_clerk_id", ["clerkId"]),

  posts: defineTable({
    caption: v.optional(v.string()),
    userId: v.id("users"),
    imageURL: v.string(),
    storageId: v.id("_storage"),
    likes: v.number(),
    comments: v.number(),
  }),
});

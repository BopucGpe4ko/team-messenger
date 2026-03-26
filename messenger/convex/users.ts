import { mutation } from "./_generated/server";







/*export const storeUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Ви не авторизовані");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (user !== null) {
      return user._id;
    }

    return await ctx.db.insert("users", {
      name: identity.name!,
      email: identity.email!,
      externalId: identity.subject,
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});
*/
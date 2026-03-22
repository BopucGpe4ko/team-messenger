import { query } from "./_generated/server";

export const whoAmI = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return "Ви не авторизовані (Clerk не передав токен)";
    }
    return {
      name: identity.name,
      email: identity.email,
    };
  },
});

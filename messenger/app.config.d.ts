declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV?: "development" | "preview" | "production";
    EXPO_PUBLIC_CONVEX_URL?: string;
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};

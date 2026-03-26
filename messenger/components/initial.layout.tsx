import { useEffect } from "react";
import { useAuth } from "@clerk/expo";
import * as SplashScreen from "expo-splash-screen";
import { Stack, useRouter, useSegments } from "expo-router";
import { api } from "../convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";

export default function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { isAuthenticated } = useConvexAuth();
  const createUser = useMutation(api.users.createUser);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    // if (isAuthenticated) {
    //   createUser();
    // }
    const inAuthScreen = segments[0] === "(auth)";

    // Якщо користувач залогінений — забороняємо тільки auth-екрани.
    // Інші роути (наприклад /user/[id]) мають відкриватися без редіректу.
    if (isSignedIn) {
      if (inAuthScreen) {
        router.replace("/(tabs)");
      }
    } else {
      // Якщо НЕ залогінений — дозволяємо тільки auth-екрани.
      if (!inAuthScreen) {
        router.replace("/(auth)/login");
      }
    }

    // Ховаємо splash тільки після редіректу
    SplashScreen.hideAsync();
  }, [isSignedIn, isLoaded, segments, router, isAuthenticated, createUser]);

  if (!isLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

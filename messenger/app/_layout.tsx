// import InitialLayout from "@/components/initial.layout";
// import { ClerkProvider, useAuth } from "@clerk/expo";
// import { ConvexProviderWithClerk } from "convex/react-clerk";
// import { ConvexReactClient } from "convex/react";
// import { tokenCache } from "@clerk/expo/token-cache";
// import { SafeAreaView } from "react-native-safe-area-context";

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
// const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

// if (!publishableKey) {
//   throw new Error("Add your Clerk Publishable Key to the .env file");
// }

// export default function RootLayout() {
//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
//         <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
//           <InitialLayout />
//         </SafeAreaView>
//       </ConvexProviderWithClerk>
//     </ClerkProvider>
//   );
// }

import { SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/initial.layout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";

import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    JetBrainsMono: require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkAndConvexProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
        <InitialLayout />
      </SafeAreaView>
    </ClerkAndConvexProvider>
  );
}

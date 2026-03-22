import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useSSO } from "@clerk/expo";

export default function LoginScreen() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGooglePress = async () => {
    console.log("Google pressed");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: window.location.origin,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons
            name="accessibility-outline"
            size={24}
            color={COLORS.primary}
          />
        </View>
        <Text style={styles.appName}>UA-Messenger</Text>
        <Text style={styles.tagline}>Find your next adventure</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          resizeMode="contain"
          source={require("@/assets/images/android-icon-foreground.png")}
          style={styles.illustration}
        />
      </View>

      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={0.9}
          onPress={() => {
            handleGooglePress();
          }}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={24} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

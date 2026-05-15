import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "@react-navigation/elements";

export default function NoPostsFound() {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="images-outline" size={48} color={COLORS.primary} />
      <Text style={{ fontSize: 20, color: COLORS.white }}>No posts yet</Text>
    </View>
  );
}

import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function ScreenCreate() {
  const user = useQuery(api.test.whoAmI);
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 18 }}>
        <Text style={{ color: "white" }}>Index Screen</Text>
        {user === undefined
          ? "Секунду..."
          : user
            ? `Привіт, ${user.name}! 👋`
            : "ERROR"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});

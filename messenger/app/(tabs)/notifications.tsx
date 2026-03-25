import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <View style={styles.item}>
        <Text style={styles.text}>🔔 You have a new follower</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.text}>❤️ Someone liked your post</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  item: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  text: {
    color: COLORS.white,
  },
});

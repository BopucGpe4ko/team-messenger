import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar} />

      <Text style={styles.name}>Alexander</Text>
      <Text style={styles.username}>@alex</Text>

      <View style={styles.stats}>
        <Text style={styles.stat}>
          <Text style={styles.bold}>120</Text> Followers
        </Text>
        <Text style={styles.stat}>
          <Text style={styles.bold}>80</Text> Following
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.surfaceLight,
    marginBottom: 12,
  },

  name: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },

  username: {
    color: COLORS.grey,
    marginBottom: 10,
  },

  stats: {
    flexDirection: "row",
    gap: 20,
  },

  stat: {
    color: COLORS.grey,
  },

  bold: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

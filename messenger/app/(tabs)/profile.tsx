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
          <Text style={styles.bold}>120</Text> Following
        </Text>
        <Text style={styles.stat}>
          <Text style={styles.bold}>340</Text> Followers
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
    paddingTop: 50,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceLight,
    marginBottom: 10,
  },
  name: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    color: COLORS.grey,
  },
  stats: {
    flexDirection: "row",
    marginTop: 10,
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

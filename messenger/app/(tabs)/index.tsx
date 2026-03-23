import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS } from "@/constants/theme";

const posts = [
  {
    id: "1",
    name: "Elon Musk",
    username: "@elonmusk",
    text: "Starship launch coming soon 🚀",
  },
  {
    id: "2",
    name: "Mark Zuckerberg",
    username: "@zuck",
    text: "AI is the future 🤖",
  },
];

export default function Feed() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.avatar} />

            <View style={styles.content}>
              <Text style={styles.name}>
                {item.name} <Text style={styles.username}>{item.username}</Text>
              </Text>

              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 10,
  },
  header: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  post: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  username: {
    color: COLORS.grey,
  },
  text: {
    color: COLORS.white,
    marginTop: 4,
  },
});

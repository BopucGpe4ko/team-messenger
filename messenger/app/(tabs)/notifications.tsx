import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

const data = [
  { id: "1", text: "🔥 Elon liked your post" },
  { id: "2", text: "👤 New follower: @john" },
];

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.text}</Text>
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
  },
  header: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  text: {
    color: COLORS.white,
  },
});

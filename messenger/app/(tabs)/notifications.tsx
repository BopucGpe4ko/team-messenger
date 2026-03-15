import { View, Text, StyleSheet } from "react-native";

export default function ScreenNotifications() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Notifications Screen</Text>
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

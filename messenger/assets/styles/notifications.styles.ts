import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#000",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white || "#fff",
    marginBottom: 16,
  },

  // (FlatList container)
  list: {
    paddingBottom: 80,
  },

  // notification item
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.surfaceLight || "#333",
  },

  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },

  // avatar
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  // badge
  iconBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
  },

  content: {
    flex: 1,
  },

  // (username + action)
  text: {
    color: COLORS.white || "#fff",
    fontSize: 14,
  },

  // username
  username: {
    fontWeight: "bold",
  },

  // (time ago)
  time: {
    color: COLORS.grey || "#888",
    fontSize: 12,
    marginTop: 2,
  },

  // (NoNotificationsFound)
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: COLORS.grey || "#888",
    fontSize: 16,
  },
});

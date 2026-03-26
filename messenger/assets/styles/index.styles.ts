import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 10,
  },

  header: {
    color: COLORS.white,
    fontSize: 22,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceLight,
    marginRight: 12,
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
    lineHeight: 20,
  },
  avatarText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  signOutButton: {
    backgroundColor: "#1DA1F2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  signOutText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  signOutBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});

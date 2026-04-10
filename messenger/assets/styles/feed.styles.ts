import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.white,
  },

  // STORY
  storiesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  storyWrapper: { alignItems: "center", marginHorizontal: 8, width: 72 },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    marginBottom: 4,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  storyUsername: { fontSize: 11, color: COLORS.white, textAlign: "center" },
  noStory: {
    borderColor: COLORS.grey,
  },

  // POST
  post: { marginBottom: 16 },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  postHeaderLeft: { flexDirection: "row", alignItems: "center" },
  postAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  postUsername: { fontSize: 14, fontWeight: "600", color: COLORS.white },
  postImage: { width: width, height: width },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  postActionsLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  postInfo: { paddingHorizontal: 12 },
  likesText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 6,
  },
  timeAgo: { fontSize: 12, color: COLORS.grey, marginBottom: 8 },

  // MODAL
  modalContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.surface,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },

  commentContainer: {
    flex: 1,
    padding: 16,
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.surface,
  },
});

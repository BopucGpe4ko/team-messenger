import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export const styles = StyleSheet.create({
  // ================= HEADER =================
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },

  headerLeft: {
    flex: 1,
  },

  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.grey,
    marginBottom: 10,
  },

  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },

  logoutButton: {
    padding: 8,
  },

  // ================= PROFILE INFO =================
  profileInfo: {
    padding: 16,
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  avatarContainer: {
    width: 86,
    height: 86,
    borderRadius: 43,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
  },

  avatar: {
    width: "100%",
    height: "100%",
  },

  statsContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  statLabel: {
    color: COLORS.grey,
    fontSize: 12,
  },

  name: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  bio: {
    color: COLORS.grey,
    fontSize: 14,
    marginBottom: 12,
  },

  // ================= ACTION BUTTONS =================
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },

  editButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    alignItems: "center",
  },

  editButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },

  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
  },

  // ================= GRID =================
  grid: {
    marginTop: 10,
  },

  gridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
    backgroundColor: COLORS.surface,
  },

  gridImage: {
    width: "100%",
    height: "100%",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  emptyText: {
    color: COLORS.grey,
    fontSize: 14,
  },

  // ================= MODALS =================
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },

  // ================= EDIT PROFILE MODAL =================
  editModalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  editHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  editTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },

  saveButton: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  // ================= INPUT =================
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 12,
    color: COLORS.white,
    marginBottom: 12,
  },

  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  stat: {
    color: COLORS.grey,
  },

  bold: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

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

  shareButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  shareText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 16,
  },

  emptyImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyImageText: {
    color: COLORS.grey,
    marginTop: 10,
    fontSize: 16,
  },

  imageSection: {
    width: width,
    height: width,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  previewImage: {
    width: "100%",
    height: "100%",
  },

  changeImageButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 8,
    borderRadius: 6,
  },

  inputSection: {
    padding: 16,
  },

  captionInput: {
    color: COLORS.white,
    fontSize: 16,
    minHeight: 40,
  },

  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.white,
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

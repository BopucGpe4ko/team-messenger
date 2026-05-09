import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useAuth } from "@clerk/expo";
import { useMutation, useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Loader } from "@/components/Loader";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";

function NoPostsFound() {
  return (
    <View style={styles.noPostsContainer}>
      <Ionicons name="images-outline" size={48} color={COLORS.primary} />
      <Text style={{ fontSize: 20, color: COLORS.white }}>No posts yet</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { signOut, userId } = useAuth();
  const router = useRouter();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);

  const currentUser = useQuery(
    api.users.getUserByClerkId,
    userId ? { clerkId: userId } : "skip",
  );

  const posts = useQuery(api.posts.getPostsByUser, {});
  const updateProfile = useMutation(api.users.updateProfile);

  const [editedProfile, setEditedProfile] = useState({
    fullname: "",
    bio: "",
  });

  useEffect(() => {
    if (currentUser) {
      setEditedProfile({
        fullname: currentUser.fullname || "",
        bio: currentUser.bio || "",
      });
    }
  }, [currentUser]);

  const handleSaveProfile = async () => {
    await updateProfile(editedProfile);
    setIsEditModalVisible(false);
  };

  if (!currentUser || posts === undefined) return <Loader />;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>{currentUser.username}</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => router.push("/chats")}
          >
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerIcon} onPress={() => signOut()}>
            <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE INFO */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarAndStats}>
            <Image
              source={currentUser.image}
              style={styles.avatar}
              contentFit="cover"
            />

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.posts || 0}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {currentUser.followers || 0}
                </Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {currentUser.following || 0}
                </Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <Text style={styles.name}>{currentUser.fullname}</Text>

          {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditModalVisible(true)}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* POSTS */}
        {posts.length === 0 ? (
          <NoPostsFound />
        ) : (
          <FlatList
            data={posts}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => setSelectedPost(item)}
              >
                <Image
                  source={item.imageUrl}
                  style={styles.gridImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>

      {/* POST MODAL */}
      <Modal visible={!!selectedPost} animationType="fade" transparent>
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedPost(null)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          {selectedPost && (
            <Image
              source={selectedPost.imageUrl}
              style={styles.postDetailImage}
              contentFit="contain"
            />
          )}
        </View>
      </Modal>

      {/* EDIT PROFILE MODAL */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Profile</Text>

                <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                  <Ionicons name="close" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                value={editedProfile.fullname}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    fullname: text,
                  }))
                }
                placeholder="Name"
                placeholderTextColor={COLORS.grey}
              />

              <TextInput
                style={[styles.input, { height: 80 }]}
                value={editedProfile.bio}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    bio: text,
                  }))
                }
                placeholder="Bio"
                multiline
                placeholderTextColor={COLORS.grey}
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerIcon: {
    padding: 4,
  },

  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  profileInfo: {
    padding: 15,
  },

  avatarAndStats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#333",
  },

  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    color: COLORS.grey,
  },

  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  bio: {
    color: "white",
    marginTop: 5,
  },

  actionButtons: {
    marginTop: 15,
  },

  editButton: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
  },

  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  gridItem: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 1,
  },

  gridImage: {
    width: "100%",
    height: "100%",
  },

  noPostsContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },

  postDetailImage: {
    width: "100%",
    height: 400,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: "#333",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#111",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

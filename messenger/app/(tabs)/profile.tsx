import { styles } from "@/assets/styles/profile.styles";
import { Loader } from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ScreenProfile() {
  const { signOut, userId } = useAuth();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // 🔥 Queries
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

  const handleSaveProfile = async () => {
    await updateProfile(editedProfile);
    setIsEditModalVisible(false);
  };

  if (!currentUser || posts === undefined) return <Loader />;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.username}>{currentUser.username}</Text>

        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
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
                <Text style={styles.statNumber}>{currentUser.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <Text style={styles.name}>{currentUser.fullname}</Text>

          {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEditedProfile({
                  fullname: currentUser.fullname,
                  bio: currentUser.bio || "",
                });
                setIsEditModalVisible(true);
              }}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <Link href="/chats" asChild>
              <TouchableOpacity
                style={StyleSheet.flatten([
                  styles.shareButton,
                  { marginLeft: 10 },
                ])}
              >
                <Ionicons
                  name="chatbubbles-outline"
                  size={20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* GRID */}
        {posts.length === 0 && (
          <Text style={{ color: "white", textAlign: "center" }}>
            No posts yet
          </Text>
        )}

        <FlatList
          data={posts}
          numColumns={3}
          scrollEnabled={false}
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
          keyExtractor={(item) => item._id}
        />
      </ScrollView>

      {/* 🔥 MODAL POST */}
      <Modal visible={!!selectedPost} transparent>
        <View style={styles.modalBackdrop}>
          {selectedPost && (
            <>
              <TouchableOpacity
                onPress={() => setSelectedPost(null)}
                style={{ position: "absolute", top: 50, right: 20 }}
              >
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>

              <Image
                source={selectedPost.imageUrl}
                style={styles.postDetailImage}
              />
            </>
          )}
        </View>
      </Modal>

      {/* 🔥 EDIT PROFILE MODAL */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

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
                placeholderTextColor="gray"
              />

              <TextInput
                style={[styles.input, { height: 100 }]}
                value={editedProfile.bio}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    bio: text,
                  }))
                }
                placeholder="Bio"
                placeholderTextColor="gray"
                multiline
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

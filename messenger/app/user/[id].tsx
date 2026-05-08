import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useAuth } from "@clerk/expo";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Id } from "@/convex/_generated/dataModel";

export default function UserProfileScreen() {
  const { userId: clerkId } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const currentUser = useQuery(
    api.users.getUserByClerkId,
    clerkId ? { clerkId } : "skip"
  );

  const profileUser = useQuery(
    api.users.get,
    id ? { id: id as Id<"users"> } : "skip"
  );

  const getOrCreateConversation = useMutation(api.chat.getOrCreateConversation);

  if (!currentUser || !profileUser) return <Loader />;

  const handleMessagePress = async () => {
    try {
      const conversationId = await getOrCreateConversation({
        userId: currentUser._id,
        otherUserId: profileUser._id,
      });
      router.push(`/chat/${conversationId}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{profileUser.username}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
          {/* Avatar and Stats */}
          <View style={styles.avatarAndStats}>
            <View style={styles.avatarContainer}>
              <Image
                source={profileUser.image}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileUser.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileUser.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profileUser.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          {/* Name and Bio */}
          <Text style={styles.name}>{profileUser.fullname}</Text>
          {profileUser.bio && <Text style={styles.bio}>{profileUser.bio}</Text>}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton} onPress={handleMessagePress}>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.white} />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.surface,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
  },
  placeholder: {
    width: 32,
  },
  profileInfo: {
    padding: 16,
  },
  avatarAndStats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 32,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: COLORS.surface,
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
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.grey,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: COLORS.white,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  followButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  followButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
  messageButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  messageButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

import { styles } from "@/assets/styles/profile.styles";
import { Loader } from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const getOrCreateConversation = useMutation(api.chat.getOrCreateConversation);

  const { user } = useUser();

  const profile = useQuery(api.users.getUserProfile, {
    id: id as Id<"users">,
  });

  const posts = useQuery(api.posts.getPostsByUser, {
    userId: id as Id<"users">,
  });

  const isFollowing = useQuery(api.users.isFollowing, {
    followingId: id as Id<"users">,
  });

  const toggleFollow = useMutation(api.users.toggleFollow);

  if (
    profile === undefined ||
    posts === undefined ||
    isFollowing === undefined
  ) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{profile.username}</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* PROFILE */}
      <View>
        <View style={styles.profileInfo}>
          <View style={styles.avatarAndStats}>
            <Image
              source={profile.image}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="memory-disk"
            />

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{profile.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <Text style={styles.name}>{profile.fullname}</Text>

          {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}

          {/* ACTION BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              gap: 10,
            }}
          >
            {/* FOLLOW */}
            <Pressable
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
                { flex: 1 },
              ]}
              onPress={() =>
                toggleFollow({
                  followingId: id as Id<"users">,
                })
              }
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </Pressable>

            {/* MESSAGE */}
            <Pressable
              style={[
                styles.followButton,
                {
                  flex: 1,
                  backgroundColor: COLORS.primary,
                },
              ]}
              onPress={async () => {
                try {
                  if (!user) return;

                  const conversationId = await getOrCreateConversation({
                    currentUserId: user.id,
                    otherUserId: profile.clerkId,
                  });

                  const name = profile.fullname || profile.username || "Chat";

                  router.push({
                    pathname: "/(chat)/[id]",
                    params: {
                      id: conversationId,
                      otherUserId: profile.clerkId,
                      name,
                    },
                  });
                } catch (error) {
                  console.log("CHAT ERROR:", error);
                }
              }}
            >
              <Text style={styles.followButtonText}>Message</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* POSTS */}
      <View style={styles.postsGrid}>
        {posts.length === 0 ? (
          <View style={styles.noPostsContainer}>
            <Ionicons name="images-outline" size={48} color={COLORS.grey} />

            <Text style={styles.noPostsText}>No posts yet</Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.gridItem}>
                <Image
                  source={item.imageUrl}
                  style={styles.gridImage}
                  contentFit="cover"
                  transition={200}
                  cachePolicy="memory-disk"
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

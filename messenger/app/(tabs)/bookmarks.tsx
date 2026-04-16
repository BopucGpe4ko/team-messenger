import { Link } from "expo-router";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { styles } from "@/assets/styles/feed.styles";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/Loader";
import { Image } from "expo-image";
import { COLORS } from "@/constants/theme";

const NoBookmarksFound = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.background,
    }}
  >
    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>
      No Bookmarks Found
    </Text>
    <Text style={{ color: COLORS.grey, marginTop: 8 }}>
      Saved posts will appear here
    </Text>
  </View>
);

export default function ScreenBookmarks() {
  const { isAuthenticated } = useConvexAuth();
  const bookmarkedPosts = useQuery(
    api.bookmarks.getBookmarkedPosts,
    isAuthenticated ? {} : "skip",
  );

  if (bookmarkedPosts === undefined) {
    return <Loader />;
  }

  if (bookmarkedPosts.length === 0) {
    return <NoBookmarksFound />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookmarkedPosts.map((post) => {
          if (!post) return null;
          return (
            <View key={post._id} style={{ width: "33.33%", padding: 1 }}>
              {/* Обгортаємо зображення в Link */}
              <Link href={`/(post)/${post._id}`} asChild>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    source={post.imageUrl}
                    style={{ width: "100%", aspectRatio: 1 }}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                  />
                </TouchableOpacity>
              </Link>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

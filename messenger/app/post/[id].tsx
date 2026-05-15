import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Post } from "@/components/Post";
// import { Comment } from "@/components/Comment";
import { Loader } from "@/components/Loader";
import { COLORS } from "@/constants/theme";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: Id<"posts"> }>();
  const post = useQuery(api.posts.getPostById, id ? { postId: id } : "skip");

  // console.log(post);

  if (post === undefined) return <Loader />;
  if (post === null) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Post post={post} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: COLORS.white,
    fontSize: 18,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
  },
  commentsTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  noCommentsText: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 10,
  },
});

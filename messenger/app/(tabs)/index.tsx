import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useAuth } from "@clerk/expo";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Story from "@/components/Story";
import Post from "@/components/Post";
import Loader from "@/components/Loader";
import { STORIES } from "@/constants/mock-data";
import styles from "@/styles/feed.styles";

export default function Feed() {
  const { signOut } = useAuth();

  // 🔥 Convex вместо Zustand
  const posts = useQuery(api.posts.getPosts);

  // 🔄 Loader
  if (posts === undefined) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        // 🔝 HEADER + STORIES
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Feed</Text>

              <TouchableOpacity onPress={() => signOut()}>
                <Text style={styles.logout}>Logout</Text>
              </TouchableOpacity>
            </View>

            {/* STORIES */}
            <FlatList
              data={STORIES}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <Story story={item} />}
            />
          </>
        }
        // 🧾 POSTS
        renderItem={({ item }) => <Post post={item} />}
      />
    </SafeAreaView>
  );
}

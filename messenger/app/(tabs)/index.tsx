import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useAuth } from "@clerk/expo";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Story from "../../components/Story";
import { Post } from "../../components/Post";
import { Loader } from "../../components/Loader";
import { STORIES } from "../../components/mock-data";
import { styles } from "../../assets/styles/feed.styles";
import StoriesSection from "../../components/StoriesSection";

export default function Feed() {
  const { signOut } = useAuth();
  const posts = useQuery(api.posts.getPosts);

  if (posts === undefined) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Feed</Text>

              <TouchableOpacity onPress={() => signOut()}>
                <Text style={{ color: "red" }}>Logout</Text>
              </TouchableOpacity>
            </View>

            {/* STORIES */}
            <StoriesSection />
          </>
        }
        renderItem={({ item }) => <Post post={item} />}
      />
    </SafeAreaView>
  );
}

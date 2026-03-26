import { styles } from "@/assets/styles/index.styles";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { usePostsStore } from "@/store/postsStore";
import { useAuth } from "@clerk/expo";

export default function Feed() {
  const posts = usePostsStore((state) => state.posts);
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <Text style={styles.header}>Feed</Text>

              <TouchableOpacity
                style={styles.signOutBtn}
                onPress={() => {
                  if (signOut) {
                    signOut();
                  } else {
                    console.log("SignOut not ready");
                  }
                }}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.name}>
                {item.name}{" "}
                <Text style={styles.username}>{item.username} · now</Text>
              </Text>

              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// import { styles } from "@/styles/feed.styles";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
//////ЗАГЛУШКА СТИЛІ///////
const styles: any = {
  storyWrapper: { alignItems: "center", marginHorizontal: 8, width: 72 },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    marginBottom: 4,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  storyUsername: { fontSize: 11, color: COLORS.white, textAlign: "center" },
};
//////////////////////////////

export default function Story({ story }: { story: any }) {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image source={story.avatar} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  );
}

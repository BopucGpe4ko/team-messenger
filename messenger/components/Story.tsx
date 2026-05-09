import { styles } from "@/assets/styles/feed.styles";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  story: any;
  onPress?: () => void;
};

export default function Story({ story, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.storyWrapper} onPress={onPress}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image source={story.avatar} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  );
}

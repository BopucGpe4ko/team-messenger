import { FlatList, View } from "react-native";
import Story from "@/components/Story";
import { STORIES } from "@/constants/mock-data";
import { styles } from "@/styles/feed.styles";

export default function StoriesSection() {
  return (
    <View style={styles.storiesContainer}>
      <FlatList
        data={STORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Story story={item} />}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}

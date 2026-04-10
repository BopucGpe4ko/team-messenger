import { FlatList, View } from "react-native";
import Story from "./Story";
import { STORIES } from "./mock-data";
import { styles } from "../assets/styles/feed.styles";

export default function StoriesSection() {
  return (
    <View style={styles.storiesContainer}>
      <FlatList
        data={STORIES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Story story={item} />}
      />
    </View>
  );
}

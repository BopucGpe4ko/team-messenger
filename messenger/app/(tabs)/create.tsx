import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { usePostsStore } from "@/store/postsStore";
import { styles } from "@/assets/styles/create.styles";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";



export default function Create() {
  const [text, setText] = useState("");
  const addPost = usePostsStore((state) => state.addPost);

  const handlePost = () => {
    if (!text.trim()) return;

    addPost(text);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Post</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="What's happening?"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

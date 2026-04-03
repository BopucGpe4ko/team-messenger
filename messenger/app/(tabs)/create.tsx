import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { styles } from "@/assets/styles/create.styles";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

export default function CreateScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleShare = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSelectedImage(null);
      setCaption("");
    }, 1500);
  };

  if (!selectedImage) {
    return (
      <View style={[styles.container, loading && { opacity: 0.7 }]}>
        <View style={styles.header}>
          <View style={{ width: 28 }} />
          <Text style={styles.headerTitle}>New Post</Text>
          <View style={{ width: 28 }} />
        </View>

        <TouchableOpacity
          style={styles.emptyImageContainer}
          onPress={pickImage}
        >
          <Ionicons name="image-outline" size={50} color={COLORS.grey} />
          <Text style={styles.emptyImageText}>Tap to select image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedImage(null)}>
          <Ionicons name="close" size={28} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Post</Text>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <Text style={styles.shareText}>Share</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <View style={styles.imageSection}>
        <Image source={selectedImage} style={styles.previewImage} />
        <TouchableOpacity
          style={styles.changeImageButton}
          onPress={pickImage}
          disabled={loading}
        >
          <Ionicons name="image" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* INPUT */}
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Write something..."
          placeholderTextColor={COLORS.grey}
          value={caption}
          onChangeText={setCaption}
          style={styles.captionInput}
          multiline
        />
      </View>
    </View>
  );
}

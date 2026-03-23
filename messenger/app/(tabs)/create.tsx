import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { COLORS } from "@/constants/theme";
import { useState } from "react";

export default function Create() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What's happening?"
        placeholderTextColor={COLORS.grey}
        style={styles.input}
        multiline
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  input: {
    color: COLORS.white,
    fontSize: 18,
    minHeight: 100,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatConversationScreen() {
  const { id } = useLocalSearchParams();

  const { userId } = useAuth();

  const [message, setMessage] = useState("");

  const messages = useQuery(api.chat.getMessages, {
    conversationId: id as Id<"conversations">,
  });

  const sendMessage = useMutation(api.chat.sendMessage);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage({
        conversationId: id as Id<"conversations">,
        content: message,
      });

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          inverted
          contentContainerStyle={styles.messagesContainer}
          renderItem={({ item }) => {
            const isMyMessage = item.sender?.clerkId === userId;

            return (
              <View
                style={[
                  styles.messageWrapper,
                  isMyMessage
                    ? styles.myMessageWrapper
                    : styles.otherMessageWrapper,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isMyMessage
                      ? styles.myMessageBubble
                      : styles.otherMessageBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isMyMessage && styles.myMessageText,
                    ]}
                  >
                    {item.content}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.grey}
            style={styles.input}
          />

          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboard: {
    flex: 1,
  },

  messagesContainer: {
    padding: 16,
  },

  messageWrapper: {
    marginBottom: 12,
    flexDirection: "row",
  },

  myMessageWrapper: {
    justifyContent: "flex-end",
  },

  otherMessageWrapper: {
    justifyContent: "flex-start",
  },

  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },

  myMessageBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },

  otherMessageBubble: {
    backgroundColor: COLORS.surfaceLight,
    borderBottomLeftRadius: 4,
  },

  messageText: {
    color: COLORS.white,
    fontSize: 15,
  },

  myMessageText: {
    color: COLORS.white,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceLight,
    backgroundColor: COLORS.background,
  },

  input: {
    flex: 1,
    backgroundColor: COLORS.surface,
    color: COLORS.white,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginRight: 10,
  },

  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

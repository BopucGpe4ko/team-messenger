import { View, Text, Image, FlatList } from "react-native";
import { styles } from "@/assets/styles/notifications.styles";

import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Notifications() {
  const { isAuthenticated } = useConvexAuth();

  const notifications = useQuery(
    api.notifications.getNotifications,
    isAuthenticated ? {} : "skip",
  );

  if (notifications === undefined) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Loading...</Text>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No notifications yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const type = item.type;

          return (
            <View style={styles.notificationItem}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: item.sender?.image }}
                  style={styles.avatar}
                />

                <View
                  style={[
                    styles.iconBadge,
                    {
                      backgroundColor:
                        type === "like"
                          ? "#ef4444"
                          : type === "comment"
                            ? "#3b82f6"
                            : "#8b5cf6",
                    },
                  ]}
                >
                  <Text style={{ fontSize: 10 }}>
                    {type === "like" ? "❤️" : type === "comment" ? "💬" : "👤"}
                  </Text>
                </View>
              </View>

              <View style={styles.content}>
                <Text style={styles.text}>
                  <Text style={styles.username}>{item.sender?.username} </Text>

                  {type === "like" && "liked your post"}
                  {type === "follow" && "started following you"}
                  {type === "comment" && `commented: ${item.comment?.content}`}
                </Text>

                <Text style={styles.time}>
                  {new Date(item._creationTime).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

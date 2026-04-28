import { Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
//import { styles } from "@/assets/styles/notification.styles"; =====ROZKOMENTUVATY======

import { Id } from "@/convex/_generated/dataModel";

interface NotificationProps {
  notification: {
    type: "like" | "comment" | "follow";
    sender: {
      _id: Id<"users">;
      username: string;
      image: string;
    };
    post: {
      imageUrl: string;
    } | null;
    comment: string | undefined;
    _creationTime: number;
  };
}

export function NotificationItem({ notification }: NotificationProps) {
  return (
    <View style={styles.notificationItem}>
      {/* CONTENT */}
      <View style={styles.notificationContent}>
        {/* Avatar with Icon Badge */}
        <Link href={`/user/${notification.sender._id}` as any} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.iconBadge}>
              {notification.type === "like" ? (
                <Ionicons name="heart" size={14} color={COLORS.primary} />
              ) : notification.type === "follow" ? (
                <Ionicons name="person-add" size={14} color="#8B5CF6" />
              ) : (
                <Ionicons name="chatbubble" size={14} color="#3B82F6" />
              )}
            </View>
          </TouchableOpacity>
        </Link>
 
        {/* Notification Info */}
        <View style={styles.notificationInfo}>
          <Link href={`/user/${notification.sender._id}` as any} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>
 
          <Text style={styles.action}>
            {notification.type === "follow"
              ? "started following you"
              : notification.type === "like"
                ? "liked your post"
                : `commented: "${notification.comment}"`}
          </Text>
 
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
 
      {/* Post Image (if exists) */}
      {notification.post && (
        <Image
          source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  notificationContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  iconBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  notificationInfo: {
    flex: 1,
  },
  username: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  action: {
    color: COLORS.grey,
    fontSize: 14,
    marginBottom: 2,
  },
  timeAgo: {
    color: COLORS.grey,
    fontSize: 12,
  },
  postImage: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
});
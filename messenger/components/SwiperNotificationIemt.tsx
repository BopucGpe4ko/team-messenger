import { styles } from "@/assets/styles/notifications.styles";
import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
// Імпорти для анімацій
import Animated, {
  useAnimatedStyle, // Хук для створення анімованих стилів
  useSharedValue, // Хук для створення значень, що живуть на UI потоці
  withTiming, // Функція для анімації з фіксованим часом
  runOnJS, // Функція для виклику JS-коду з UI потоку (DEPRECATED)
  interpolate, // Функція для мапінгу значень
  Extrapolation, // Константи для обмеження interpolate
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler"; // Імпорти для жестів
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";

interface NotificationProps {
  notification: {
    _id: Id<"notifications">;
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

  onDelete: (id: Id<"notifications">) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export function SwiperNotificationItem({
  notification,
  onDelete,
}: NotificationProps) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleDelete = () => {
    onDelete(notification._id);
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.min(0, event.translationX);
    })
    .onEnd((event) => {
      if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () =>
          runOnJS(handleDelete)(),
        );
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  // ═══════════════════════════════════════════════════════════
  // ANIMATED STYLES — стилі, що реагують на shared values
  // ═══════════════════════════════════════════════════════════

  // Стиль для контенту — рухається разом з пальцем
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Стиль для кнопки видалення — з'являється при свайпі
  const deleteButtonStyle = useAnimatedStyle(() => {
    // interpolate — перетворює одні значення в інші
    // Вхід: translateX від -SWIPE_THRESHOLD до 0
    // Вихід: opacity від 1 до 0
    const opacity = interpolate(
      translateX.value, // Вхідне значення
      [-SWIPE_THRESHOLD, 0], // Вхідний діапазон
      [1, 0], // Вихідний діапазон
      Extrapolation.CLAMP, // Не виходити за межі
    );

    return { opacity };
  });

  return (
    <View style={swipeStyles.container}>
      <Animated.View style={[swipeStyles.deleteButton, deleteButtonStyle]}>
        <Ionicons name="trash-outline" size={24} color={COLORS.white} />
        <Text style={swipeStyles.deleteText}>Delete</Text>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[swipeStyles.content, animatedStyle]}>
          <View style={styles.notificationItem}>
            {/* CONTENT */}
            <View style={styles.notificationContent}>
              {/* Avatar with Icon Badge */}
              <Link href={`/(user)/${notification.sender._id}`} asChild>
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
                <Link href={`/notifications`}>
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
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const swipeStyles = StyleSheet.create({
  // Контейнер — потрібен для position: absolute кнопки
  container: {
    position: "relative", // Створює контекст позиціонування
    marginBottom: 20, // Відступ між елементами
  },

  // Контент — має фон, щоб перекривати кнопку
  content: {
    backgroundColor: COLORS.background, // Важливо! Інакше кнопка буде видна
  },

  // Кнопка видалення — прихована під контентом
  deleteButton: {
    position: "absolute", // Вийнята з потоку документа
    right: 0, // Прив'язана до правого краю
    top: 0, // Розтягнута на всю висоту
    bottom: 0,
    width: 100, // Фіксована ширина
    backgroundColor: "#EF4444", // Червоний колір
    justifyContent: "center", // Центрування вмісту
    alignItems: "center",
    borderRadius: 8,
  },

  deleteText: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 4,
  },
});

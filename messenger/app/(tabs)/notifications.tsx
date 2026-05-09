import { styles } from "@/assets/styles/notifications.styles";
import { Loader } from "@/components/Loader";
import NoNotificationsFound from "@/components/NoNotificationsFound";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { FlatList, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import SwiperNotificationItem from "@/components/SwiperNotificationItem";

export default function ScreenNotifications() {
  const { isAuthenticated } = useConvexAuth();
  const notifications = useQuery(
    api.notifications.getNotifications,
    isAuthenticated ? {} : "skip",
  );

  const deleteNotification = useMutation(api.notifications.deleteNotification);
  const handleDeleteNotification = async (
    notificationId: Id<"notifications">,
  ) => {
    try {
      // Викликаємо mutation на сервері
      await deleteNotification({ notificationId });
      // Convex автоматично оновить UI після успішного видалення
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  if (notifications === undefined) {
    return <Loader />;
  }

  if (notifications.length === 0) {
    return <NoNotificationsFound />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <SwiperNotificationItem
              notification={item}
              onDelete={handleDeleteNotification}
            />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </GestureHandlerRootView>
  );
}

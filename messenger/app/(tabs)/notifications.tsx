// import { styles } from "@/assets/styles/notification.styles"; ==== Rozkomentuvaty =======
import { COLORS } from "@/constants/theme";
import { Loader } from "@/components/Loader";
import NoNotificationFound from "@/components/NoNotificationsFound";
import { NotificationItem } from "@/components/NotificationItem";
import { api } from "@/convex/_generated/api";
import { useConvexAuth, useQuery } from "convex/react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ScreenNotifications() {
  const { isAuthenticated } = useConvexAuth();

  const notifications = useQuery(
    api.notification.getNotifications,
    isAuthenticated ? {} : "skip",
  );

  if (notifications === undefined) {
    return <Loader />;
  }

  if (notifications.length === 0) {
    return <NoNotificationFound />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Medium",
    color: COLORS.primary,
  },
  listContainer: {
    padding: 16,
  },
});

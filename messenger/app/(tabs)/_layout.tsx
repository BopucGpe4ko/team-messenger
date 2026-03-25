import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,

        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="notifications-none"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

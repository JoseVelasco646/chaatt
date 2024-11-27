import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: "#008dd5",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        headerStyle: { backgroundColor: "#000" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contactos",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comments" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

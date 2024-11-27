import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Ajustes",
        }}
      />
      <Stack.Screen
        name="editProfile"
        options={{
          title: "Editar Perfil",
        }}
      />
    </Stack>
  );
}

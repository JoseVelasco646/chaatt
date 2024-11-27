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
          title: "Contactos",
        }}
      />
      <Stack.Screen
        name="newContact"
        options={{
          title: "Nuevo contacto",
        }}
      />
      <Stack.Screen
        name="newContacto"
        options={{
          title: "Nuevo contacto",
        }}
      />
      <Stack.Screen
        name="newGroup"
        options={{
          title: "Nuevo grupo",
        }}
      />
      <Stack.Screen
        name="createGroup"
        options={{
          title: "Crear grupo",
        }}
      />
    </Stack>
  );
}

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const Settings: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ajustes</Text>

      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.phoneNumber}>+52 646 521 4243 </Text>
        <Text style={styles.userName}>Jose Velasco</Text>
      </View>

      {/* Opciones */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/settings/editProfile")}
      >
        <View style={styles.optionContent}>
          <FontAwesome name="key" size={20} color="#fff" />
          <Text style={styles.optionText}>Cuenta</Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: 50,
  },
  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  phoneNumber: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userName: {
    color: "#888",
    fontSize: 14,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Settings;

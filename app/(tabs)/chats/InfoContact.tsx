import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const UserProfile = () => {
  const router = useRouter();
  const goToUserProfile = () => {
    router.push("/chats/OptionMedia");
  };
  return (
    <View style={styles.container}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>Información de contacto</Text>

        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.name}>Jose Velasco</Text>
          <Text style={styles.username}>@josevelascoxd</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.mediaLinksBox} onPress={goToUserProfile}>
        <Text style={styles.mediaLinksText}>Media, archivos y enlaces</Text>
        <Text style={styles.mediaCount}>3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 1,
  },
  contactInfo: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  contactTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
  mediaLinksBox: {
    backgroundColor: "#1F1F1F",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  mediaLinksText: {
    color: "#fff",
    fontSize: 16,
  },
  mediaCount: {
    color: "#888",
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: "column",
    gap: 15,
  },
  actionButton: {
    backgroundColor: "#1F1F1F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  actionText: {
    color: "#FF0000",
    fontWeight: "bold",
  },
});

export default UserProfile;

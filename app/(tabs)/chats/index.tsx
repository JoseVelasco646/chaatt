import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

interface Chat {
  id: string;
  nombre: string;
  mensaje: string;
  hora: string;
  avatar: string;
  leido: boolean;
}

const Chats: React.FC = () => {
  const router = useRouter();

  const chats: Chat[] = [
    {
      id: "1",
      nombre: "Jose Velasco",
      mensaje: "Hola, ¿cómo estás?",
      hora: "7:54 PM",
      avatar:
        "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
      leido: true,
    },
    {
      id: "2",
      nombre: "Arturo",
      mensaje: "Bien y tú?",
      hora: "7:55 PM",
      avatar:
        "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avenger_hero_avatar_marvel-512.png",
      leido: false,
    },
  ];

  const renderChat = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() =>
        router.push({
          pathname: "/chats/chatScreen",
          params: {
            chatName: item.nombre,
            lastSeen: item.leido
              ? "ult. vez recientemente"
              : "ult. vez hace mucho tiempo",
            avatar: item.avatar,
          },
        })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.nombre}</Text>
        <Text style={styles.chatMessage}>{item.mensaje}</Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>{item.hora}</Text>
        <FontAwesome
          name="check"
          size={16}
          color={item.leido ? "#008dd5" : "#888"}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => router.push("/contacts/newContacto")}
        >
          <FontAwesome name="edit" size={20} color="#008dd5" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <FontAwesome name="search" size={16} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          placeholderTextColor="#888"
        />
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#121212",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    position: "relative",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcon: {
    position: "absolute",
    right: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 40,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  chatMessage: {
    color: "#888",
    fontSize: 14,
  },
  chatMeta: {
    alignItems: "flex-end",
  },
  chatTime: {
    color: "#888",
    fontSize: 12,
    marginBottom: 5,
  },
});

export default Chats;

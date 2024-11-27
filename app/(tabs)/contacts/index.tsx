import React, { useState } from "react";
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

interface Contacto {
  id: string;
  nombre: string;
  ultimaVez: string;
  avatar: string;
}

const ContactosPage: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const contactos: Contacto[] = [
    {
      id: "1",
      nombre: "Jose Velasco",
      ultimaVez: "ult. vez recientemente",
      avatar:
        "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
    },
    {
      id: "2",
      nombre: "Arturo",
      ultimaVez: "ult. vez recientemente",
      avatar:
        "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avenger_hero_avatar_marvel-512.png",
    },
  ];

  const filteredContactos = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderContacto = ({ item }: { item: Contacto }) => (
    <TouchableOpacity style={styles.contactContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.nombre}</Text>
        <Text style={styles.lastSeen}>{item.ultimaVez}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contactos</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => router.push("/contacts/newContacto")}
        >
          <FontAwesome name="plus" size={20} color="#008dd5" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <FontAwesome name="search" size={16} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre o apellido"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredContactos}
        keyExtractor={(item) => item.id}
        renderItem={renderContacto}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron contactos</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 48,
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
  contactContainer: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  lastSeen: {
    color: "#888",
    fontSize: 14,
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default ContactosPage;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SectionList,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

interface Contacto {
  id: string;
  nombre: string;
  ultimaVez: string;
  avatar: string;
  letra: string;
}

const NewMessageScreen: React.FC = () => {
  const router = useRouter();

  const contactos: Contacto[] = [
    {
      id: "1",
      nombre: "Arturo",
      ultimaVez: "ult vez hace mucho tiempo",
      avatar:
        "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
      letra: "A",
    },
    {
      id: "2",
      nombre: "Benito",
      ultimaVez: "ult vez hoy",
      avatar:
        "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avenger_hero_avatar_marvel-512.png",
      letra: "B",
    },
  ];

  const groupedContacts = contactos.reduce((acc: any, contact) => {
    const section = acc.find((sec: any) => sec.title === contact.letra);
    if (section) {
      section.data.push(contact);
    } else {
      acc.push({ title: contact.letra, data: [contact] });
    }
    return acc;
  }, []);

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
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={16} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/(tabs)/contacts/newGroup")}
      >
        <FontAwesome name="users" size={16} color="#008dd5" />
        <Text style={styles.optionText}>Nuevo grupo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/contacts/newContact")}
      >
        <FontAwesome name="user-plus" size={16} color="#008dd5" />
        <Text style={styles.optionText}>Nuevo contacto</Text>
      </TouchableOpacity>

      <SectionList
        sections={groupedContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContacto}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#121212",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelText: {
    color: "#008dd5",
    fontSize: 16,
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
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  optionText: {
    color: "#008dd5",
    fontSize: 16,
    marginLeft: 10,
  },
  sectionHeader: {
    color: "#888",
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#121212",
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
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
});

export default NewMessageScreen;

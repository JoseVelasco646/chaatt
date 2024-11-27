import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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

const NewGroupScreen: React.FC = () => {
  const router = useRouter();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

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

  const toggleContactSelection = (id: string) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((contactId) => contactId !== id)
        : [...prevSelected, id]
    );
  };

  const renderContacto = ({ item }: { item: Contacto }) => (
    <TouchableOpacity
      style={styles.contactContainer}
      onPress={() => toggleContactSelection(item.id)}
    >
      <FontAwesome
        name={selectedContacts.includes(item.id) ? "dot-circle-o" : "circle-o"}
        size={20}
        color="#008dd5"
        style={styles.radioIcon}
      />
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
        <Text style={styles.headerTitle}>Nuevo grupo</Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/contacts/createGroup",
              params: { selectedContacts: JSON.stringify(selectedContacts) },
            })
          }
        >
          <Text style={styles.headerText}>Siguiente</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>A quien quieres añadir?</Text>

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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#121212",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerText: {
    color: "#008dd5",
    fontSize: 16,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    marginHorizontal: 10,
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
  radioIcon: {
    marginRight: 10,
  },
});

export default NewGroupScreen;

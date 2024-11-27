import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const MediaScreen = () => {
  const [activeTab, setActiveTab] = useState("Media");

  const renderContent = () => {
    switch (activeTab) {
      case "Media":
        return (
          <View style={styles.mediaGrid}>
            {[...Array(3)].map((_, index) => (
              <View key={index} style={styles.mediaBox} />
            ))}
          </View>
        );
      case "Links":
        return (
          <View style={styles.linkContainer}>
            <View style={styles.linkItem}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.linkImage}
              />
              <Text style={styles.linkText}>
                GitHub - jakejarvis/awesome-shodan
              </Text>
              <Text style={styles.linkDate}>Wed</Text>
            </View>
          </View>
        );
      case "Docs":
        return (
          <View style={styles.docContainer}>
            <View style={styles.docItem}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.docImage}
              />
              <View>
                <Text style={styles.docTitle}>file.pdf</Text>
                <Text style={styles.docDetails}>
                  783 KB 22 de Nov at 18:57 PM
                </Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {["Media", "Links", "Docs"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>This month</Text>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1c1c1c",
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#333",
  },
  tabText: {
    color: "#888",
    fontSize: 16,
  },
  activeTabText: {
    color: "#fff",
  },
  contentContainer: {
    padding: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  mediaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mediaBox: {
    width: "30%",
    height: 100,
    backgroundColor: "#d3d3d3",
  },
  linkContainer: {
    paddingTop: 10,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  linkImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  linkText: {
    color: "#fff",
    flex: 1,
  },
  linkDate: {
    color: "#888",
  },
  docContainer: {
    paddingTop: 10,
  },
  docItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  docImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  docTitle: {
    color: "#fff",
  },
  docDetails: {
    color: "#888",
  },
});

export default MediaScreen;

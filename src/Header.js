import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.navigationIcons}>
        <Pressable
          title="Go back"
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-chevron-back" size={30} color="#F9EDD2" />
        </Pressable>
        <Pressable
          title="Home"
          style={styles.homeButton}
          onPress={() => navigation.goBack()}
        ></Pressable>
        <Pressable
          title="menu"
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={30} color="#F9EDD2" />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  navigationIcons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goBackButton: {
    height: 30,
    width: 30,
  },
  homeButton: {
    height: 30,
    width: 30,
  },
  menuButton: {
    height: 30,
    width: 30,
    paddingTop: 2,
  },
});

import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  Image,
  Pressable,
} from "react-native";
import Header from "./Header";
import * as Animatable from "react-native-animatable";

const HomeScreen = ({ navigation }) => {
  // const { listItem, setListItem } = useContext(ContextName);

  return (
    <ImageBackground
      source={require("../assets/bg-purple.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <Animatable.View
        style={{ flex: 1.3 }}
        animation="slideInDown"
        duration={700}
        direction="normal"
      >
        <Header navigation={navigation} />
      </Animatable.View>
      <View style={styles.container}>
        <View style={styles.whatList}>
          <Animatable.View
            style={styles.shoppingList}
            animation="flipInY"
            duration={1000}
            direction="normal"
          >
            <Text style={styles.text}>Shopping list</Text>
            <Pressable
              onPress={() => navigation.navigate("List")}
              title="List"
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
              <Image
                source={require("../assets/shoppingcart.png")}
                style={{ height: 190, width: 266 }}
              />
            </Pressable>
          </Animatable.View>
          <Animatable.View
            style={styles.tasks}
            animation="flipInX"
            duration={1000}
            direction="normal"
          >
            <Text style={styles.text}>Tasks</Text>
            <Pressable
              onPress={() => navigation.navigate("Todo")}
              title="Todo"
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
              <Image
                source={require("../assets/tasks.png")}
                style={{ height: 190, width: 266 }}
              />
            </Pressable>
          </Animatable.View>
        </View>

        <View style={{ marginBottom: 5 }}>
          {Platform.OS === "android" && (
            <Text style={styles.textDevice}>You are running on: Android</Text>
          )}
          {Platform.OS === "iOS" && (
            <Text style={styles.textDevice}>You are running on: iOS</Text>
          )}
          {Platform.OS === "web" && (
            <Text style={styles.textDevice}>You are running on: Web</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    paddingTop: 10,
  },
  container: {
    flex: 10,
  },
  whatList: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "space-between",
  },
  shoppingList: {
    flex: 1,
    alignItems: "center",
  },
  tasks: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "#FFE8B4",
    fontFamily: "poppins-Bold",
    fontSize: 35,
  },
  textDevice: {
    color: "#FFE8B4",
    fontFamily: "poppins-Regular",
    fontSize: 12,
    textAlign: "center",
  },
  button: {},
});

import { StyleSheet } from "react-native";
import React, { createContext, useState } from "react";
import Navigation from "./Navigation";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export const ContextName = createContext();

const Context = () => {
  const [listItem, setListItem] = useState([{ text: "", key: 0 }]);

  const [todo, setTodo] = useState([{ text: "", key: 0 }]);
  const [fontsLoaded] = useFonts({
    "poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ContextName.Provider
        value={{ listItem, setListItem, todo, setTodo, fontsLoaded }}
      >
        <Navigation />
      </ContextName.Provider>
    );
  }
};

export default Context;

const styles = StyleSheet.create({});

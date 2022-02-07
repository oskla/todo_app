import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import react, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/HomeScreen";
import List from "./src/List";
import Todo from "./src/Todo";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export const ContextName = createContext();

const Navo = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerActiveBackgroundColor: "#EEC046",
          drawerActiveTintColor: "#2A2C41",
          drawerInactiveTintColor: "#EEC046",
          drawerStyle: {
            backgroundColor: "#2A2C41",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="List"
          component={List}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Todo"
          component={Todo}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [listItem, setListItem] = useState([
    // Objects in array
    { text: "", key: 0 },
  ]);

  const [todo, setTodo] = useState([
    // Objects in array
    { text: "todo1", key: 0 },
  ]);
  const [fontsLoaded] = useFonts({
    "poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ContextName.Provider
        value={{ listItem, setListItem, todo, setTodo, fontsLoaded }}
      >
        <Navo />
      </ContextName.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

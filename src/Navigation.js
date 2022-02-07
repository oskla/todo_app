import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import List from "./List";
import Todo from "./Todo";
import HomeScreen from "./HomeScreen";

const Drawer = createDrawerNavigator();

const Navigation = () => {
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

export default Navigation;

const styles = StyleSheet.create({});

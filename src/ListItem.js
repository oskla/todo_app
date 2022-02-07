import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// Varje item som ska renderas i Flatlist i List.js
const ListItem = ({ item, pressHandler }) => {
  const [itemPressed, setItemPressed] = useState(false);

  const [fontsLoaded] = useFonts({
    "poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  function changeLayout() {
    if (itemPressed == true) {
      return setItemPressed(false);
    } else {
      return setItemPressed(true);
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity onPress={() => setItemPressed(changeLayout)}>
        {/* Change layout when pressed */}

        <View
          style={itemPressed == true ? styles.listItemPressed : styles.listItem}
          onPress={styles.itemText2}
        >
          {/* TouchableOpacity = Remove-button  */}
          <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <View style={{ padding: 10 }}>
              <Animatable.View
                animation="lightSpeedIn"
                duration={500}
                iterationCount={1}
                direction="normal"
              >
                <FontAwesome name="trash-o" size={18} color="#F9EDD2" />
              </Animatable.View>
            </View>
          </TouchableOpacity>

          <Text
            numberOfLines={itemPressed ? 5 : 1}
            ellipsizeMode="tail"
            style={styles.itemText}
          >
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    padding: 5,
    marginTop: 1,
    marginBottom: 10,
    borderColor: "#FFE8B4",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 50,
  },
  listItemPressed: {
    paddingRight: 20,
    marginTop: 1,
    marginBottom: 10,
    borderColor: "#FFE8B4",
    flexWrap: "wrap",
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    height: 200,
  },
  itemText: {
    flex: 1,
    fontFamily: "poppins-Regular",
    flexWrap: "wrap",
    fontSize: 20,
    color: "#FFE8B4",
    marginLeft: 10,
  },
});

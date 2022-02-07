import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ListItem from "./ListItem";
import Header from "./Header";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextName } from "./Context";

const List = ({ navigation }) => {
  const { listItem, setListItem } = useContext(ContextName);

  useEffect(() => {
    getData();
    getKanye();
    console.log("data gotten");
  }, []);

  // Kanye-quotes
  const [quote, setQuote] = useState("");
  const [text, setText] = useState("");

  function getKanye() {
    fetch("https://api.kanye.rest/") // Gör om fetchen till en function med namn. Gör conditional rendering genom att kalla på den funktionen separat. Allt set loop/if ovanför fetch
      .then((response) => response.json())
      .then((result) => {
        if (result.quote.length < 70) {
          setQuote(result.quote);
          console.log("length: " + result.quote.length);
          // if quote is too long. Run function again
        } else {
          getKanye();
        }
      });
    console.log("length is : " + quote.length);
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      return jsonValue != null ? setListItem(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  //Add new item to list
  const SubmitHandler = (text) => {
    const randomNum = Math.random().toString();
    if (text.length > 0) {
      return (
        setListItem((prevListItem) => {
          return [{ text: text, key: randomNum }, ...prevListItem];
        }),
        // Add to async-storage onSubmit
        storeData([{ text: text, key: randomNum }, ...listItem])
      );
    } else {
      return;
    }
  };

  // Remove item (when pressing item in list)
  const pressHandler = (key) => {
    setListItem((prevListItem) => {
      const temp = prevListItem.filter((listItem) => listItem.key != key); // If condition is met => add to "new" array
      storeData(temp);
      return temp;
    });
  };

  // Clear input when press button
  const ClearInput = () => {
    return setText(() => "");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}
    >
      <ImageBackground
        source={require("../assets/bg-purple.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <StatusBar style="auto" />
        <Animatable.View
          style={{ flex: 1.3 }}
          animation="slideInDown"
          duration={700}
          direction="normal"
        >
          <Header navigation={navigation} />
        </Animatable.View>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View style={styles.top}>
              <Animatable.View
                style={{ flex: 1 }}
                animation="slideInLeft"
                duration={700}
                direction="normal"
              >
                <View style={styles.textInputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="skriv här"
                    placeholderTextColor="#4A4E69"
                    value={text}
                    onChangeText={(text) => setText(text)}
                    // When pressing enter
                    onSubmitEditing={() => (
                      SubmitHandler(text), ClearInput(text)
                    )}
                    theme={{
                      colors: {
                        primary: "green",
                        underlineColor: "transparent",
                      },
                    }}
                  />
                </View>
              </Animatable.View>
              <Animatable.View
                style={{ flex: 1 }}
                animation="slideInRight"
                duration={1000}
                direction="normal"
              >
                <View style={styles.pressableContainer}>
                  <Pressable
                    style={styles.pressable}
                    title="tryck"
                    onPress={() => {
                      SubmitHandler(text), ClearInput(text);
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? "#42466A" : "#EEC046",
                      },
                      styles.pressable,
                    ]}
                  >
                    <Text
                      style={{
                        color: "#2B2D43",
                        fontFamily: "poppins-Regular",
                      }}
                    >
                      Add to list
                    </Text>
                  </Pressable>
                </View>
              </Animatable.View>
            </View>
            <View style={styles.middle}>
              <FlatList
                data={listItem}
                renderItem={({ item }) => (
                  <ListItem
                    item={item}
                    pressHandler={pressHandler}
                    getData={getData}
                  />
                )}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.kanyeQuotes}>
            <Text style={styles.kanyeText}>Random Kanye-quote:</Text>
            <Text style={styles.kanyeText}>{quote}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default List;

const styles = StyleSheet.create({
  image: { flex: 1 },
  wrapper: {
    flex: 9,
    paddingHorizontal: 30,
  },
  container: {
    flex: 10,
  },

  top: {
    flex: 1,

    marginTop: 20,
  },
  middle: {
    flex: 5,
    paddingTop: 15,
  },
  headerText: {
    color: "#FF9C9E",
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    textAlign: "center",
  },
  kanyeQuotes: {
    flex: 6,
    padding: 10,
  },

  bottomIfLongList: {
    display: "none",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    textAlign: "center",
  },
  textInputWrapper: {
    flex: 1,
  },
  textInput: {
    borderBottomColor: "#4A4E69",
    borderBottomWidth: 1,
    padding: 5,
    color: "#FFE8B4",
    fontFamily: "poppins-Regular",
  },
  textInputFocus: {
    borderColor: "red",
  },
  pressableContainer: {
    flex: 1,
  },
  pressable: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },

  kanyeText: {
    fontFamily: "poppins-Regular",
    fontSize: 12,
    color: "#EEC046",
    textAlign: "center",
  },
});

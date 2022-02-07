import React from "react";
import { View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //   container: { flex: 0.5 },
  //   stretch: { flex: 1 },
});

const HeaderImage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={require("../assets/headerimg.png")}
      />
    </View>
  );
};

export default HeaderImage;

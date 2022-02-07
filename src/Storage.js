import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  const [data, setData] = useState();
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        setData(value)
      }
    } catch (e) {
      // error reading value
    }
  }  
  
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }  
  return (
    <View style={styles.container}>
      <Button title='save data' onPress={() => storeData('foo')}></Button>
      <Button title='read data' onPress={getData}></Button>
      <Text>{data}</Text>
    </View >
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
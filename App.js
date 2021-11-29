import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  
  const [message, setMessage] = useState('');
  
  const speak = () => {
    const thingToSay = message;
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
    <TextInput style={styles.input} placeholder='Write your message' 
        onChangeText={text => setMessage(text)} />
      <Button title="Press to hear text" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
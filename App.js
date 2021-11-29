import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })
      setContacts(data);
    }
  }

  const getContactList = () => {
    setContactList(contacts)
  }

  return (

    <View style={styles.container} >
      <StatusBar style="auto" />
      {
        hasPermission ? (
          <View>
            <FlatList 
              keyExtractor={(item) => item.id}
              data={contactList}
              renderItem={({ item }) => 
                <View>
                  <Text>{item.name} {item.phoneNumbers[0].number}</Text>
                </View>
              }
              />
            <Button title="Set Contacts" onPress={getContactList} />
          </View>
        ) : (
            <Text>No permission to use Contacts</Text>
          )
      }
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
});
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Button, ListItem, Icon } from 'react-native-elements';

const db = SQLite.openDatabase('coursedb.db');

export default function App() {
    const [amount, setAmount] = useState('');
    const [product, setProduct] = useState('');
    const [shoppinglist, setShoppinglist] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists shoppingitem (id integer primary key not null, amount text, product text);');
        });
        updateList();
    }, []);

    // Save shoppingitem
    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into shoppingitem (amount, product) values (?, ?);', [amount, product]);
        }, null, updateList
        )
    }

    // Update shoppingitem
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from shoppingitem;', [], (_, { rows }) =>
                setShoppinglist(rows._array)
            );
        });
    }

    // Delete shoppingitem
    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from shoppingitem where id = ?;`, [id]);
            }, null, updateList
        )
    }

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "#fff",
                    marginLeft: "10%"
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Header
                centerComponent={{ text: 'SHOPPINGLIST', style: { color: '#fff' } }}
            />
            <TextInput placeholder='Product' style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(product) => setProduct(product)}
                value={product} />
            <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(amount) => setAmount(amount)}
                value={amount} />
            <Button raised icon={{ name: 'save' }} onPress={saveItem} title="SAVE" />
            <FlatList
                style={styles.listcontainer}
                keyExtractor={item => item.id.toString()}
                renderItem={
                    ({ item }) =>

                        <ListItem bottomDivider >
                            <ListItem.Content>
                                <ListItem.Title>{item.product}</ListItem.Title>
                                <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
                                <Icon name='delete' color='red' onPress={() => deleteItem(item.id)} />
                            </ListItem.Content>
                        </ListItem>


                }
                data={shoppinglist}
                ItemSeparatorComponent={listSeparator}
            />
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
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
});


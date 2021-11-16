import React from 'react';
import { StyleSheet, StatusBar, View, Button, TextInput, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [region, setRegion] = React.useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });

  const [coordinates, setCoordinates] = React.useState({
    latitude: 60.201373,
    longitude: 24.934041
  });

  const [location, setLocation] = React.useState('');
  const [spot, setSpot] = React.useState({});
  const [lat, setLat] = React.useState(0);
  const [lon, setLon] = React.useState(0);


  const getCoordinates = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=kTvG5ABV5BurZUfD7kK52FMmjbOHPc4V&location=${location}`)
    .then(response => response.json())
    .then(responseJson => setSpot(responseJson.results[0].locations[0].latLng))
    .catch(error => { 
        Alert.alert('Error', error); 
    });
    setLat(Number(spot.lat))
    setLon(Number(spot.lng))
    setCoordinates({latitude: lat, longitude: lon})
  }
  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
      >
        <Marker
          coordinate={coordinates}
          title='Haaga-Helia'
        />
      </MapView>
      <TextInput
        style={styles.input}
        onChangeText={text => setLocation(text)}
        placeholder="Syötä sijainti"
      />
      <View style={styles.buttons}>
        <Button
          title="Näytä"
          onPress={getCoordinates}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  input: {
    width: '100%',
    padding: 5
  },
  buttons: {
    width: '100%',
  }
});
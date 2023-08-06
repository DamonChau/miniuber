import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const dummyLatitude = 37.7749; // Replace this with your desired latitude value
const dummyLongitude = -122.4194; // Replace this with your desired longitude value


const DetailScreen = ({ route, navigation }) => {
  // Get the item data passed from the FlatList
  const { item } = route.params;
  const latitude = dummyLatitude;
  const longitude = dummyLongitude;

  return (
    <SafeAreaView>
      <View style={styles.box}>
        <Text style={styles.label}>Customer Name:</Text>
        <Text style={styles.value}>{item.customer.user.userName}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{item.customer.user.phoneNo}</Text>

        <Text style={styles.label}>Add From:</Text>
        <Text style={styles.value}>{item.addFrom}</Text>

        <Text style={styles.label}>Add To:</Text>
        <Text style={styles.value}>{item.addTo}</Text>

        <MapView
         provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        ></MapView>
      </View>
      <TouchableOpacity style={styles.acceptButton}>
        <Text style={styles.acceptButtonText}>Accept</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  box: {
    backgroundColor: '#d9e8c5', // Green box background color
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: '#ffffff',
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  acceptButton: {
    backgroundColor: '#008000', // Green button background color
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text color
  },
});

export default DetailScreen;

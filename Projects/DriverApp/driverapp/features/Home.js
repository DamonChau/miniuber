import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import React, { useState, useEffect } from "react";
import {
  VStack,
  Input,
  Button,
  IconButton,
  Icon,
  NativeBaseProvider,
  Center,
  Box,
  Divider,
  Heading,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

function SearchBar() {
  return (
    <VStack
      my="4"
      space={5}
      w="100%"
      maxW="300px"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }
    >
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">Search Customers</Heading>
        <Input
          placeholder="Search Customers"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="mic" />}
            />
          }
        />
      </VStack>
    </VStack>
  );
}

const Home = ({ navigation }) => {
  const [connection, setConnection] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5230/api/Trips/GetAllBookingTrips"
      );
      const json = await response.json();
      setBookings(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startSearchUpBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5230/api/registerAllTrips"
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const stopBookings = () => {
    try {
      const response = fetch("http://localhost:5230/api/unregisterAllTrips");
      console.log("stopBookings");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5230/TripHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          getBookings();
          //option 1
          // connection.on("SendBookingsToDrivers", (trips) => {
          //   console.log(trips);
          // });

          //option 2
          connection.on("NotifyNewBookings", () => {
            console.log("NotifyNewBookings!");
            getBookings();
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const onPressStart = () => {
    console.log("onPressStart!");
    startSearchUpBookings();
  };

  const onPressStop = () => {
    console.log("onPressStop!");
    stopBookings();
  };

  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "grey", marginHorizontal: 10 }}
      />
    );
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  const header = () => {
    return (
      <View>
        <Text style={styles.title}> Customers</Text>
      </View>
    );
  };

  const navigateToDetailScreen = (item) => {
    // Navigate to your detail screen with the selected item data
    navigation.navigate("Detail", { item: item });
  };

  return (
    <View style={styles.container}>
      <Center flex={1} px="3">
        <SearchBar />
      </Center>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStart} onPress={onPressStart}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStop} onPress={onPressStop}>
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={bookings}
            ListEmptyComponent={myListEmpty}
            ListHeaderComponent={header}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToDetailScreen(item)}>
                <View style={styles.containerItems}>
                  <Text style={styles.item}>{item.customer.user.userName}</Text>
                  <Text style={styles.itemPhoneNo}>
                    {item.customer.user.phoneNo}
                  </Text>
                  <Text style={styles.item}>{item.addFrom}</Text>
                  <Text style={styles.item}>{item.addTo}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStart: {
    alignItems: "center",
    borderColor: "#d9e8c5",
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonStop: {
    alignItems: "center",
    borderColor: "#d9e8c5",
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerList: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerItems: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#d9e8c5",
    margin: 2,
  },
  item: {
    padding: 20,
    marginTop: 5,
    fontSize: 15,
  },
  itemPhoneNo: {
    padding: 20,
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import BookingNavigator from "./features/bookings/BookingNavigator";
import DetailScreen from "./features/bookings/Detail";
import UserNavigator from "./features/users/UserNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from "./features/AuthContext";
import { NativeBaseProvider, SafeAreaView } from "native-base";

const Stack = createBottomTabNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Login">
            <Tab.Screen
              name="Home"
              component={BookingNavigator}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Account"
              component={UserNavigator}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
import DetailScreen from './Detail';

const Stack = createNativeStackNavigator();

const BookingNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default BookingNavigator;
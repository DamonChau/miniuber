import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../AuthContext";

const ProfileScreen = ({navigation}) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogin = () => {
    navigation.navigate("Login"); // Navigate to the LoginScreen
  };

  return (
    <View>
      {user ? (
        <>
          <Text>Welcome, {user}!</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <>
          <Text>Please log in to view your profile.</Text>
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

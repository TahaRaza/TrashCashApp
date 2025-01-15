import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Import screens
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen"; // New Home Screen
import QRCodeScreen from "../screens/QRCodeScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={options.welcome}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={options.logIn}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={options.signin}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Home"
          options={options.home}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Dashboard"
          options={options.dashboard}
          component={DashboardScreen}
        />
        <Stack.Screen
          name="QRCode"
          options={options.qrCode}
          component={QRCodeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const options = {
  welcome: {
    headerShown: false,
    title: "welcome",
  },
  home: {
    headerShown: false,
    title: "Home",
  },
  logIn: {
    headerShown: false,
    title: "Log In",
  },
  signin: {
    headerShown: false,
    title: "Sign In",
  },
  qrCode: {
    headerShown: false,
    title: "Scan QR Code",
  },
  dashboard: {
    headerShown: false,
    title: "Dashboard",
  },
};

export default AppNavigator;

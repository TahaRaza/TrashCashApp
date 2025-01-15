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
import TestScreen from "../screens/TestScreen";

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
          options={options.auth}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={options.auth}
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
        <Stack.Screen
          name="Test"
          options={options.qrCode}
          component={TestScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const options = {
  welcome: {
    headerShown: false,
  },
  home: {
    headerShown: false,
    title: "Home",
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

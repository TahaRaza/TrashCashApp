import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';

import { LogBox } from "react-native";

// Ignore specific warnings
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
}
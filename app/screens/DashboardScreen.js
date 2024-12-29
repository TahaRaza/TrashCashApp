import React from 'react';
import { SafeAreaView, StyleSheet, Text, Pressable } from 'react-native';
import { colors } from '../styles/theme';

const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Dashboard</Text>
      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('QRCode')}>
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </Pressable>
      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'darkgreen',
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

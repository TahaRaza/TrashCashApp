import React from 'react';
import { SafeAreaView, StyleSheet, Text, Pressable, View, StatusBar } from 'react-native';
import { colors } from '../styles/theme'; // Importing the theme colors
import CustomButton from '../components/customButton'; // Custom button component

const HomeScreen = ({ navigation, route }) => {
  const username = route.params?.username || 'User'; // Default to 'User' if no username is passed

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.themeBG} barStyle="dark-content" />

      <Text style={styles.greeting}>Hello, {username}!</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
        <CustomButton
          title="Scan QR Code"
          onPress={() => navigation.navigate('QRCode')}
        />
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={() => navigation.replace('Welcome')}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBG,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: colors.buttonGreen,
    padding: 10,
    borderRadius: 5,
    alignItems:'flex-end',
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

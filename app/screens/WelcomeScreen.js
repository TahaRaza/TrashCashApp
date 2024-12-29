import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, Pressable, StatusBar } from 'react-native';

import CustomButton from '../components/customButton'; //../components/customButton
import { colors } from '../styles/theme'; //../styles/theme


function WelcomeScreen({ navigation }) {
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [isSignupPressed, setIsSignupPressed] = useState(false);

  return (
    <View style={styles.mainBackground}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/TrashCashLOGO.png')}
          style={styles.logo}
        />
      </View>

      <CustomButton title="Log In" onPress={() => navigation.navigate('Login')} />

      <CustomButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      

      <StatusBar style="auto" />
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: colors.themeBG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 100,
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

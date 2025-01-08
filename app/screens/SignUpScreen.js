import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'E:/FYP/TrashCashApp/TrashCashApp/config/firebaseConfig.js';
import { colors } from '../styles/theme';
import CustomButton from '../components/customButton';

const SignUpScreen = ({ navigation }) => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!userName || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      // Sign up the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User signed up:', user);
      Alert.alert('Success', `Welcome, ${userName}!`);
      navigation.navigate('Login'); // Navigate to Login after successful signup
    } catch (error) {
      console.error('Error signing up:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton title="Sign Up" onPress={handleSignUp} />
      <CustomButton
        title="Go Back to Welcome"
        onPress={() => navigation.navigate('Welcome')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.themeBG,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default SignUpScreen;

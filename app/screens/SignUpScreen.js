import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../config/firebaseConfig';
import CustomButton from '../components/customButton';
import { colors } from '../styles/theme';

// Helper function to save user data in the database
const saveUserData = async (userUID, email, userName) => {
  try {
    await set(ref(database, `users/${userUID}`), {
      email,         // User's email
      username: userName, // User's name
      points: 0,     // Default points for new user
    });
  } catch (error) {
    console.error('Failed to save user data:', error.message || error.code);
    throw new Error('Could not save user data.');
  }
};

const SignUpScreen = ({ navigation }) => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Step 1: Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userUID = userCredential.user.uid; // Get Firebase-assigned UID

      // Step 2: Save user data in the Realtime Database
      await saveUserData(userUID, email, userName);

      // Step 3: Notify the user and navigate to the login screen
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign-up failed:', error.message || error.code);
      Alert.alert('Error', error.message || 'An error occurred during sign-up.');
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

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
  Alert,
} from "react-native";
import { ref, get } from "firebase/database";
import { database } from "../config/firebaseConfig"; // Firebase configuration
import { colors } from "../styles/theme"; // Theme colors
import CustomButton from "../components/customButton"; // Custom button component

const HomeScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState("User"); // Default username
  const [userUID, setUserUID] = useState("UserUID");
  const userEmail = route.params?.email || null; // Email passed from Login screen

  useEffect(() => {
    if (userEmail) {
      fetchUsername(userEmail);
    }
  }, [userEmail]);

  const fetchUsername = async (email) => {
    try {
      // Find the user by email in the database
      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();

        // Find user with the matching email
        for (const uid in users) {
          if (users[uid].email === email) {
            setUsername(users[uid].username); // Set the username
            setUserUID(uid);
            return;
          }
        }
        throw new Error("User not found.");
      } else {
        throw new Error("No users found in database.");
      }
    } catch (error) {
      console.error("Error fetching username:", error.message);
      Alert.alert("Error", "Unable to fetch username.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.themeBG} barStyle="dark-content" />

      <Text style={styles.greeting}>Hello, {username}!</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Dashboard"
          onPress={() => navigation.navigate("Dashboard", { uid: userUID })}
        />
        <CustomButton
          title="Scan QR Code"
          onPress={() => navigation.navigate("QRCode")}
        />
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={() => navigation.replace("Welcome")}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: colors.buttonGreen,
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

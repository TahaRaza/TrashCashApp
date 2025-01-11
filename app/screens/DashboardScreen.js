import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { database } from "../config/firebaseConfig"; // Import your Firebase database instance
import { colors } from "../styles/theme";

const DashboardScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);
  const userUID = route.params?.uid;

  useEffect(() => {
    if (!userUID) {
      Alert.alert("Error", "User UID is missing. Please log in again.");
      navigation.replace("Welcome");
      return;
    }

    const userRef = ref(database, `users/${userUID}`);
    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setUserData(null);
        }
      },
      (error) => {
        console.error("Error fetching user data:", error.message);
        Alert.alert("Error", "Failed to fetch user data. Please try again.");
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [userUID, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Dashboard</Text>
      <View style={styles.table}>
        <Text style={styles.tableHeader}>User Details</Text>
        {userData ? (
          <View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Username:</Text>
              <Text style={styles.tableCell}>{userData.username}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Email:</Text>
              <Text style={styles.tableCell}>{userData.email}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Points:</Text>
              <Text style={styles.tableCell}>{userData.points}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>
            No data available for this user.
          </Text>
        )}
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("QRCode")}
      >
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.replace("Welcome")}
      >
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "darkgreen",
  },
  table: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "darkblue",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tableCell: {
    fontSize: 16,
    color: "black",
  },
  noDataText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

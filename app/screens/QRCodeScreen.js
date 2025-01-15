import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ref, get, set } from "firebase/database";
import { database } from "../config/firebaseConfig";

import CustomButton from "../components/customButton";
import { colors } from "../styles/theme";

const QRCodeScreen = ({ navigation, route }) => {
  const userUID = route.params?.uid;

  // State to track the camera facing direction (front or back).
  const [facing, setFacing] = useState("back");

  // State to handle camera permissions.
  const [permission, requestPermission] = useCameraPermissions();

  // State to determine whether a QR code has been scanned.
  const [scanned, setScanned] = useState(false);

  // State to store scanned information such as type, data, and bounds.
  const [scanInfo, setScanInfo] = useState("");

  // Automatically request camera permissions when the component mounts.
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  /**
   * Increment points for the user in the database.
   * @param {string} userUID - The unique identifier of the user.
   * @param {number} pointsToAdd - The number of points to add.
   */
  const incrementUserPoints = async (userUID, pointsToAdd) => {
    try {
      const userPointsRef = ref(database, `users/${userUID}/points`);

      // Get the current points
      const snapshot = await get(userPointsRef);

      let currentPoints = 0;
      if (snapshot.exists()) {
        currentPoints = snapshot.val();
      }

      // Update the points
      const updatedPoints = currentPoints + pointsToAdd;
      await set(userPointsRef, updatedPoints);

      Alert.alert(
        "Success",
        `Your points have been updated! Total points: ${updatedPoints}`
      );
    } catch (error) {
      console.error("Error updating points:", error);
      Alert.alert("Error", "Could not update your points. Please try again.");
    }
  };

  /**
   * Callback triggered when a QR code or barcode is scanned.
   * @param {Object} result - The result object from the scan containing type, data, and bounds.
   */
  const handleBarCodeScanned = async (result) => {
    const { data, type } = result;

    // Ensure the scanned data is numeric
    const scannedPoints = parseInt(data, 10);
    if (isNaN(scannedPoints)) {
      Alert.alert(
        "Invalid QR Code",
        "The scanned QR code does not contain valid points."
      );
      return;
    }

    setScanned(true);
    setScanInfo(`Type: ${type}\nData: ${data}`);

    // Show an alert with the scanned QR code details
    Alert.alert("QR Code Scanned!", `Type: ${type}\nData: ${data}`);

    if (!userUID) {
      Alert.alert("Error", "User is not logged in.");
      return;
    }

    await incrementUserPoints(userUID, scannedPoints);
  };

  // Check if permission is still being determined.
  if (!permission) {
    return <View />;
  }

  // If permission is not granted, show a message with an option to grant it.
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  /**
   * Toggles the camera between front and back.
   */
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scan a QR Code</Text>

      {/* Camera view container */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Prevent scanning when already scanned
          barcodeScannerSettings={{
            barCodeTypes: ["qr"], // Supported barcode types
          }}
        />
      </View>

      {/* Display scanned information if a QR code is scanned */}
      {scanned && (
        <View style={styles.scanInfoContainer}>
          <Text style={styles.scanInfo}>{scanInfo}</Text>
          <CustomButton title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}

      {/* Button container for toggling the camera and navigation */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Flip Camera" onPress={toggleCameraFacing} />
      </View>

      <CustomButton
        title="Go Back"
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      />
    </SafeAreaView>
  );
};

// Styles for the component
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
    color: "#333",
    marginBottom: 20,
  },
  cameraContainer: {
    width: "90%",
    aspectRatio: 3 / 4,
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
  },
  camera: {
    flex: 1,
  },
  scanInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
  },
  scanInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  goBackButton: {
    marginTop: 20,
  },
});

export default QRCodeScreen;

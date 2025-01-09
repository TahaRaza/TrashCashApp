// For testing and debugging

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { colors } from '../styles/theme';
import CustomButton from '../components/customButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestScreen = ({ navigation }) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanInfo, setScanInfo] = useState('');

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanInfo(`Type: ${type}\nData: ${data}`);
    console.log('Scanned Data:', data);
    Alert.alert('QR Code Scanned!', `Type: ${type}\nData: ${data}`);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scan a QR Code</Text>

      <View style={styles.qrCodeContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarCodeScanned={({ data }) => {
            console.log("data", data)
          }}
        />
      </View>

      {scanned && (
        <View style={styles.scanInfoContainer}>
          <Text style={styles.scanInfo}>{scanInfo}</Text>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton title={"Flip Camera"} style={styles.flipButton} onPress={toggleCameraFacing}>
          
        </CustomButton>
      </View>

      <CustomButton  title="Go Back" onPress={() => navigation.goBack()} style={styles.goBackButton} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBG,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 30,
  },
  qrCodeContainer: {
    width: 300,
    height: 300,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  scanInfoContainer: {
    marginBottom: 20,
  },
  scanInfo: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    width: '50%',
    justifyContent: 'center',
  },
  flipButton: {
    
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  goBackButton: {
    marginTop: 30,
  },
});

export default TestScreen;
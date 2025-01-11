import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/customButton';
import { colors } from '../styles/theme';

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

  const handleBarCodeScanned = (result) => {
    const { bounds, cornerPoints, data, type } = result;

    setScanned(true);
    setScanInfo(
      `Type: ${type}\nData: ${data}\n` +
      `Bounds: Origin(${bounds.origin.x}, ${bounds.origin.y}), Size(${bounds.size.width}x${bounds.size.height})\n` +
      `Corner Points: ${cornerPoints?.map(({ x, y }) => `(${x}, ${y})`).join(', ') || 'N/A'}`
    );

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

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: ['qr', 'ean13', 'code128', 'pdf417', 'aztec', 'datamatrix'],
          }}
        />
      </View>

      {scanned && (
        <View style={styles.scanInfoContainer}>
          <Text style={styles.scanInfo}>{scanInfo}</Text>
          <CustomButton title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton title="Flip Camera" onPress={toggleCameraFacing} />
      </View>

      <CustomButton title="Go Back" onPress={() => navigation.goBack()} style={styles.goBackButton} />
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
    color: '#333',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '90%',
    aspectRatio: 3 / 4,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'green',
  },
  camera: {
    flex: 1,
  },
  scanInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  scanInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  goBackButton: {
    marginTop: 20,
  },
});

export default TestScreen;

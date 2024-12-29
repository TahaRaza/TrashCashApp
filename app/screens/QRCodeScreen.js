import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
import { colors } from '../styles/theme';

const QRCodeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scan a QR Code</Text>
      
      <View style={styles.qrCodeContainer}>
        {/* Here you can add QR scanning functionality or a placeholder */}
        <Text style={styles.placeholderText}>[QR Code Scanner Placeholder]</Text>
      </View>
      
      <Button 
        title="Go Back" 
        onPress={() => navigation.goBack()} 
      />
    </SafeAreaView>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.themeBG,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'darkgreen',
  },
  qrCodeContainer: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'green',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: 'darkgreen',
  }
});

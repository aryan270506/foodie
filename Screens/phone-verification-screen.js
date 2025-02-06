import React, { useState, useRef } from 'react';
import { View, Text, TextInput,StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const PhoneVerificationScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const inputRefs = Array(6).fill(null).map(() => useRef(null));

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    if (text.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = () => {
    if (verificationCode.every(digit => digit.length === 1)) {
      navigation.navigate('ProfileSetup', { phoneNumber });
    } else {
      alert('Please enter the full verification code');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text>← Back</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Verify Phone Number</Text>
        <Text style={styles.subtitle}>We have sent you a 6-digit code. Please enter here to verify your number.</Text>
        <Text style={styles.phoneText}>{phoneNumber}</Text>

        <View style={styles.codeContainer}>
          {verificationCode.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Didn't Receive Code? Get a new one</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.verifyButton} >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  phoneText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  resendButton: {
    marginBottom: 30,
  },
  resendText: {
    color: '#FF9B6B',
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: '#FF9B6B',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PhoneVerificationScreen;

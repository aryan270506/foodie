import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';

// Mock SMS service - replace with actual SMS API integration later
const mockSMSService = {
  sendVerificationCode: (phoneNumber) => {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[MOCK] Sending code ${code} to ${phoneNumber}`);
    return code;
  }
};

const PhoneVerificationScreen = ({ route, navigation }) => {
  const { phoneNumber, fullName } = route.params;
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const [actualCode, setActualCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(true);
  const [timer, setTimer] = useState(60); // Countdown timer for resend
  const inputRefs = Array(6).fill(null).map(() => useRef(null));

  // Send verification code when component mounts
  useEffect(() => {
    sendVerificationCode();
  }, []);

  // Timer countdown for resend button
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sendVerificationCode = () => {
    setIsSending(true);
    
    // In a real app, this would be an API call to your backend
    setTimeout(() => {
      const generatedCode = mockSMSService.sendVerificationCode(phoneNumber);
      setActualCode(generatedCode);
      setIsSending(false);
      setTimer(60); // Reset timer
      
      // This alert is for development purposes only - remove in production
      Alert.alert(
        "Development Mode",
        `Verification code: ${generatedCode}`,
        [{ text: "OK" }]
      );
    }, 1500); // Simulate network delay
  };

  const handleCodeChange = (text, index) => {
    // Only allow digits
    if (/^\d*$/.test(text)) {
      const newCode = [...verificationCode];
      newCode[index] = text;
      setVerificationCode(newCode);

      if (text.length === 1 && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleVerify = () => {
    if (!verificationCode.every(digit => digit.length === 1)) {
      Alert.alert("Error", "Please enter the full verification code");
      return;
    }

    setIsLoading(true);
    
    // In a real app, you would verify this against your backend
    setTimeout(() => {
      const enteredCode = verificationCode.join('');
      
      if (enteredCode === actualCode) {
        setIsLoading(false);
        navigation.navigate('Auth', { phoneNumber, fullName });
      } else {
        setIsLoading(false);
        Alert.alert(
          "Verification Failed",
          "The code you entered is incorrect. Please try again.",
          [{ text: "OK" }]
        );
      }
    }, 1000); // Simulate network delay
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Verify Phone Number</Text>
        <Text style={styles.subtitle}>We have sent you a 6-digit code. Please enter here to verify your number.</Text>
        <Text style={styles.phoneText}>{phoneNumber}</Text>

        {isSending ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FF9B6B" />
            <Text style={styles.loadingText}>Sending verification code...</Text>
          </View>
        ) : (
          <>
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

            <TouchableOpacity 
              style={styles.resendButton}
              disabled={timer > 0}
              onPress={sendVerificationCode}
            >
              <Text style={[styles.resendText, timer > 0 && styles.resendTextDisabled]}>
                {timer > 0 ? `Resend code in ${timer}s` : "Didn't receive code? Resend"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.verifyButton}
              onPress={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify</Text>
              )}
            </TouchableOpacity>
          </>
        )}
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
  backButtonText: {
    fontSize: 16,
    color: '#333',
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
  resendTextDisabled: {
    color: '#CCCCCC',
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
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  loadingText: {
    color: '#666',
    marginTop: 10,
  },
});

export default PhoneVerificationScreen;
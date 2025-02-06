import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (fullName && phoneNumber && password) {
      navigation.navigate('PhoneVerification', { 
        fullName, 
        phoneNumber 
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={styles.tab}
              onPress={() => navigation.navigate('Auth')}
            >
              <Text style={styles.tabText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activeTab}>
              <Text style={styles.activeTabText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Full Name"
              placeholderTextColor="#A0A0A0"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Phone Number"
              placeholderTextColor="#A0A0A0"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Create Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Text style={styles.orText}>or continue with</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => console.log('Google sign up pressed')}
            >
              <Image
                source={require('../assets/Screenshot 2025-02-05 171151.png')} 
                style={styles.socialIcon}
              />
            </TouchableOpacity>


          </View>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleSignUp}
          >
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 25,
    width: '100%',
  },
  tab: {
    flex: 1,
    paddingBottom: 8,
    alignItems: 'center',
  },
  activeTab: {
    flex: 1,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  activeTabText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 25,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#FF9B6B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 50,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
    marginTop: 30,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});

export default SignupScreen;
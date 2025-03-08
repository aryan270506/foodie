import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Define credentials with associated hotel IDs
  const credentials = {
    '7499486867': { password: 'aryan123', role: 'admin', hotelId: 'Desi Tadka', name: 'Desi Tadka Admin' },
    '9823835946': { password: 'aryan123', role: 'admin', hotelId: 'Brothers Cafe', name: 'Brothers Cafe Admin' },
    '1111111111': { password: 'owner123', role: 'owner', name: 'Main Owner' },
  };

  const handleLogin = async () => {
    // Reset error
    setError('');

    // Check if the phone number exists in our credentials
    if (credentials[phoneNumber]) {
      const userInfo = credentials[phoneNumber];
      
      // Check if password matches
      if (password === userInfo.password) {
        // Store user info in AsyncStorage
        try {
          await AsyncStorage.setItem('userInfo', JSON.stringify({
            phoneNumber,
            role: userInfo.role,
            hotelId: userInfo.hotelId || null,
            name: userInfo.name
          }));
          
          // Navigate based on role
          if (userInfo.role === 'admin') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'AdminPanel' }],
            });
          } else if (userInfo.role === 'owner') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'OwnerDashboard' }],
            });
          }
        } catch (error) {
          console.error('Error storing user info', error);
          setError('Login failed. Please try again.');
        }
      } else {
        setError('Invalid password');
        Alert.alert('Error', 'Invalid password');
      }
    } else if (phoneNumber.length > 0 && password.length > 0) {
      // For regular users, navigate to home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } else {
      // Show error for empty fields
      setError('Please enter phone number and password');
      Alert.alert('Error', 'Please enter phone number and password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.activeTab}>
                  <Text style={styles.activeTabText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.tab}
                  onPress={() => navigation.navigate('signup')}
                >
                  <Text style={styles.tabText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Welcome!</Text>
              <Text style={styles.subtitle}>Login to your account.</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Phone Number"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="number-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  maxLength={10}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Password"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              
              <Text style={styles.orText}>hungry? let's continue with these</Text>

              <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AuthScreen;
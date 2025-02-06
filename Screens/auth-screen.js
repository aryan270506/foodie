// AuthScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Image } from 'react-native';


const AuthScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>



          <Text style={styles.orText}>hungry? let's continue with these</Text>

          <View style={styles.socialButtons}>
  <TouchableOpacity 
    style={styles.socialButton}
    onPress={() => {
      // Handle Google sign in
      console.log('Google sign in pressed');
    }}
  >
    <Image
      source={require('../assets/Screenshot 2025-02-05 171151.png')}
      style={styles.socialIcon}
    />
  </TouchableOpacity>


</View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
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
    marginTop: 150,
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

export default AuthScreen;




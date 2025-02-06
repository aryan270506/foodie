import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './Screens/onboarding-screen.js';
import DeliveryScreen from './Screens/delivery-onboarding.js';
import OrderingScreen from './Screens/food-ordering-flow.js';
import AuthScreen from './Screens/auth-screen.js';
import SignupScreen from './Screens/signup-screen.js';
import PhoneVerificationScreen from './Screens/phone-verification-screen.js';
import ProfileSetupScreen from './Screens/phone-verification-screen.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
        <Stack.Screen name="Ordering" component={OrderingScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
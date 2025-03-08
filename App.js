import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './Screens/onboarding-screen.js';
import DeliveryScreen from './Screens/delivery-onboarding.js';
import OrderingScreen from './Screens/food-ordering-flow.js';
import AuthScreen from './Screens/auth-screen.js';
import SignupScreen from './Screens/signup-screen.js';
import PhoneVerificationScreen from './Screens/phone-verification-screen.js';
import AdminPanel from './Screens/admin-panel.js';
import HomeScreen from './Screens/home-screen.js';
import OwnerDashboard from './Screens/Owner-Dashboard.js';
import ProfilePanel from './Screens/Profile-Panel.js';
import CartScreen from './Screens/Cart-Screen.js';
import OrdersScreen from './Screens/orders-screen.js';
import PaymentScreen from './Screens/payment-screen.js';
import PaymentSuccessScreen from './Screens/payment-success-screen.js';
import HotelDetailScreen from './Screens/hotel-detail-screen.js';
import PartnerHotelsScreen from './Screens/PartnerHotelsScreen.js';
import HotelRevenueScreen from './Screens/HotelRevenueScreen.js';

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
        <Stack.Screen name="AdminPanel" component={AdminPanel}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="OwnerDashboard" component={OwnerDashboard}/>
        <Stack.Screen name="Profile" component={ProfilePanel}/>
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="HotelDetailScreen" component={HotelDetailScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name="PartnerHotels" component={PartnerHotelsScreen} />
        <Stack.Screen name="HotelRevenueScreen" component={HotelRevenueScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

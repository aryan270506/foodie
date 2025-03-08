import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentScreen = ({ navigation, route }) => {
  // Get total from route params
  const { total = 0 } = route.params || {};
  
  const [paymentMethod, setPaymentMethod] = useState('wallets'); // 'wallets' or 'upi'
  const [selectedWallet, setSelectedWallet] = useState('paytm'); // 'paytm', 'phonepe', 'gpay'
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    
    // Check if user is logged in
    // For this example, let's assume we need to check if user is logged in
    const isLoggedIn = true; // Replace with actual authentication check
  
    if (!isLoggedIn) {
      // If not logged in, redirect to auth screen with return info
      setLoading(false);
      navigation.navigate('Auth', { 
        fromPayment: true,
        cartTotal: total
      });
      return;
    }
    
    // Simulating payment processing for logged in users
    setTimeout(() => {
      setLoading(false);
      
      // Generate a random order ID
      const orderId = `ORD${Math.floor(Math.random() * 100000000)}`; // Ensure this is a string
      
      // Navigate to Payment Success Screen with order details
      navigation.navigate('PaymentSuccess', {
        orderId: orderId, // Pass the generated order ID
        total: total, // Pass the total amount
        paymentMethod: selectedWallet, // Pass the selected payment method
      });
    }, 2000);
  };
  const renderWallets = () => (
    <View style={styles.paymentMethodsContainer}>
      <Text style={styles.sectionTitle}>Select Wallet</Text>
      
      <View style={styles.methodsRow}>
        <TouchableOpacity
          style={[
            styles.methodButton,
            selectedWallet === 'paytm' && styles.methodButtonActive
          ]}
          onPress={() => setSelectedWallet('paytm')}
        >
          <Image
            source={require('../assets/Paytm - Yo! Success.jpeg')}
            style={styles.walletIcon}
          />
          <Text 
            style={[
              styles.methodText,
              selectedWallet === 'paytm' && styles.methodTextActive
            ]}
          >
            Paytm
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.methodButton,
            selectedWallet === 'phonepe' && styles.methodButtonActive
          ]}
          onPress={() => setSelectedWallet('phonepe')}
        >
          <Image
            source={require('../assets/PhonePe Logo - PNG Logo Vector Brand Downloads (SVG, EPS).jpeg')}
            style={styles.walletIcon}
          />
          <Text 
            style={[
              styles.methodText,
              selectedWallet === 'phonepe' && styles.methodTextActive
            ]}
          >
            PhonePe
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.methodButton,
            selectedWallet === 'gpay' && styles.methodButtonActive
          ]}
          onPress={() => setSelectedWallet('gpay')}
        >
          <Image
            source={require('../assets/Google Pay Logo in India Has Been Updated_.jpeg')}
            style={styles.walletIcon}
          />
          <Text 
            style={[
              styles.methodText,
              selectedWallet === 'gpay' && styles.methodTextActive
            ]}
          >
            GPay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderUpiForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.inputLabel}>Enter UPI ID</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="alternate-email" size={20} color="#95A5A6" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="username@upi"
          value={upiId}
          onChangeText={setUpiId}
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#2D3436" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>Rs. {total.toFixed(2)}</Text>
          </View>

          <View style={styles.paymentMethodsContainer}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            <View style={styles.methodsRow}>
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  paymentMethod === 'wallets' && styles.methodButtonActive
                ]}
                onPress={() => setPaymentMethod('wallets')}
              >
                <MaterialIcons 
                  name="account-balance-wallet" 
                  size={24} 
                  color={paymentMethod === 'wallets' ? '#fff' : '#6C63FF'} 
                />
                <Text 
                  style={[
                    styles.methodText,
                    paymentMethod === 'wallets' && styles.methodTextActive
                  ]}
                >
                  Wallets
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  paymentMethod === 'upi' && styles.methodButtonActive
                ]}
                onPress={() => setPaymentMethod('upi')}
              >
                <MaterialIcons 
                  name="account-balance" 
                  size={24} 
                  color={paymentMethod === 'upi' ? '#fff' : '#6C63FF'} 
                />
                <Text 
                  style={[
                    styles.methodText,
                    paymentMethod === 'upi' && styles.methodTextActive
                  ]}
                >
                  UPI ID
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {paymentMethod === 'wallets' && renderWallets()}
          {paymentMethod === 'upi' && renderUpiForm()}
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.payButtonText}>Processing...</Text>
            ) : (
              <>
                <Text style={styles.payButtonText}>
                  Pay Rs. {total.toFixed(2)}
                </Text>
                <MaterialIcons name="lock" size={20} color="#fff" style={{ marginLeft: 8 }} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
  },
  content: {
    flex: 1,
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6C63FF',
  },
  paymentMethodsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  methodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  methodsColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F0EFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  methodButtonActive: {
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  methodText: {
    color: '#6C63FF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  methodTextActive: {
    color: '#fff',
  },
  walletIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F2F5',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
  },
  inputIcon: {
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#2D3436',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },
  payButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentScreen;
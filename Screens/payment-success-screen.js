import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PaymentSuccessScreen = ({ navigation, route }) => {
  const { orderId = 'ORD12345678', total = 0, paymentMethod = 'paytm' } = route.params || {};
  // Create animated value for success animation
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    // Start animation when component mounts
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Format current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const formattedTime = currentDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  const getPaymentMethodIcon = () => {
    switch (paymentMethod) {
      case 'paytm':
        return require('../assets/Paytm - Yo! Success.jpeg');
      case 'phonepe':
        return require('../assets/PhonePe Logo - PNG Logo Vector Brand Downloads (SVG, EPS).jpeg');
      case 'gpay':
        return require('../assets/Google Pay Logo in India Has Been Updated_.jpeg');
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('HomeScreen')}>
          <MaterialIcons name="close" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>
      
      <Animated.View style={[
        styles.animatedContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: scaleAnim
        }
      ]}>
        <View style={styles.successIconContainer}>
          <MaterialIcons name="check-circle" size={80} color="#4CD964" />
        </View>
        
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successMessage}>Your order has been placed successfully</Text>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount Paid</Text>
          <Text style={styles.amount}>Rs. {total.toFixed(2)}</Text>
        </View>
        
        
        <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order ID</Text>
          <Text style={styles.detailValue}>{orderId}</Text>
        </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{formattedDate}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{formattedTime}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method</Text>
            <View style={styles.paymentMethodContainer}>
              {getPaymentMethodIcon() && (
                <Image source={getPaymentMethodIcon()} style={styles.methodIcon} />
              )}
              <Text style={styles.detailValue}>
                {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.viewOrderButton}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.viewOrderButtonText}>View Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    padding: 20,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  animatedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#95A5A6',
    marginBottom: 24,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  amountLabel: {
    fontSize: 16,
    color: '#95A5A6',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#6C63FF',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: width - 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  detailLabel: {
    fontSize: 14,
    color: '#95A5A6',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonsContainer: {
    padding: 20,
  },
  viewOrderButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6C63FF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  viewOrderButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentSuccessScreen;

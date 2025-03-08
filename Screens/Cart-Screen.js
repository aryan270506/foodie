import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ route, navigation }) => {
  // Initialize with empty cart
  const [cartItems, setCartItems] = useState([]);
  
  // Update cart when navigating to this screen with new items
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        // First check if we have items passed via route params
        if (route.params?.cartItems) {
          setCartItems(route.params.cartItems);
          // Also save to AsyncStorage for persistence
          await AsyncStorage.setItem('cartItemsArray', JSON.stringify(route.params.cartItems));
        } else {
          // Otherwise load from storage
          const storedCartItems = await AsyncStorage.getItem('cartItemsArray');
          if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
          }
        }
      } catch (error) {
        console.log('Error loading cart items', error);
      }
    };
    
    loadCartItems();
  }, [route.params]);
  
  // Save cart items whenever they change
  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItemsArray', JSON.stringify(cartItems));
      } catch (error) {
        console.log('Error saving cart items', error);
      }
    };
    
    if (cartItems.length > 0) {
      saveCartItems();
    }
  }, [cartItems]);

  const updateQuantity = (id, increment) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + increment;
          if (newQuantity < 1) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    // If cart becomes empty after removing item, update AsyncStorage
    if (cartItems.length === 1) {
      AsyncStorage.removeItem('cartItemsArray');
      AsyncStorage.removeItem('cartItems'); // Remove the object format too
    }
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const deliveryFee = 0;
  const subtotal = calculateTotal();
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    // Navigate to payment screen with the total amount
    navigation.navigate('Payment', { total: total });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Your Cart</Text>
          {cartItems.length > 0 && (
            <Text style={styles.itemCount}>{cartItems.length} items</Text>
          )}
        </View>
        <View style={{ width: 32 }} /> {/* Placeholder for layout balance */}
      </View>

      <ScrollView style={styles.itemsContainer}>
      {cartItems.length > 0 ? (
        <>
          
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.restaurantName}>{item.restaurant}</Text>
                  <Text style={styles.itemPrice}>Rs. {item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.itemActions}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, -1)}
                      style={styles.quantityButton}
                    >
                      <MaterialIcons name="remove" size={20} color="#6C63FF" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, 1)}
                      style={styles.quantityButton}
                    >
                      <MaterialIcons name="add" size={20} color="#6C63FF" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    <MaterialIcons name="delete-outline" size={24} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryValue}>Rs. {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>Rs. {total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="shopping-cart" size={80} color="#DDE0E4" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Add items to get started</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.shopButtonText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      )}
      </ScrollView>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
  },
  itemCount: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 4,
  },
  itemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
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
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemInfo: {
    width: '100%',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
  restaurantName: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6C63FF',
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 4,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 16,
    marginBottom: 40,
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#95A5A6',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginVertical: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6C63FF',
  },
  checkoutButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 8,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
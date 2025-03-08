import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sample food data for each hotel
const foodData = {
  'Desi Tadka': [
    { id: '1', name: 'Butter Chicken', price: 12.99, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format', restaurant: 'Desi Tadka' },
    { id: '2', name: 'Paneer Tikka', price: 10.99, image: 'https://www.indianveggiedelight.com/wp-content/uploads/2021/08/air-fryer-paneer-tikka-featured.jpg', restaurant: 'Desi Tadka' },
    { id: '3', name: 'Dal Makhani', price: 8.99, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format', restaurant: 'Desi Tadka' },
  ],
  'Brothers Cafe': [
    { id: '4', name: 'Avocado Toast', price: 9.99, image: 'https://images.unsplash.com/photo-1588137378633-56c3a6228e0e?w=500&auto=format', restaurant: 'Brothers Cafe' },
    { id: '5', name: 'Cappuccino', price: 4.99, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format', restaurant: 'Brothers Cafe' },
    { id: '6', name: 'Croissant Sandwich', price: 7.99, image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=500&auto=format', restaurant: 'Brothers Cafe' },
  ],
  'Spice Garden': [
    { id: '7', name: 'Biryani', price: 14.99, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format', restaurant: 'Spice Garden' },
    { id: '8', name: 'Chicken Tikka', price: 12.99, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format', restaurant: 'Spice Garden' },
    { id: '9', name: 'Naan Bread', price: 3.99, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format', restaurant: 'Spice Garden' },
  ]
};

const HotelDetailScreen = ({ route, navigation }) => {
  const { hotel } = route.params;
  const [cartItems, setCartItems] = useState({});
  
  // Get food items for the selected hotel
  const foodItems = foodData[hotel.title] || [];
  
  // Load cart items from storage on component mount
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cartItems');
        if(storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.log('Error loading cart items', error);
      }
    };
    
    loadCartItems();
  }, []);
  
  // Save cart items to storage whenever it changes
  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.log('Error saving cart items', error);
      }
    };
    
    saveCartItems();
  }, [cartItems]);
  
  // Calculate total cost of items in cart
 // Helper function to find a food item by id across all restaurants
const findFoodItemById = (itemId) => {
  for (const restaurant in foodData) {
    const item = foodData[restaurant].find(food => food.id === itemId);
    if (item) return item;
  }
  return null;
};

// Calculate total cost of items in cart
const totalCost = Object.keys(cartItems).reduce((total, itemId) => {
  const item = findFoodItemById(itemId);
  return total + (item ? item.price * cartItems[itemId] : 0);
}, 0);

  
  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };
  
  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] = newCart[itemId] - 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };
  
  // Convert cart items to the format expected by CartScreen
  const prepareCartItemsForCart = () => {
    return Object.keys(cartItems).map(id => {
      const item = findFoodItemById(id);
      return {
        id,
        name: item.name,
        price: item.price,
        quantity: cartItems[id],
        image: item.image,
        restaurant: item.restaurant
      };
    });
  };
  
  const renderFoodItem = ({ item }) => (
    <View style={styles.foodCard}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodPrice}>Rs. {item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        {cartItems[item.id] ? (
          <>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => removeFromCart(item.id)}
            >
              <Minus size={16} color="#FF9B6B" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cartItems[item.id]}</Text>
          </>
        ) : null}
        <TouchableOpacity 
          style={styles.quantityButton} 
          onPress={() => addToCart(item.id)}
        >
          <Plus size={16} color="#FF9B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{hotel.title}</Text>
        <View style={styles.headerRight} />
      </View>
      
      <Text style={styles.description}>{hotel.description}</Text>
      
      <FlatList
        data={foodItems}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.foodList}
      />
      
      {Object.keys(cartItems).length > 0 && (
        <View style={styles.cartSummary}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartTotal}>Total: Rs. {totalCost.toFixed(2)}</Text>
            <Text style={styles.cartItemCount}>
              {Object.values(cartItems).reduce((a, b) => a + b, 0)} items
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.viewCartButton}
            onPress={() => {
              // Pass formatted cart items to Cart Screen
              navigation.navigate('Cart', { 
                cartItems: prepareCartItemsForCart()
              });
            }}
          >
            <ShoppingCart size={20} color="#FFF" />
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  foodList: {
    padding: 16,
    paddingBottom: 100,
  },
  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  foodInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 16,
    color: '#FF9B6B',
    fontWeight: '500',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantityButton: {
    backgroundColor: '#FFF5F0',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cartInfo: {
    flex: 1,
  },
  cartTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemCount: {
    fontSize: 14,
    color: '#666',
  },
  viewCartButton: {
    flexDirection: 'row',
    backgroundColor: '#FF9B6B',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewCartText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HotelDetailScreen;
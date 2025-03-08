import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminPanel = ({ navigation }) => {
  // State for user info
  const [userInfo, setUserInfo] = useState(null);
  
  // Sample hotel-specific data
  const allOrders = {
    'Desi Tadka': [
      {
        id: '1',
        customerName: 'John Doe',
        items: ['Butter Chicken', 'Naan'],
        total: 22.99,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
      },
      {
        id: '2',
        customerName: 'Akash Kumar',
        items: ['Paneer Tikka', 'Dal Makhani'],
        total: 18.50,
        status: 'preparing',
        date: new Date().toISOString().split('T')[0],
      },
    ],
    'Brothers Cafe': [
      {
        id: '3',
        customerName: 'Jane Smith',
        items: ['Avocado Toast', 'Cappuccino'],
        total: 14.98,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
      },
      {
        id: '4',
        customerName: 'Mike Wilson',
        items: ['Croissant Sandwich', 'Coffee'],
        total: 12.99,
        status: 'delivered',
        date: new Date().toISOString().split('T')[0],
      },
    ]
  };
  
  const allMenuItems = {
    'Desi Tadka': [
      {
        id: '1',
        name: 'Butter Chicken',
        price: 14.99,
        category: 'Main Course',
      },
      {
        id: '2',
        name: 'Paneer Tikka',
        price: 10.99,
        category: 'Appetizer',
      },
      {
        id: '3',
        name: 'Dal Makhani',
        price: 8.99,
        category: 'Main Course',
      },
    ],
    'Brothers Cafe': [
      {
        id: '4',
        name: 'Avocado Toast',
        price: 9.99,
        category: 'Breakfast',
      },
      {
        id: '5',
        name: 'Cappuccino',
        price: 4.99,
        category: 'Beverages',
      },
      {
        id: '6',
        name: 'Croissant Sandwich',
        price: 7.99,
        category: 'Breakfast',
      },
    ]
  };

  // State for filtered data
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);

  // Modal states
  const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: '',
  });

  // Load user info from AsyncStorage on component mount
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
          
          // Filter data based on hotel ID
          if (parsedUserInfo.hotelId) {
            const hotelOrders = allOrders[parsedUserInfo.hotelId] || [];
            const hotelMenuItems = allMenuItems[parsedUserInfo.hotelId] || [];
            
            setOrders(hotelOrders);
            setMenuItems(hotelMenuItems);
            
            // Calculate today's total
            calculateTodayTotal(hotelOrders);
          } else if (parsedUserInfo.role === 'owner') {
            // For owner, show all data from all hotels
            const allOrdersArray = Object.values(allOrders).flat();
            const allMenuItemsArray = Object.values(allMenuItems).flat();
            
            setOrders(allOrdersArray);
            setMenuItems(allMenuItemsArray);
            
            // Calculate today's total for all hotels
            calculateTodayTotal(allOrdersArray);
          }
        }
      } catch (error) {
        console.log('Error loading user info', error);
      }
    };
    
    loadUserInfo();
  }, []);

  // Function to calculate today's total
  const calculateTodayTotal = (ordersList) => {
    const today = new Date().toISOString().split('T')[0];
    
    const total = ordersList.reduce((sum, order) => {
      // Check if order date matches today's date
      if (order.date === today) {
        return sum + order.total;
      }
      return sum;
    }, 0);
    
    setTodayTotal(total);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFB020';
      case 'preparing':
        return '#14B8A6';
      case 'delivered':
        return '#2196F3';
      default:
        return '#9CA3AF';
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.itemsText}>{item.items.join(', ')}</Text>
        <Text style={styles.totalText}>Rs.{item.total}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <Text style={styles.priceText}>Rs.{item.price}</Text>
    </View>
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  const addNewMenuItem = () => {
    // Validate input
    if (!newItem.name || !newItem.price || !newItem.category) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // Create new menu item
    const newMenuItem = {
      id: String(Date.now()), // Generate unique ID
      name: newItem.name,
      price: parseFloat(newItem.price),
      category: newItem.category,
    };
    
    // Add to state
    setMenuItems([...menuItems, newMenuItem]);
    
    // Close modal and reset form
    setAddItemModalVisible(false);
    setNewItem({ name: '', price: '', category: '' });
  };

  const refreshData = () => {
    // In a real app, this would fetch fresh data from the server
    // For now, we'll just recalculate today's total
    if (userInfo?.hotelId) {
      calculateTodayTotal(allOrders[userInfo.hotelId] || []);
    } else if (userInfo?.role === 'owner') {
      calculateTodayTotal(Object.values(allOrders).flat());
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {userInfo?.hotelId ? `${userInfo.hotelId} Dashboard` : 'Restaurant Dashboard'}
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather name="log-out" size={20} color="#FF4D67" />
          </TouchableOpacity>
        </View>

        {/* Daily Total Card */}
        <View style={styles.dailyTotalCard}>
          <View style={styles.dailyTotalHeader}>
            <Text style={styles.dailyTotalTitle}>Today's Total</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
              <Feather name="refresh-cw" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.dailyTotalAmount}>Rs.{todayTotal.toFixed(2)}</Text>
          <Text style={styles.dailyTotalDate}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        {/* Admin Info */}
        {userInfo && (
          <View style={styles.adminInfo}>
            <Text style={styles.adminName}>Welcome, {userInfo.name}</Text>
            <Text style={styles.adminRole}>{userInfo.role === 'admin' ? 'Administrator' : 'Owner'}</Text>
          </View>
        )}

        {/* Orders Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Orders</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
              <Feather name="refresh-cw" size={20} color="#FF4D67" />
            </TouchableOpacity>
          </View>
          {orders.length > 0 ? (
            <FlatList
              data={orders}
              renderItem={renderOrderItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.emptyMessage}>No active orders</Text>
          )}
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Menu Items</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setAddItemModalVisible(true)}>
              <Feather name="plus" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
          {menuItems.length > 0 ? (
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.emptyMessage}>No menu items</Text>
          )}
        </View>
      </ScrollView>

      {/* Add Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddItemModalVisible}
        onRequestClose={() => setAddItemModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Menu Item</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="decimal-pad"
              value={newItem.price}
              onChangeText={(text) => setNewItem({ ...newItem, price: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newItem.category}
              onChangeText={(text) => setNewItem({ ...newItem, category: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setAddItemModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={addNewMenuItem}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  logoutButton: {
    padding: 8,
  },
  dailyTotalCard: {
    backgroundColor: '#FF4D67',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  dailyTotalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dailyTotalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  dailyTotalAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  dailyTotalDate: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  },
  adminInfo: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 8,
  },
  adminName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  adminRole: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  refreshButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4D67',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  itemsText: {
    color: '#4B5563',
    marginBottom: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4D67',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  categoryText: {
    color: '#6B7280',
    fontSize: 14,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4D67',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#FF4D67',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    marginVertical: 20,
  },
});

export default AdminPanel;
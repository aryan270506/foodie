import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView
} from 'react-native';
import { Clock, Check, Package, ShoppingBag, ShoppingCart, Home, User } from 'lucide-react-native';

// Sample data for ongoing orders
const ongoingOrders = [
  {
    id: 1,
    restaurant: "Harvey's",
    items: "1x Special Burger Combo, 1x Fries",
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
    price: "Rs.18.99",
    status: "On the way",
    estimatedTime: "15 min",
    orderDate: "Today, 12:30 PM"
  },
  {
    id: 2,
    restaurant: "Pizza Hub",
    items: "1x Large Pepperoni, 1x Garlic Bread",
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format',
    price: "Rs.24.50",
    status: "Preparing",
    estimatedTime: "25 min",
    orderDate: "Today, 1:15 PM"
  }
];

// Sample data for completed orders
const completedOrders = [
  {
    id: 3,
    restaurant: "Desi Tadka",
    items: "1x Butter Chicken, 2x Naan",
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format',
    price: "Rs.22.75",
    status: "Delivered",
    orderDate: "Yesterday, 7:45 PM"
  },
  {
    id: 4,
    restaurant: "KFC",
    items: "1x Chicken Bucket, 2x Coleslaw",
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
    price: "Rs.28.99",
    status: "Delivered",
    orderDate: "Feb 25, 6:20 PM"
  },
  {
    id: 5,
    restaurant: "Brothers Cafe",
    items: "2x Cappuccino, 1x Chocolate Cake",
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format',
    price: "Rs.15.50",
    status: "Delivered",
    orderDate: "Feb 24, 10:15 AM"
  }
];

const OrdersScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const renderOrderCard = (order, isOngoing) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Image source={{ uri: order.image }} style={styles.restaurantImage} />
        <View style={styles.orderHeaderInfo}>
          <Text style={styles.restaurantName}>{order.restaurant}</Text>
          <Text style={styles.orderDate}>{order.orderDate}</Text>
        </View>
        <View style={[styles.statusBadge, 
          order.status === "Delivered" ? styles.deliveredBadge : 
          order.status === "On the way" ? styles.onTheWayBadge : 
          styles.preparingBadge]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderDetails}>
        <Text style={styles.orderItems}>{order.items}</Text>
        <Text style={styles.orderPrice}>{order.price}</Text>
      </View>
      
      {isOngoing && (
        <View style={styles.orderFooter}>
          <View style={styles.estimatedTime}>
            <Clock size={16} color="#FF9B6B" />
            <Text style={styles.estimatedTimeText}>Est. time: {order.estimatedTime}</Text>
          </View>
          

        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
          onPress={() => setActiveTab('ongoing')}
        >
          <Package size={16} color={activeTab === 'ongoing' ? "#FF9B6B" : "#666"} />
          <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>Ongoing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Check size={16} color={activeTab === 'completed' ? "#FF9B6B" : "#666"} />
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.ordersContainer}>
          {activeTab === 'ongoing' ? (
            ongoingOrders.length > 0 ? (
              ongoingOrders.map(order => renderOrderCard(order, true))
            ) : (
              <View style={styles.emptyState}>
                <Package size={60} color="#DDD" />
                <Text style={styles.emptyStateText}>No ongoing orders</Text>
              </View>
            )
          ) : (
            completedOrders.length > 0 ? (
              completedOrders.map(order => renderOrderCard(order, false))
            ) : (
              <View style={styles.emptyState}>
                <Check size={60} color="#DDD" />
                <Text style={styles.emptyStateText}>No completed orders</Text>
              </View>
            )
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation - matching the Home screen */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
            onPress={() => navigation.navigate('HomeScreen')}

        >
          <Home size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <ShoppingBag size={24} color="#FF9B6B" />
          <Text style={[styles.navText, styles.activeNavText]}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Cart')} 
        >
          <ShoppingCart size={24} color="#666" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        > 
          <User size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 25,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#FFF5F0',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF9B6B',
  },
  scrollView: {
    flex: 1,
  },
  ordersContainer: {
    padding: 16,
    paddingBottom: 80,
    gap: 16,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  orderHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  deliveredBadge: {
    backgroundColor: '#E8F5E9',
  },
  onTheWayBadge: {
    backgroundColor: '#FFF5F0',
  },
  preparingBadge: {
    backgroundColor: '#FFF8E1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  orderDetails: {
    marginBottom: 12,
  },
  orderItems: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9B6B',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  estimatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  estimatedTimeText: {
    fontSize: 13,
    color: '#FF9B6B',
  },
  trackButton: {
    backgroundColor: '#FF9B6B',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  trackButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  activeNavText: {
    color: '#FF9B6B',
    fontWeight: '500',
  },
});

export default OrdersScreen;

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StatCard = ({ title, value, icon, backgroundColor }) => (
  <View style={[styles.statCard, { backgroundColor }]}>
    <Ionicons name={icon} size={24} color="#666" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const OrderCard = ({ order }) => (
  <View style={styles.orderCard}>
    <View style={styles.orderHeader}>
      <Text style={styles.orderId}>Order #{order.id}</Text>
      <View style={[
        styles.statusBadge,
        {
          backgroundColor: 
            order.status === 'Delivered' ? '#e6ffe6' :
            order.status === 'In Progress' ? '#e6f2ff' : '#fff3e6'
        }
      ]}>
        <Text style={[
          styles.statusText,
          {
            color:
              order.status === 'Delivered' ? '#006600' :
              order.status === 'In Progress' ? '#004d99' : '#cc7700'
          }
        ]}>
          {order.status}
        </Text>
      </View>
    </View>

    <View style={styles.orderDetails}>
      <View style={styles.detailRow}>
        <Ionicons name="person-outline" size={16} color="#666" />
        <Text style={styles.label}>Customer:</Text>
        <Text style={styles.value}>{order.customerName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="business-outline" size={16} color="#666" />
        <Text style={styles.label}>Hotel:</Text>
        <Text style={styles.value}>{order.hotel}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="restaurant-outline" size={16} color="#666" />
        <Text style={styles.label}>Items:</Text>
        <Text style={styles.value}>{order.items.join(', ')}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={16} color="#666" />
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>
          {new Date(order.orderTime).toLocaleString()}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="cash-outline" size={16} color="#666" />
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.total}>Rs. {order.total.toFixed(2)}</Text>
      </View>
    </View>
  </View>
);

const OwnerDashboard = () => {
  const navigation = useNavigation();
  const [orders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      hotel: "Grand Hotel",
      items: ["Pizza", "Coke"],
      orderTime: "2024-02-11T12:30:00",
      status: "Delivered",
      total: 25.99
    },
    {
      id: 2,
      customerName: "Jane Smith",
      hotel: "Royal Palace",
      items: ["Burger", "Fries", "Shake"],
      orderTime: "2024-02-11T13:45:00",
      status: "In Progress",
      total: 32.50
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      hotel: "Grand Hotel",
      items: ["Pasta", "Salad"],
      orderTime: "2024-02-11T14:15:00",
      status: "Pending",
      total: 28.75
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.hotel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const uniqueHotels = [...new Set(orders.map(order => order.hotel))].length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by customer or hotel..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <View style={styles.logoutContainer}>
  <TouchableOpacity 
    style={styles.logoutButton}
    onPress={() => navigation.navigate('Auth')}
  >
    <Ionicons name="log-out-outline" size={24} color="#fff" />
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
</View>

      <View style={styles.view}>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon="receipt-outline"
          backgroundColor="#e6f2ff"
        />
        <TouchableOpacity  onPress={() => navigation.navigate('PartnerHotels', { orders })}>
        <StatCard
          title="Partner Hotels"
          value={uniqueHotels}
          icon="business-outline"
          backgroundColor="#e6ffe6"
         
          />
          </TouchableOpacity>
        <StatCard
          title="Total Revenue"
          value={`Rs. ${totalRevenue.toFixed(2)}`} // Use template literals and ${} for interpolation
          icon="cash-outline"
          backgroundColor="#ffe6ff"
/>
      </ScrollView>
      </View>

      <View style={styles.ordersHeader}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  view: {
    padding: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  statsContainer: {
    padding: 16,
  },
  statCard: {
    padding: 16,
    borderRadius: 8,
    marginRight: 12,
    width: 150,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  ordersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 8,
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: '#666',
    fontSize: 14,
    width: 70,
  },
  value: {
    fontSize: 14,
    flex: 1,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default OwnerDashboard;
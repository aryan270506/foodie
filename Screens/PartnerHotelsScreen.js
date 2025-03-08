import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PartnerHotelsScreen = ({ navigation, route }) => {
  const { orders } = route.params; // Pass orders data from OwnerDashboard

  // Get unique hotels from orders
  const uniqueHotels = [...new Set(orders.map(order => order.hotel))];

  // Function to calculate same-day revenue and orders for a hotel
  const getHotelStats = (hotelName) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const hotelOrders = orders.filter(order =>
      order.hotel === hotelName && order.orderTime.split('T')[0] === today
    );
    const revenue = hotelOrders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = hotelOrders.length;
    return { revenue, orderCount };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partner Hotels</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <FlatList
        data={uniqueHotels}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.hotelCard}
            onPress={() =>
              navigation.navigate('HotelRevenueScreen', {
                hotelName: item,
                ...getHotelStats(item),
              })
            }
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image
              style={styles.hotelImage}
            />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName}>{item}</Text>
              <Text style={styles.hotelStats}>
                Today's Revenue: Rs. {getHotelStats(item).revenue.toFixed(2)}
              </Text>
              <Text style={styles.hotelStats}>
                Today's Orders: {getHotelStats(item).orderCount}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#95A5A6" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
  },
  listContainer: {
    padding: 16,
  },
  hotelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hotelImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  hotelInfo: {
    flex: 1,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  hotelStats: {
    fontSize: 14,
    color: '#95A5A6',
  },
});

export default PartnerHotelsScreen;
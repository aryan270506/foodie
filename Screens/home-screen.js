import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  SafeAreaView
} from 'react-native';
import { Search, Clock, MapPin, Home, ShoppingBag, ShoppingCart, User } from 'lucide-react-native';

// Offers data array - add new offers here
const offers = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
    title: "Harvey's",
    description: 'Special Burger Combo'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format',
    title: 'KFC',
    description: 'Chicken Bucket Deal'
  },
  // Add more offers by copying the format above
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
    title: 'Pizza Hub',
    description: 'Buy 1 Get 1 Free'
  }
];

// Hotels data array - add new hotels here
const hotels = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format',
    title: 'Desi Tadka',
    description: 'Traditional Cuisine'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
    title: 'Brothers Cafe',
    description: 'Modern Fusion'
  },
  // Add more hotels by copying the format above
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format',
    title: 'Spice Garden',
    description: 'Authentic Indian'
  }
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 22) return "Good Evening";
  return "Good Night";
};

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Food, Restaurants etc."
                placeholderTextColor="#666"
              />
            </View>
            <View style={styles.deliveryTime}>
              <Clock size={16} color="#FF9B6B" />
              <Text style={styles.deliveryTimeText}>35 min</Text>
            </View>
            <View style={styles.orderNow}>
              <MapPin size={16} color="#FF9B6B" />
              <Text style={styles.orderNowText}>Order Now</Text>
            </View>
          </View>
        </View>

        {/* Offers Section */}
        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>Offers For you</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((offer) => (
              <TouchableOpacity key={offer.id} style={styles.offerCard}>
                <Image
                  source={{ uri: offer.image }}
                  style={styles.offerImage}
                />
                <View style={styles.offerInfo}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerDescription}>{offer.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Hotels Section */}
        <View style={styles.trendingSection}>
          <Text style={styles.sectionTitle}>List Of Hotels</Text>
          <View style={styles.trendingGrid}>
            {hotels.map((hotel) => (
              <TouchableOpacity 
                key={hotel.id} 
                style={styles.trendingCard}
                onPress={() => navigation.navigate('HotelDetailScreen', { hotel })}
              >
                <Image
                  source={{ uri: hotel.image }}
                  style={styles.trendingImage}
                />
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingTitle}>{hotel.title}</Text>
                  <Text style={styles.trendingDescription}>{hotel.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
          <Home size={24} color="#FF9B6B" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Orders')}>
          <ShoppingBag size={24} color="#666" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
          <ShoppingCart size={24} color="#666" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 25,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    gap: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  deliveryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF5F0',
    padding: 8,
    borderRadius: 8,
  },
  deliveryTimeText: {
    color: '#FF9B6B',
    fontWeight: '500',
  },
  orderNow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF5F0',
    padding: 8,
    borderRadius: 8,
  },
  orderNowText: {
    color: '#FF9B6B',
    fontWeight: '500',
  },
  offersSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  offerCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  offerInfo: {
    padding: 12,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
  },
  trendingSection: {
    padding: 16,
    paddingBottom: 80,
  },
  trendingGrid: {
    gap: 16,
  },
  trendingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trendingImage: {
    width: 100,
    height: 100,
  },
  trendingInfo: {
    flex: 1,
    padding: 12,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  trendingDescription: {
    fontSize: 14,
    color: '#666',
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

export default HomeScreen;
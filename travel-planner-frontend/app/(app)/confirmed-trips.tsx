import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

interface Activity {
  name: string;
  description: string;
  duration: string;
  cost: number;
  day: number;
}

interface Accommodation {
  name: string;
  type: string;
  cost: number;
  description: string;
}

interface Plan {
  title: string;
  description: string;
  activities: Activity[];
  totalCost: number;
  duration: string;
  accommodation: Accommodation;
}

interface ConfirmedTrip {
  id: string;
  region: string;
  lifestyle: string;
  selected_plan: Plan;
  confirmedAt?: string;
}

export default function ConfirmedTripsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trips, setTrips] = useState<ConfirmedTrip[]>([]);

  useEffect(() => {
    fetchConfirmedTrips();
  }, []);

  const fetchConfirmedTrips = async () => {
    try {
      const response = await axios.get('https://travel-planner-backend-qeum.onrender.com/api/confirmed-trips/');
      setTrips(response.data);
    } catch (err) {
      setError('Failed to fetch confirmed trips. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading your trips...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchConfirmedTrips}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (trips.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noTripsText}>No confirmed trips yet</Text>
        <TouchableOpacity style={styles.planButton} onPress={() => router.push('/(app)/plan')}>
          <Text style={styles.planButtonText}>Plan a Trip</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Confirmed Trips</Text>
      <Text style={styles.subtitle}>All your upcoming adventures in Morocco</Text>

      <View style={styles.trips}>
        {trips.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <View>
                <Text style={styles.tripRegion}>{trip.region}</Text>
                <Text style={styles.tripLifestyle}>{trip.lifestyle}</Text>
              </View>
              <Text style={styles.tripDate}>
                {trip.confirmedAt ? new Date(trip.confirmedAt).toLocaleDateString() : '---'}
              </Text>
            </View>

            <Text style={styles.planTitle}>{trip.selected_plan.title}</Text>
            <Text style={styles.planDescription}>{trip.selected_plan.description}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Accommodation</Text>
              <Text style={styles.accommodationName}>{trip.selected_plan.accommodation.name}</Text>
              <Text style={styles.accommodationType}>{trip.selected_plan.accommodation.type}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Activities</Text>
              {trip.selected_plan.activities.map((activity, index) => (
                <View key={index} style={styles.activity}>
                  <Text style={styles.activityTitle}>{activity.name}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityTime}>{activity.duration}</Text>
                </View>
              ))}
            </View>

            <View style={styles.totalCost}>
              <Text style={styles.totalCostLabel}>Total Cost</Text>
              <Text style={styles.totalCostValue}>{trip.selected_plan.totalCost} MAD</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { fontSize: 16, color: '#666', marginTop: 16 },
  errorText: { fontSize: 16, color: '#dc2626', textAlign: 'center', marginBottom: 16 },
  noTripsText: { fontSize: 18, color: '#666', marginBottom: 24, textAlign: 'center' },
  retryButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  retryButtonText: { fontSize: 16, color: '#fff' },
  planButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  planButtonText: { fontSize: 18, color: '#fff' },
  title: { fontSize: 32, marginBottom: 8, marginTop: 48, paddingHorizontal: 24 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32, paddingHorizontal: 24 },
  trips: { padding: 24, gap: 24 },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  tripRegion: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  tripLifestyle: { fontSize: 14, color: '#666', marginTop: 4 },
  tripDate: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  planTitle: { fontSize: 24, marginBottom: 8 },
  planDescription: { fontSize: 16, color: '#666', marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, marginBottom: 16 },
  accommodationName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  accommodationType: { fontSize: 14, color: '#666' },
  activity: { marginBottom: 16 },
  activityTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  activityDescription: { fontSize: 14, color: '#666', marginBottom: 4 },
  activityTime: { fontSize: 14, color: '#666' },
  totalCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalCostLabel: { fontSize: 18, fontWeight: '600' },
  totalCostValue: { fontSize: 24, fontWeight: 'bold' },
});
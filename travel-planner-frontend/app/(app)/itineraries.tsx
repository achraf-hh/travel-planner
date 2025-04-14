import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
  id: string;
  title: string;
  description: string;
  activities: Activity[];
  totalCost: number;
  duration: string;
  accommodation: Accommodation;
}

export default function ItinerariesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.post('https://travel-planner-backend-qeum.onrender.com/api/plan/', {
        region: params.region,
        budget: Number(params.budget),
        currency: params.currency,
        lifestyle: params.lifestyle,
      });
      setPlans(response.data.plans);
    } catch (err) {
      setError('Failed to fetch itineraries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (plan: Plan) => {
    try {
      await axios.post('https://travel-planner-backend-qeum.onrender.com/api/confirm-trip/', {
        region: params.region,
        budget: Number(params.budget),
        currency: params.currency,
        lifestyle: params.lifestyle,
        selectedPlan: plan,
      });
      router.push('/(app)/confirmation');
    } catch (err) {
      setError('Failed to confirm trip. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Creating your perfect itineraries...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPlans}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Custom Itineraries</Text>
      <Text style={styles.subtitle}>Choose the perfect plan for your trip</Text>

      <View style={styles.plans}>
        {plans.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <Text style={styles.planDuration}>{plan.duration}</Text>
            </View>

            <Text style={styles.planDescription}>{plan.description}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Accommodation</Text>
              <Text style={styles.accommodationName}>{plan.accommodation.name}</Text>
              <Text style={styles.accommodationType}>{plan.accommodation.type}</Text>
              <Text style={styles.accommodationPrice}>
                {params.currency} {plan.accommodation.cost} per night
              </Text>
              <Text style={styles.accommodationType}>{plan.accommodation.description}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Activities</Text>
              {plan.activities.map((activity, index) => (
                <View key={index} style={styles.activity}>
                  <Text style={styles.activityTitle}>{activity.name}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityTime}>{activity.duration} • Day {activity.day}</Text>
                  <Text style={styles.activityCost}>
                    {params.currency} {activity.cost.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.totalCost}>
              <Text style={styles.totalCostLabel}>Total Cost</Text>
              <Text style={styles.totalCostValue}>
                {params.currency} {plan.totalCost.toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity style={styles.selectButton} onPress={() => handleSelect(plan)}>
              <Text style={styles.selectButtonText}>Select This Plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  errorText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  retryButtonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontFamily: 'PlayfairBold',
    fontSize: 32,
    marginBottom: 8,
    marginTop: 48,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  plans: {
    padding: 24,
    gap: 24,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    fontFamily: 'InterBold',
    fontSize: 24,
    flex: 1,
  },
  planDuration: {
    fontFamily: 'InterSemiBold',
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  planDescription: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  accommodationName: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  accommodationType: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  accommodationPrice: {
    fontFamily: 'InterSemiBold',
    fontSize: 14,
    color: '#000',
  },
  activity: {
    marginBottom: 16,
  },
  activityTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  activityDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityTime: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityCost: {
    fontFamily: 'InterSemiBold',
    fontSize: 14,
    color: '#000',
  },
  totalCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalCostLabel: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
  },
  totalCostValue: {
    fontFamily: 'InterBold',
    fontSize: 24,
  },
  selectButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  selectButtonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    color: '#fff',
  },
});

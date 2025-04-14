import {ScrollView , View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const LIFESTYLES = [
  {
    id: 'food-lover',
    title: 'Food Lover',
    description: 'Explore local cuisine and food markets',
    image: 'https://images.unsplash.com/photo-1517314687957-13af800de1c5?q=80&w=1000',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Discover hidden gems and local culture',
    image: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?q=80&w=1000',
  },
  {
    id: 'comfort-seeker',
    title: 'Comfort Seeker',
    description: 'Luxurious stays and relaxing experiences',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000',
  },
];

export default function LifestyleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleSelect = (lifestyle: string) => {
    router.push({
      pathname: '/(app)/itineraries',
      params: { ...params, lifestyle },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Your Travel Style</Text>
      <Text style={styles.subtitle}>Select the experience that matches your preferences</Text>

      <View style={styles.grid}>
        {LIFESTYLES.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={styles.card}
            onPress={() => handleSelect(style.id)}
          >
            <Image source={{ uri: style.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{style.title}</Text>
              <Text style={styles.cardDescription}>{style.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'PlayfairBold',
    fontSize: 32,
    marginBottom: 8,
    marginTop: 48,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  grid: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 20,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1000' }}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Travel Planner</Text>
        <Text style={styles.subtitle}>Discover Morocco's Hidden Gems</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.buttonText}>Start Planning</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontFamily: 'PlayfairBold',
    fontSize: 42,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    color: '#000',
  },
});
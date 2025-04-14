import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Trip Confirmed! 🎉</Text>
        <Text style={styles.message}>
          Your travel itinerary has been saved. Get ready for an amazing adventure in Morocco!
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(app)/confirmed-trips')}
          >
            <Text style={styles.buttonText}>View All Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.replace('/(app)/plan')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Plan Another Trip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlayfairBold',
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter',
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  secondaryButtonText: {
    color: '#000',
  },
});
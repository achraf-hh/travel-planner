import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="plan" />
      <Stack.Screen name="lifestyle" />
      <Stack.Screen name="itineraries" />
      <Stack.Screen name="confirmation" />
      <Stack.Screen name="confirmed-trips" />
    </Stack>
  );
}
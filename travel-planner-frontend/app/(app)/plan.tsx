import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

const REGIONS = ['Marrakesh', 'Essaouira', 'Safi', 'Agadir'];
const CURRENCIES = ['USD', 'MAD', 'EUR', 'GBP'];

export default function PlanScreen() {
  const router = useRouter();
  const [budget, setBudget] = useState('');
  const [region, setRegion] = useState(REGIONS[0]);
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  const handleNext = () => {
    if (!budget || !region || !currency) return;
    router.push({
      pathname: '/(app)/lifestyle',
      params: { budget, region, currency },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Plan Your Trip</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Your Budget</Text>
          <TextInput
            style={styles.input}
            value={budget}
            onChangeText={setBudget}
            placeholder="Enter your budget"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Currency</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currency}
              onValueChange={setCurrency}
              style={styles.picker}
            >
              {CURRENCIES.map((curr) => (
                <Picker.Item key={curr} label={curr} value={curr} color="black" />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Region</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={region}
              onValueChange={setRegion}
              style={styles.picker}
            >
              {REGIONS.map((reg) => (
                <Picker.Item key={reg} label={reg} value={reg} color="black" />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !budget && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!budget}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'PlayfairBold',
    fontSize: 32,
    marginBottom: 32,
    marginTop: 48,
  },
  form: {
    flex: 1,
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: '#333',
  },
  input: {
    fontFamily: 'Inter',
    color: 'black',
    fontSize: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  pickerContainer: {
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  picker: {
    padding: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    color: '#fff',
  },
});

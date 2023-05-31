import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChonseSelect } from 'react-native-chonse-select';

const GenderSelector = ({ onSelectGender }: any) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderChange = (value: any) => {
    setSelectedGender(value);
    onSelectGender(value);
  };

  const data = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender</Text>
      <ChonseSelect
        height={35}
        style={{ marginLeft: 20, marginBottom: 10 }}
        data={data}
        initValue={selectedGender}
        onPress={handleGenderChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default GenderSelector;

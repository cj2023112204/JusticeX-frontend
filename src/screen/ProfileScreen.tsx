import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../config';

import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const VerdictScreen = () => {
  const navigation = useNavigation();
  const [verdictData, setVerdictData] = useState<any>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    fetchVerdictData();
  }, []);

  const fetchVerdictData = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    fetch(`${API_URL}/account/get_account/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setVerdictData(responseData.data);
        decodeImage(responseData.data.picture);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const decodeImage = (base64Data: string) => {
    const imageData = `data:image/jpeg;base64,${base64Data}`;
    setImageData(imageData);
  };

  if (!verdictData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>判例标题:</Text>
      <Text style={styles.verdictTitle}>{verdictData.email}</Text>
      {imageData && <Image source={{ uri: imageData }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FF7043',
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  verdictContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  verdictTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  verdictData: {
    fontSize: 16,
    lineHeight: 20,
  },
});

export default VerdictScreen;

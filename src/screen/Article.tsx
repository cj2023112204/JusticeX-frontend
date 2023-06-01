import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../config';

const VerdictScreen = () => {
  const navigation = useNavigation();
  const [incidentType, setIncidentType] = useState('incident');
  const [verdictData, setVerdictData] = useState(null);

  useEffect(() => {
    fetchVerdictData();
  }, []);

  const fetchVerdictData = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    fetch(`${API_URL}/verdict/get_verdict/?verdict_id=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
      .then(response => response.json())
      .then(responseData => {
        setVerdictData(responseData.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleToggleIncidentType = () => {
    setIncidentType(incidentType === 'incident' ? 'incident_lite' : 'incident');
  };

  if (!verdictData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleToggleIncidentType} style={styles.button}>
        <Text style={styles.buttonText}>切换案件类型</Text>
      </TouchableOpacity>
      <View style={styles.verdictContainer}>
        <Text style={styles.title}>判例标题:</Text>
        <Text style={styles.verdictTitle}>{verdictData.title}</Text>
      </View>
      <View style={styles.verdictContainer}>
        <Text style={styles.title}>判例数据:</Text>
        <Text style={styles.verdictData}>{verdictData[incidentType]}</Text>
      </View>
    </ScrollView>
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

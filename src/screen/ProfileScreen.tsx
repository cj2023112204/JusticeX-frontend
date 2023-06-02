import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../config';

import { View, Dimensions, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const VerdictScreen = () => {
  const navigation = useNavigation();
  const [verdictData, setVerdictData] = useState<any>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const windowWidth = Dimensions.get('window').width;
  const imageWidth = (windowWidth - 20) / 3;

  const onPressed = () => {
    navigation.navigate('ChangePassword' as never); // Remove unnecessary type casting
  };
  const changeavatar = () => {
    navigation.navigate('ChangeAvatar' as never); // Remove unnecessary type casting
  };
  const changeprofile = () => {
    navigation.navigate('ChangeProfile' as never); // Remove unnecessary type casting
  };

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
      <View style={styles.container}>
      <TouchableOpacity onPress={changeprofile}>
        {imageData && <Image source={{ uri: imageData }} style={[
          styles.avatar, { borderRadius: imageWidth / 2 },
        ]} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.name} onPress={changeprofile}>
        <Text style={styles.verdictTitle}>{verdictData.name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={changeprofile}>
          <Text style={styles.TextTitle}>性別</Text>
          <Text style={styles.verdictTitle}>{verdictData.gender === 'F' ? '女' : '男'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={changeprofile}>
          <Text style={styles.TextTitle}>職稱</Text>
          <Text style={styles.verdictTitle}>{verdictData.job_name}</Text>
        </TouchableOpacity>

        <View style={styles.separator}></View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.favoriteButton} onPress={onPressed}>
          <Text style={styles.TextTitle}>更改密碼</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',

  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  Text: {
    color: 'grey',
    fontSize: 16,
    marginTop: 15,
  },
  avatar: {
    width: 100,
    height: 100,

  },
  name: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    height: 3,
    width: 350,
    backgroundColor: 'black',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 350,
    paddingVertical: 10,
  },
  favoriteButton: {
    width: 350,
    paddingVertical: 10,
  },
  TextTitle: {
    color: 'black',
    fontSize: 16,
    marginLeft: 15,
  },
  verdictTitle: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 15,
    marginLeft: 15,
  },
});

export default VerdictScreen;

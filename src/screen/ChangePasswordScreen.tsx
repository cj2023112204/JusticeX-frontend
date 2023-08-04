import { View, Text,TextInput, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { API_URL } from '../../config';

const ChangePprofileScreen = () => {

  // const navigation = useNavigation();

  //const API_URL = 'http://13.208.146.112:8000/api';

  const [email, setname] = useState('11136018@ntub.edu.tw');
  const [password, setPassword] = useState('');
  const [repassword, resetPassword] = useState('');
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  //const API_URL = 'http://13.208.146.112:8000/api';

  const onChangePw = async () => {
    if (password === repassword) {
      const accessToken = await AsyncStorage.getItem('access_token');
      fetch(`${API_URL}/account/change_password/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            console.log(data.message);
          } else {
            console.log('error');
          }
          console.log(data);
          navigation.goBack();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setErrorMessage('請輸入相同的密碼');
    }
  };

  const onPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>更改密碼</Text>

        {/* <View style={styles.container}>
            <TextInput placeholder="new password"/>
        </View> */}
        <CustomInput
          placeholder="請輸入新密碼"
          value={password}
          setValue={setPassword}
        />
        <CustomInput
          placeholder="請再次輸入密碼"
          value={repassword}
          setValue={resetPassword}
        />
        {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}

        <CustomButton text="確定" onPress={onChangePw} />

        <CustomButton
          text="返回"
          onPress={onPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  error: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
},
});

export default ChangePprofileScreen;

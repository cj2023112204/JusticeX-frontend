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
  const [password, setPassword] = useState('11136018');
  const navigation = useNavigation();
  
  //const API_URL = 'http://13.208.146.112:8000/api';

  const onChangePw = async() => {
      // console.warn('onSubmitPressed');
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
            // Handle response data
            //setUsername(data)
            //setPassword(data)
            if(data.success===true){
              console.log(data.message)
            }else{
              console.log('error')
            }
            console.log(data)
            navigation.goBack();
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });

      //navigation.navigate('SignIn' as never);
  };
  const onPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your change password</Text>

        {/* <View style={styles.container}>
            <TextInput placeholder="new password"/>
        </View> */}
        <CustomInput
          placeholder="new password"
          value={password}
          setValue={setPassword}
        />
        <CustomInput
          placeholder="reconfirm password"
          value={password}
          setValue={setPassword}
        />
        {/* <View style={styles.container}>
            <TextInput placeholder="reconfirm password"/>
        </View> */}
        {/* <CustomInput
          placeholder="name"
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholder="gender"
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholder="job_name"
          value={email}
          setValue={setEmail}
        /> */}

        <CustomButton text="Send" onPress={onChangePw} />

        <CustomButton
          text="Back to Profile"
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

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  //const API_URL = 'http://13.208.146.112:8000/api';

  const onSendPressed = () => {
    fetch(`${API_URL}/auth/send_code/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, // Use the value of email from the state
        is_forgot_password: true,
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
        navigation.navigate('VerifyCode' as never,{email: email} as never); // Remove unnecessary type casting
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn' as never); // Remove unnecessary type casting
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />

        <CustomButton text="Send" onPress={onSendPressed} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPressed}
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
});

export default ForgotPasswordScreen;

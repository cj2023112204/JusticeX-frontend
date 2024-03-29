import { View, Text, StyleSheet, ScrollView,TextInput } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const navigation: any = useNavigation();

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
        navigation.navigate('VerifyCode' as never, { email: email } as never); // Remove unnecessary type casting
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
        <Text style={styles.title}>重設密碼</Text>

        {/* <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        /> */}

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <MaterialIcons
            name='email'
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType='email-address'
            autoCapitalize="none"
          />
        </View>

        <CustomButton text="送出" onPress={onSendPressed} />

        <CustomButton
          text="回到登入"
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

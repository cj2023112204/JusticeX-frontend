import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../../../assets/images/logo_black.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  //const API_URL = 'http://13.208.146.112:8000/api';

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access_token');
        if (accessToken) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const onSignInPressed = () => {
    //console.warn('Sign in');
    //validate user
    fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        //setUsername(data)
        //setPassword(data)
        if (data.success === true) {
          console.log(data.access_token)
          const saveData = async (key: string, value: any) => {
            try {
              await AsyncStorage.setItem(key, value);
              console.log('Data saved successfully');
              setLoggedIn(true);
              navigation.navigate('Home' as never);
            } catch (error) {
              console.error('Error saving data:', error);
            }
          };
          saveData('access_token', data.access_token);
        } else {
          console.log(data.message)
          console.log('Please re-enter your password.');
        }
        console.log(data)
        console.log(data.success)
        //navigation.navigate('Home' as never);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    //navigation.navigate('Home' as never);
  };

  const onForgotPasswordPressed = () => {
    // console.warn('onForgotPasswordPressed');
    navigation.navigate('ForgotPassword' as never);
  };

  const onSignUpPressed = () => {
    //console.warn("onSignUpPressed");
    navigation.navigate('SignUp' as never);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode='contain'
        />
        {/* <View> */}
        {/* <Icon name='apple' type='material-community' size={20} color='#C0C0C0' /> */}
        <CustomInput
          placeholder="example@mail.com"
          placeholderTextColor='#C0C0C0'
          value={username}
          setValue={setUsername}
        />
        {/* </View> */}

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomButton text="Sign In" onPress={onSignInPressed} />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Creat one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />

        {loggedIn && <Text>You are logged in.</Text>}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 100,
  },
  // container: {
  //     width: 400,
  //     backgroundColor: '#F0F0F0',
  //     borderRadius: 10,
  //     marginVertical: 5,
  // },

});

export default SignInScreen
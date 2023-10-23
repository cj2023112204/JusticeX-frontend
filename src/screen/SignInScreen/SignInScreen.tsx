import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../../../assets/images/logo_black.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config';
//import { TextInput } from 'react-native-gesture-handler';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const { height } = useWindowDimensions();
  const navigation: any = useNavigation();

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
              const stringValue = value.toString();
              await AsyncStorage.setItem(key, stringValue);
              console.log('Data saved successfully');
              setLoggedIn(true);
              checkis_status();
              //navigation.navigate('Home' as never);
            } catch (error) {
              console.error('Error saving data:', error);
            }
          };
          // const saveQuiz = async (key: string, value: any) => {
          //   try {
          //     await AsyncStorage.setItem(key, value.toString());
          //     console.log('Data saved successfully');
          //     //setLoggedIn(true);
          //     //navigation.navigate('Home' as never);
          //   } catch (error) {
          //     console.error('Error saving data:', error);
          //   }
          // };
          saveData('access_token', data.access_token);
          saveData('is_quiz', data.is_quiz);
        } else {
          console.log(data.message)
          console.log('Please re-enter your password.');
        }
        console.log(data)
        console.log(data.success)
        //navigation.navigate('Home' as never);
        const checkis_status = async () => {
          const access_token = await AsyncStorage.getItem('access_token')
          const is_quiz = await AsyncStorage.getItem('is_quiz')

          if (access_token?.length && is_quiz === 'true') {
            console.log(data.is_quiz)
            navigation.navigate('Home' as never);
          } else if (access_token?.length && is_quiz !== 'true') {
            console.log(data.is_quiz)
            navigation.navigate('Quiz' as never, { access_token: access_token } as never);
          } else {
            console.log(data.is_quiz)
            navigation.navigate('SignIn' as never);
          }
        }



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
      {/* <View style={styles.root}> */}
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode='contain'
          />
        </View>
        {/* <View> */}
        {/* <Icon name='apple' type='material-community' size={20} color='#C0C0C0' /> */}
        {/* <CustomInput
          placeholder="example@mail.com"
          placeholderTextColor='#C0C0C0'
          value={username}
          setValue={setUsername}
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
            value={username}
            onChangeText={setUsername}
            placeholder="example@mail.com"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType='email-address'
            autoCapitalize="none"
          />
        </View>
        {/* </View> */}

        {/* <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Ionicons
            name='ios-lock-closed-outline'
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            autoCapitalize="none"
          />

        </View>

        <CustomButton text="登入" onPress={onSignInPressed} />

        <CustomButton
          text="忘記密碼 ？"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="還沒有帳號嗎？創建一個吧！"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />

        {/* {loggedIn && <Text>You are logged in.</Text>} */}

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
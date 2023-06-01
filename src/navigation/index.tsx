import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignInScreen from '../screen/SignInScreen';
import SignUpScreen from '../screen/SignUpScreen';
import ConfirmEmailScreen from '../screen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screen/ResetPasswordScreen';
import PersonalInfoScreen from '../screen/PersonalInfoScreen';
import VerifyCodeScreen from '../screen/VerifyCodeScreen'
import QuizScreen from '../screen/QuizScreen'
import ProfileScreen from "../screen/ProfileScreen";
import HomeScreen from '../screen/HomeScreen';
import Article from '../screen/Article';
import Comment from '../screen/Comment';
import React, { useLayoutEffect } from 'react';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '首頁',
    });
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="首頁" component={HomeStack} />
      <Drawer.Screen name="個人資料" component={ProfileScreen} />
    </Drawer.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name='Quiz' component={QuizScreen} />
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='Home' component={DrawerNavigation} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='ConfirmEmail' component={ConfirmEmailScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
        <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} />
        <Stack.Screen name='VerifyCode' component={VerifyCodeScreen} />
        <Stack.Screen name="Comment" component={Comment} options={{ title: '判例詳情' , headerShown: true}} />
        <Stack.Screen name="Article" component={Article} options={{ title: '文章詳情' , headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

export default Navigation;
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
// import Home from '../screens/HomeScreen';
import ProfileScreen from "../screen/ProfileScreen";
import ChangeAvatarScreen from "../screen/ChangeAvatarScreen";
import ChangePprofileScreen from "../screen/ChangePprofileScreen";
import FavoriteScreen from "../screen/FavoriteScreen";
import HomeScreen from '../screen/HomeScreen';
import Article from '../screen/Article';
import Comment from '../screen/Comment';
import React from 'react';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="首頁" component={Navigation} />
      <Drawer.Screen name="個人資料" component={ProfileScreen} />
    </Drawer.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name='Quiz' component={QuizScreen} /> */}
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='ConfirmEmail' component={ConfirmEmailScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
        <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} />
        <Stack.Screen name='VerifyCode' component={VerifyCodeScreen} />
        <Stack.Screen name='ChangeAvatar' component={ChangeAvatarScreen} />
        <Stack.Screen name='ChangePprofile' component={ChangePprofileScreen} />
        <Stack.Screen name='Favorite' component={FavoriteScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Article" component={Article} options={{ title: '文章詳情' }} />
        <Stack.Screen name="Comment" component={Comment} options={{ title: '判例詳情' }} />
        {/* <Stack.Screen name='Home' component={Home} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
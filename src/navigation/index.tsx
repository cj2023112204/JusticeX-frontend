import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import SignInScreen from '../screen/SignInScreen';
import SignUpScreen from '../screen/SignUpScreen';
import ConfirmEmailScreen from '../screen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screen/ResetPasswordScreen';
import PersonalInfoScreen from '../screen/PersonalInfoScreen';
import VerifyCodeScreen from '../screen/VerifyCodeScreen'
import QuizScreen from '../screen/QuizScreen'
import ProfileScreen from "../screen/ProfileScreen";
// import BottomSheetScrollScreen from '../screen/BottomSheetScrollScreen';
import ChangePasswordScreen from '../screen/ChangePasswordScreen';
//import ChangeAvatarScreen from "../screen/ChangeAvatarScreen";
import ChangeProfileScreen from "../screen/ChangeProfileScreen";
import FavoriteScreen from "../screen/FavoriteScreen";
import HomeScreen from '../screen/HomeScreen';
import Article from '../screen/Article';
import Comment from '../screen/Comment';
import IntroductionPage from '../screen/Introuduce';
import React, { useLayoutEffect } from 'react';
import SignOut from '../SignOut';
import HomeTest from '../screen/HomeScreen/Home';
import chart from '../screen/Testchart';
import Trend from '../screen/TrendScreen';
import Verdict from '../screen/VerdictScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return(
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 14 },
      tabBarActiveTintColor:'black',
      // tabBarItemStyle: { width: 100 },
      // tabBarStyle: { backgroundColor: 'powderblue' },
    }}>
      <Tab.Screen name='熱門判例' component={HomeTest}/>
      <Tab.Screen name='最新判例' component={HomeScreen}/>
    </Tab.Navigator>
  )
}

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
      <Drawer.Screen name="收藏" component={FavoriteScreen} />
      <Drawer.Screen name="國民法官介紹" component={IntroductionPage}/>
      <Drawer.Screen name="判例趨勢" component={Trend}/>
      <Drawer.Screen name="登出" component={SignOut} />
      <Drawer.Screen name='測試主頁' component={HomeTabs}/>
      <Drawer.Screen name='測試圖表' component={chart}/>
      <Drawer.Screen name="測試判例" component={Verdict}/>
    </Drawer.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* <Stack.Screen name='Quiz' component={QuizScreen} /> */}
        {/* <Stack.Screen name='BottomSheetScroll' component={BottomSheetScrollScreen} /> */}
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='Home' component={DrawerNavigation} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='ConfirmEmail' component={ConfirmEmailScreen} />
        <Stack.Screen name ='test' component={HomeTabs}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
        <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} />
        <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />
        <Stack.Screen name='ChangeProfile' component={ChangeProfileScreen} />
        {/* <Stack.Screen name='ChangeAvatar' component={ChangeAvatarScreen} /> */}
        <Stack.Screen name='Favorite' component={FavoriteScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='VerifyCode' component={VerifyCodeScreen} />
        <Stack.Screen name='Quiz' component={QuizScreen}/>
        <Stack.Screen name="Comment" component={Comment} options={{ title: '判例詳情' , headerShown: true}} />
        <Stack.Screen name="Article" component={Article} options={{ title: '文章詳情' , headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
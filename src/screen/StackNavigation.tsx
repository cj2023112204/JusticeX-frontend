import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import Article from './Article';
import Comment from './Comment';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={Article} options={{ title: '文章詳情' }} />
      <Stack.Screen name="Comment" component={Comment} options={{ title: '判例詳情' }} />
    </Stack.Navigator>
  );
};

export default Navigation;

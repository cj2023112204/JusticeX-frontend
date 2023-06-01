import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from "./HomeScreen";
import Navigation from './StackNavigation';
import ProfileScreen from "./ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="首頁" component={Navigation} />
            <Drawer.Screen name="個人資料" component={ProfileScreen} />
        </Drawer.Navigator>
    )
}
export default DrawerNavigation;
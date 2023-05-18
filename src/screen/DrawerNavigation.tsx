import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="首頁" component={HomeScreen} />
                <Drawer.Screen name="個人資料" component={ProfileScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
export default DrawerNavigation;
import React from "react";
import { View } from "react-native";
import DrawerNavigation from "./src/screen/DrawerNavigation";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/screen/StackNavigation";

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};
export default App;
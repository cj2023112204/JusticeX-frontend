import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";

const HomeScreen = () => {
    return(
        <View style={style.center}>
            <SearchBar
              placeholder="Search here"
              onChangeText={(text) => console.log(text)}
            />
            <Text>Home</Text>
        </View>
    );
};

export default HomeScreen

const style = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
      },
})
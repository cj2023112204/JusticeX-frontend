import { View, Text, } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignOut = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const logout = async () => {
            try {
                await AsyncStorage.removeItem('access_token');
                await AsyncStorage.removeItem('is_quiz');
                navigation.navigate('SignIn' as never);
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        logout();
    }, []);


    return (

        <View>
            <Text>Signing out...</Text>
        </View>
    )
}

export default SignOut
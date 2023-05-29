import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';

const ResetPasswordScreen = ({ route }: any) => {

    //const [code, setCode] = useState('');
    const { email }: any = route.params;
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    //const API_URL = 'http://13.208.146.112:8000/api';

    const onSubmitPressed = () => {
        // console.warn('onSubmitPressed');

        fetch(`${API_URL}/account/change_password/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: route.params.email,
              password: password,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle response data
              //setUsername(data)
              //setPassword(data)
              if(data.success===true){
                console.log(data.message)
              }else{
                console.log('error')
              }
              console.log(data)
              navigation.navigate('SignIn' as never);
            })
            .catch((error) => {
              // Handle error
              console.error(error);
            });

        //navigation.navigate('SignIn' as never);
    };

    const onSignInPressed = () => {
        // console.warn("onSignInPressed");
        navigation.navigate('SignIn' as never);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>

                {/* <CustomInput
                    placeholder="Code"
                    value={code}
                    setValue={setCode}
                /> */}

                <CustomInput
                    placeholder="Email"
                    value={email}
                    editable={false}
                />

                <CustomInput
                    placeholder="Enter your new password"
                    value={password}
                    setValue={setPassword}
                />


                <CustomButton text="Submit" onPress={onSubmitPressed} />

                <CustomButton
                    text="Back to Sign in"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
});

export default ResetPasswordScreen;
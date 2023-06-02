import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../../config';



const ConfirmEmailScreen = ({ route }: any) => {

    //const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    
    // const route = useRoute();
    console.log(route);
    const { email,password }: any = route.params;
    console.log(email);
    console.log(password);

    const navigation = useNavigation();

    // const API_URL = 'http://13.208.146.112:8000/api';

    const onConfirmPressed = () => {
        // console.warn('onConfirmPressed');

        fetch(`${API_URL}/auth/verify_code/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              code: code,
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
              navigation.navigate('PersonalInfo' as never, { email, password }as never)
            })
            .catch((error) => {
              // Handle error
              console.error(error);
            });

        // navigation.navigate('Home' as never)
    };

    const onSignInPressed = () => {
        // console.warn("onSignInPressed");
        navigation.navigate('SignIn' as never);
    };

    const onResendPressed = () => {
        fetch(`${API_URL}/auth/send_code/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              is_forgot_password: false,
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
              //navigation.navigate('ConfirmEmail' as never, { email: email, password: password }as never);

            })
            .catch((error) => {
              // Handle error
              console.error(error);
            });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>確認你的信箱</Text>

                <CustomInput
                    placeholder="Email"
                    value={email}
                    editable={false}
                />

                <CustomInput
                    placeholder="Enter your confirmation code"
                    value={code}
                    setValue={setCode}
                />
                

                <CustomButton text="送出" onPress={onConfirmPressed} />

                <CustomButton
                    text="重新發送驗證碼"
                    onPress={onResendPressed}
                    type="SECONDARY"
                />

                <CustomButton
                    text="回到登入"
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

export default ConfirmEmailScreen;
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, RouteProp } from '@react-navigation/native';
//import { StackNavigationProp } from '@react-navigation/stack';
import { API_URL } from '../../../config';

// type RootStackParamList = {
//     ConfirmEmail: { email: string, password: string };
//     // Define other screens here if needed
//   };

// type SignUpScreenNavigationProp = RouteProp<RootStackParamList, 'ConfirmEmail'>;

const SignUpScreen = () => {
    //const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [passwordRepeat, setPasswordRepeat] = useState('');



    const navigation: any = useNavigation();

    // const API_URL = 'http://13.208.146.112:8000/api';

    const onRegisterPressed = () => {
        // console.warn('onRegisterPressed');

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
                if (data.success === true) {
                    console.log(data.message)
                } else {
                    console.log('error')
                }
                console.log(data)
                //   navigation.navigate('ConfirmEmail' as never, { email: email, password: password }as never);
                navigation.navigate('ConfirmEmail' as never, { email: email, password: password } as never);



            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

        //navigation.navigate('ConfirmEmail' as never);
    };

    const onSignInPressed = () => {
        // console.warn("onSignUpPressed");
        navigation.navigate('SignIn' as never);
    };

    const onTermsOfUsePressed = () => {
        console.warn("onTermsOfUsePressed");
    };

    const onPrivacyPressed = () => {
        console.warn("onPrivacyPressed");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>創建帳號</Text>

                {/* <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                /> */}
                {/* <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                /> */}

                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: "#ccc",
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>
                    <MaterialIcons
                        name='email'
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="email"
                        style={{ flex: 1, paddingVertical: 0 }}
                        keyboardType='email-address'
                        autoCapitalize="none"
                    />
                </View>

                {/* <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                /> */}

                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: "#ccc",
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>
                    <Ionicons
                        name='ios-lock-closed-outline'
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        style={{ flex: 1, paddingVertical: 0 }}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />

                </View>
                {/* <CustomInput
                    placeholder="Repeat Password"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry={true}
                /> */}

                <CustomButton text="註冊" onPress={onRegisterPressed} />

                {/* <Text style={styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy.</Text>

                </Text> */}

                {/* <SocialSignInButtons /> */}

                <CustomButton
                    text="擁有帳號 ？登入"
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
        gap: 15
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

export default SignUpScreen
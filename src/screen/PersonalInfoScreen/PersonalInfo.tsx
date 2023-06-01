import { View, Text, StyleSheet, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import GenderSelector from '../../components/GenderSelector';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../../config';


const PersonalInfo = ({ route }: any) => {
    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [job_id, setJob_id] = useState('');
    const [picture_id, setPicture_id] = useState('');

    //const route = useRoute();
    //const { password  } = route.params;
    console.log(route);
    
    console.log(route.params.email);
    console.log(route.params.password);
    
    const navigation = useNavigation();

    // const API_URL = 'http://13.208.146.112:8000/api';

    const handleSelectGender = (gender: any) => {
        // 在這裡處理選擇的性別，可以將它存儲到狀態或數據庫中，或執行其他操作
        console.log('Selected Gender:', gender);
      };

    const onRegisterPressed = () => {
        // console.warn('onRegisterPressed');

        fetch(`${API_URL}/auth/register/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: route.params.email,
              name: username,
              password: route.params.password,
              gender: gender,
              birth: birth,
              job_id: job_id,
              picture_id: picture_id,
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

        // navigation.navigate('ConfirmEmail' as never);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Personal Information</Text>

                <CustomInput
                    placeholder="Name"
                    value={username}
                    setValue={setUsername}
                />
                {/* <GenderSelector onSelectGender={handleSelectGender} /> */}
                <CustomInput
                    placeholder="Gender"
                    value={gender}
                    setValue={setGender}
                />
                <CustomInput
                    placeholder="Birth"
                    value={birth}
                    setValue={setBirth}
                />
                <CustomInput
                    placeholder="JobId"
                    value={job_id}
                    setValue={setJob_id}
                />
                <CustomInput
                    placeholder="Picture"
                    value={picture_id}
                    setValue={setPicture_id}
                />

                <CustomButton text="Register" onPress={onRegisterPressed} />

                {/* <Text style={styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy.</Text>

                </Text> */}



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
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default PersonalInfo
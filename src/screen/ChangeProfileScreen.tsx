import { View, Text,TextInput, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
const ChangePprofileScreen = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  //const API_URL = 'http://13.208.146.112:8000/api';

  
  const onPressed = () => {
    navigation.navigate('Profile' as never);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your porfile</Text>

        <View style={styles.container}>
            <TextInput placeholder="name"/>
        </View>
        <View style={styles.container}>
            <TextInput placeholder="gender"/>
        </View>
        <View style={styles.container}>
            <TextInput placeholder="job_name"/>
        </View>
        {/* <CustomInput
          placeholder="name"
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholder="gender"
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholder="job_name"
          value={email}
          setValue={setEmail}
        /> */}

        <CustomButton text="Send" onPress={onPressed} />

        <CustomButton
          text="Back to PersonalInfo"
          onPress={onPressed}
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
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
},
});

export default ChangePprofileScreen;

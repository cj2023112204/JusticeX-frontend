import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PorfileScreen = () => {
  const avatarSource = require('../../assets/images/1.jpg'); // 替换为实际的头像图片路径
  const name = 'John Doe'; // 替换为实际的姓名数据

  const navigation = useNavigation();
  const onPressed = () => {
    navigation.navigate('Favorite' as never); // Remove unnecessary type casting
  };
  const changeavatar = () => {
    navigation.navigate('ChangeAvatar' as never); // Remove unnecessary type casting
  };
  const changepprofile = () => {
    navigation.navigate('ChangePprofile' as never); // Remove unnecessary type casting
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={changeavatar}>
          <Image source={avatarSource} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.name} onPress={changepprofile}>
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={changepprofile}>
          <Text style={styles.TextTitle}>gender</Text>
          <Text style={styles.Text}>F</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={changepprofile}>
          <Text style={styles.TextTitle}>job_name</Text>
          <Text style={styles.Text}>Teacher</Text>
        </TouchableOpacity>

        <View style={styles.separator}></View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.favoriteButton} onPress={onPressed}>
          <Text style={styles.TextTitle}>favorite</Text>
        </TouchableOpacity>
      </View>

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',

  },
  Text: {
    color: 'grey',
    fontSize: 16,
    marginTop: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  name: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    height: 3,
    width: 350,
    backgroundColor: 'black',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 350,
    paddingVertical: 10,
  },
  favoriteButton: {
    width: 350,
    paddingVertical: 10,
  },
  TextTitle: {
    color: 'black',
    fontSize: 16,
  },
});
export default PorfileScreen;
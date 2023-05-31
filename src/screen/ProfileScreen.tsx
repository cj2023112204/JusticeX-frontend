import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from "./HomeScreen";
import ChangeAvatar from "./ChangeAvatarScreen";
import { useNavigation } from '@react-navigation/native';

const PorfileScreen = () => {
  const avatarSource = require('../../assets/images/photo.jpg'); // 替换为实际的头像图片路径
  const name = 'John Doe'; // 替换为实际的姓名数据


  const handleListItemPress = (listItemName: string) => {
    // 处理列表项点击事件
    console.log(`点击了列表项: ${listItemName}`);

  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={ChangeAvatar}>
          <Image source={avatarSource} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.name} onPress={HomeScreen}>
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={HomeScreen}>
          <Text style={styles.TextTitle}>性別</Text>
          <Text style={styles.Text}>女</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton} onPress={HomeScreen}>
          <Text style={styles.TextTitle}>職業</Text>
          <Text style={styles.Text}>教師</Text>
        </TouchableOpacity>

        <View style={styles.separator}></View>
      </View>

      <View style={styles.buttonContainer}></View>
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={HomeScreen}>
        <Text style={styles.TextTitle}>忘記密碼</Text>
      </TouchableOpacity>


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
  forgotPasswordButton: {
    width: 350,
    paddingVertical: 10,

  },
  TextTitle: {
    color: 'black',
    fontSize: 16,
  },
});
export default PorfileScreen;
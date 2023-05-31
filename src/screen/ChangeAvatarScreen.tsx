import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import HomeScreen from "./HomeScreen";
import ChangeAvatar from "./ChangeAvatarScreen";
import { useNavigation } from '@react-navigation/native';

const ChangeAvatarScreen = () => {
  const avatar1 = require('../../assets/images/photo1.jpg'); // 替换为实际的头像图片路径
  const avatar2 = require('../../assets/images/photo2.jpg');
  const avatar3 = require('../../assets/images/photo3.jpg');
  const avatar4 = require('../../assets/images/photo4.jpg');
  const avatar5 = require('../../assets/images/photo5.jpg');
  const avatar6 = require('../../assets/images/photo6.jpg');
  const avatar7 = require('../../assets/images/photo7.jpg');
  const avatar8 = require('../../assets/images/photo8.jpg');
  const avatar9 = require('../../assets/images/photo9.jpg');
  const avatar10 = require('../../assets/images/photo10.jpg');
  // const avatar11 = require('../../assets/images/photo11.jpg');
  const avatar12 = require('../../assets/images/photo12.jpg');
  const avatar13 = require('../../assets/images/photo13.jpg');
  const avatar14 = require('../../assets/images/photo14.jpg');
  const avatar15 = require('../../assets/images/photo15.jpg');
  const avatar16 = require('../../assets/images/photo16.jpg');
  const avatar17 = require('../../assets/images/photo17.jpg');


  
  const handleListItemPress = (listItemName: string) => {
    // 处理列表项点击事件
    console.log(`点击了列表项: ${listItemName}`);

  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar1} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar2} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar3} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar4} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar5} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar6} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar7} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar8} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar9} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar10} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar11} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar12} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar13} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar14} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar15} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar16} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ChangeAvatar}>
            <Image source={avatar17} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={HomeScreen}>
            <Text style={styles.TextTitle}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={HomeScreen}>
            <Text style={styles.TextTitle}>確認</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 25,
    margin: 10,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',

  },
  forgotPasswordText: {
    color: 'black',
    fontSize: 16,
  },
  TextTitle: {
    color: 'black',
    fontSize: 16,
  },
});
export default ChangeAvatarScreen;
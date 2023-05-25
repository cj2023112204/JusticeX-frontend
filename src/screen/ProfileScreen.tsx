import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from "./HomeScreen";

const PorfileScreen = () => {
  const avatarSource = require('../assets/images/chihiro007.jpg'); // 替换为实际的头像图片路径
  const name = 'John Doe'; // 替换为实际的姓名数据

  const handleLogout = () => {
    // 执行登出操作
    // 清除用户凭据、导航到登录页面等
    console.log('点击了登出按钮');
  };

  const handleListItemPress = (listItemName: string) => {
    // 处理列表项点击事件
    console.log(`点击了列表项: ${listItemName}`);
  };

  return (
    <View style={styles.container}>
      <Image source={avatarSource} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>

      <View style={styles.separator}></View>

      <TouchableOpacity style={styles.button} onPress={HomeScreen}>
      <Image source={avatarSource} style={styles.avatarButton} />
        <Text style={styles.buttonText}>profile</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={HomeScreen}>
        <MaterIcon name="onepassword" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>paassword</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={HomeScreen}>
        <FontIcon name="bookmark" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>bookmark</Text>
      </TouchableOpacity> */}

      <View style={styles.separator}></View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>登出</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarButton: {
    width: 30,
    height: 30,
    borderRadius: 0,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonIcon: {
    marginRight: 5,
    fontSize: 20,
    color: 'white',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  arrowIcon: {
    fontSize: 20,
    marginLeft: 5,
  },
  icon: {
    marginLeft: 5,
  },
  iconContainer: {
    marginLeft: 5,
  },
  logoutButton: {
    padding: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    color: 'black',
  },
  separator: {
    height: 3,
    width: 300,
    backgroundColor: 'black',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});
export default PorfileScreen;
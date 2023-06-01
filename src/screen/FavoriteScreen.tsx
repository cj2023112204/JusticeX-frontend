import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const FavoriteScreen = () => {
  const favoriteSource = require('../../assets/images/F1.jpg'); // 替换为实际的头像图片路径
  const navigation = useNavigation();
  const onPressed = () => {
    navigation.navigate('Home' as never); // Remove unnecessary type casting
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressed}>
          <Image source={favoriteSource} style={styles.container} />
        </TouchableOpacity>
      </View>

     <View style={styles.buttonContainer}>
        <CustomButton
          text="Back to Home"
          onPress={onPressed}
          type="TERTIARY"
        />
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
    backgroundColor:"white"
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
  buttonContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
});
export default FavoriteScreen;
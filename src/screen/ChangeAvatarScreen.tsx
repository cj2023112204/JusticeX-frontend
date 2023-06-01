import * as React from 'react';
import { useState } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import HomeScreen from "./HomeScreen";
import ChangeAvatar from "./ChangeAvatarScreen";
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

interface Photo {
  id: string;
  source: number;
}
interface ChangeAvatarProps {
  avatar: any;
  onAvatarChange: (newAvatar: any) => void;
}

const ChangeAvatarScreen: React.FC = () => {
  const ChangeAvatar: Photo[] = [
    { id: 'photo1', source: require('../../assets/images/1.jpg') },
    { id: 'photo2', source: require('../../assets/images/2.jpg') },
    { id: 'photo3', source: require('../../assets/images/3.jpg') },
    { id: 'photo4', source: require('../../assets/images/4.jpg') },
    { id: 'photo5', source: require('../../assets/images/5.jpg') },
    { id: 'photo6', source: require('../../assets/images/6.jpg') },
    { id: 'photo7', source: require('../../assets/images/7.jpg') },
    { id: 'photo8', source: require('../../assets/images/8.jpg') },
    { id: 'photo9', source: require('../../assets/images/9.jpg') },
    { id: 'photo10', source: require('../../assets/images/10.jpg') },
    { id: 'photo11', source: require('../../assets/images/11.jpg') },
    { id: 'photo12', source: require('../../assets/images/12.jpg') },
    { id: 'photo13', source: require('../../assets/images/13.jpg') },
    { id: 'photo14', source: require('../../assets/images/14.jpg') },
    { id: 'photo15', source: require('../../assets/images/15.jpg') },
    { id: 'photo16', source: require('../../assets/images/16.jpg') },
    { id: 'photo17', source: require('../../assets/images/17.jpg') },
    // 添加其他照片的信息
  ];

  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const handlePress = (photoId: string) => {
    setSelectedPhotoId(photoId);
  };

  const isPhotoSelected = (photoId: string) => {
    return selectedPhotoId === photoId;
  };

  const navigation = useNavigation();

  const onPressed = () => {
    navigation.navigate('Profile' as never);
  };

  const windowWidth = Dimensions.get('window').width;
  const imageWidth = (windowWidth - 20) / 3; // 计算每个图片的宽度
  const placeholderItemCount = 3 - (ChangeAvatar.length % 3); // 计算占位元素数量

  return (
    <View style={styles.container}>
      <FlatList
    data={ChangeAvatar}
    numColumns={3} // 每行显示3个图像
    keyExtractor={(item) => item.id}
    renderItem={({ item: photo }) => (
      <TouchableOpacity
        onPress={() => handlePress(photo.id)}
        activeOpacity={0.8}
        style={styles.photoContainer}
      >
        <Image
          source={photo.source}
          style={[
            styles.avatar,
            isPhotoSelected(photo.id) && styles.avatarPressed,
            { borderRadius: imageWidth / 2 },
          ]}
        />
      </TouchableOpacity>
    )}
    ListFooterComponent={() => (
      <View style={styles.photoContainer} />
    )}
  />

      <View style={styles.buttonContainer}>
        <CustomButton text="confirm" onPress={onPressed} />

        <CustomButton
          text="Back to PersonalInfo"
          onPress={onPressed}
          type="TERTIARY"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  photoContainer: {
    width: '33.33%',

  },
  avatar: {
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  avatarPressed: {
    borderWidth: 2,
    borderColor: 'blue', // 点击后边框颜色为蓝色
    width: 100,
    height: 100,
    margin: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
  },
  name: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  Text: {
    color: 'grey',
    fontSize: 16,
    marginTop: 15,
  },
});
export default ChangeAvatarScreen;
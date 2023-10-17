import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../config';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { View, Dimensions, TextInput, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const ChangeAvatar = [
  { id: '1', source: require('../../assets/images/1.jpg') },
  { id: '2', source: require('../../assets/images/2.jpg') },
  { id: '3', source: require('../../assets/images/11.jpg') },
  { id: '4', source: require('../../assets/images/12.jpg') },
  { id: '5', source: require('../../assets/images/13.jpg') },
  { id: '6', source: require('../../assets/images/14.jpg') },
  { id: '7', source: require('../../assets/images/15.jpg') },
  { id: '8', source: require('../../assets/images/16.jpg') },
  { id: '9', source: require('../../assets/images/17.jpg') },
  { id: '10', source: require('../../assets/images/3.jpg') },
  { id: '11', source: require('../../assets/images/4.jpg') },
  { id: '12', source: require('../../assets/images/5.jpg') },
  { id: '13', source: require('../../assets/images/6.jpg') },
  { id: '14', source: require('../../assets/images/7.jpg') },
  { id: '15', source: require('../../assets/images/8.jpg') },
  { id: '16', source: require('../../assets/images/9.jpg') },
  { id: '17', source: require('../../assets/images/10.jpg') },
  { id: '18', source: require('../../assets/images/18.jpg') },


  // 添加其他照片的信息
];
const data = [
  { label: '行政管理（管理幕僚、行政後勤/總務', value: '1' },
  { label: '金融與保險（金融保險、財務會計）', value: '2' },
  { label: '商務與市場推廣（國際貿易、業務推廣、門市銷售）', value: '3' },
  { label: '客戶服務與支援（客服開發、售後服務）', value: '4' },
  { label: '專案管理與諮詢（專案管理、顧問諮詢）', value: '5' },
  { label: '技術與工程（電腦系統/資訊/軟硬體、光電半導體、機械工程）', value: '6' },
  { label: '生產與製造（生產製程、模具相關、工具機加工）', value: '7' },
  { label: '物流與供應鏈（運輸物流、採購資材）', value: '8' },
  { label: '品質與安全（品管品保、營建/製圖/施作）', value: '9' },
  { label: '醫療與健康（醫療/護理/保健）', value: '10' },
  { label: '軍警消防', value: '11' },
  { label: '教師', value: '12' },
  { label: '法律相關（律師/法官/法律顧問)', value: '13' },
];

const VerdictScreen = () => {
  const navigation = useNavigation();
  const [verdictData, setVerdictData] = useState<any>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const windowWidth = Dimensions.get('window').width;
  const imageWidth = (windowWidth - 20) / 3;
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);


  const handleAvatarSelection = (id: string) => {
    setSelectedAvatar(id);
    setpicture_id(id); // Update the picture_id state with the selected avatar ID
    setShowAvatarOptions(false); // Hide the avatar options list
  };

  // const toggleAvatarOptions = () => {
  //   setShowAvatarOptions(!showAvatarOptions);
  // };



  // const { email }: any = route.params;
  const [name, setname] = useState<string | null>(null);
  const [gender, setgender] = useState<string | null>(null);
  const [job_name, setJob_name] = useState<string | null>(null);
  const [job_id, setjob_id] = useState<number>(11);
  const [picture_id, setpicture_id] = useState<string | null>(null);
  const [value, setValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  const onPressed = async () => {
    // console.warn('onSubmitPressed');
    const accessToken = await AsyncStorage.getItem('access_token');
    fetch(`${API_URL}/account/edit_account/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: name,
        gender: gender,
        job_id: job_id,
        picture_id: picture_id,
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
        fetchVerdictData(); // 重新获取数据
        navigation.goBack(); // 返回上一页
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    //navigation.navigate('SignIn' as never);
  };
  // const changeavatar = () => {
  //   navigation.navigate('ChangeAvatar' as never); // Remove unnecessary type casting
  // };
  const backProfile = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchVerdictData();
  }, []);

  const fetchVerdictData = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    fetch(`${API_URL}/account/get_account/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setVerdictData(responseData.data);
        decodeImage(responseData.data.picture);
        setname(responseData.data.name); // 设置初始值
        setgender(responseData.data.gender); // 设置初始值
        setJob_name(responseData.data.job_name); // 设置初始值
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const decodeImage = (base64Data: string) => {
    const imageData = `data:image/jpeg;base64,${base64Data}`;
    setImageData(imageData);
  };

  if (!verdictData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>更改個人資料</Text>
<!-- <<<<<<< HEAD
        <TouchableOpacity >
          {imageData && <Image source={{ uri: imageData }} style={[
            styles.avatar, { borderRadius: imageWidth / 2 },
          ]} />}
        </TouchableOpacity>
======= -->
        {/* 頭像顯示 */}
        <View style={styles.selectedAvatarContainer}>
          {selectedAvatar ? (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowAvatarOptions(!showAvatarOptions)}
            >
              <Image
                source={ChangeAvatar.find((avatar) => avatar.id === selectedAvatar)?.source}
                style={styles.selectedAvatar}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowAvatarOptions(!showAvatarOptions)}
            >
              {imageData && <Image source={{ uri: imageData }} style={[
                styles.avatar, { borderRadius: imageWidth / 2 },
              ]} />}
            </TouchableOpacity>
          )}
        </View>
        {/* 頭像選項列表 */}
        {showAvatarOptions && (
          <View style={styles.avatarOptionsContainer}>
            {ChangeAvatar.map((avatar) => (
              <TouchableOpacity
                key={avatar.id}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar.id && styles.selectedAvatarOption,
                ]}
                onPress={() => handleAvatarSelection(avatar.id)}
              >
                <Image source={avatar.source} style={styles.avatarOptionImage} />
              </TouchableOpacity>
            ))}
          </View>
        )}
<!-- >>>>>>> 7e21d68c33fa770116f2006c839c5c6033fb6e69 -->

        <CustomInput
          placeholder={verdictData.name}
          value={name}
          setValue={setname}
        />
        <CustomInput
          placeholder={verdictData.gender}
          value={gender}
          setValue={setgender}
        />
        <Dropdown
          style={[styles.dropdown]}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={verdictData.job_name} // 设置初始文字

          // value={job_id ? job_id.toString() : null} // 将 job_id 转换为字符串
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            const job_id = parseInt(item.value); // 将字符串转换为数字
            setjob_id(job_id);
            setIsFocus(false);
          }}

        />

        
        <CustomButton text="確定" onPress={onPressed} />

        <CustomButton
          text="返回"
          onPress={backProfile}
          type="TERTIARY"
        />
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,

  },
  avatarOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  avatarOption: {
    width: 80,
    height: 80,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 40,
    overflow: 'hidden',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {//下拉式選單
    height: 70,
    width: "100%", // 增加宽度以容纳更长的文本
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  selectedTextStyle: {//下拉式選單
    fontSize: 16,
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    lineHeight: 18, // 设置行高以适应两行文本
    paddingHorizontal: 8,
  },
  selectedText: {
    fontSize: 16,
    marginTop: 10,
  },
  selectedAvatarOption: {
    borderColor: 'blue',
  },
  avatarOptionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectedAvatarContainer: {
    marginTop: 40,
  },
  selectedAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  toggleButton: {
    borderRadius: 5,
  },
  toggleButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  Text: {
    color: 'grey',
    fontSize: 16,
    marginTop: 15,
  },
  avatar: {
    width: 100,
    height: 100,

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
    marginLeft: 15,
  },
  verdictTitle: {
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 10,
  },
});

export default VerdictScreen;
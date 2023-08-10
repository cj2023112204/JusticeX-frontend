import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../config';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { View, Dimensions, TextInput, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';


const VerdictScreen = () => {
  const navigation = useNavigation();
  const [verdictData, setVerdictData] = useState<any>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const windowWidth = Dimensions.get('window').width;
  const imageWidth = (windowWidth - 20) / 3;
  

  // const { email }: any = route.params;
  const [name, setname] = useState(null);
  const [gender, setgender] = useState(null);
  const [job_name, setJob_name] = useState(null);
  const [job_id, setjob_id] = useState(12);
  const [picture_id, setpicture_id] = useState(1);

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
        <TouchableOpacity >
          {imageData && <Image source={{ uri: imageData }} style={[
            styles.avatar, { borderRadius: imageWidth / 2 },
          ]} />}
        </TouchableOpacity>

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
        <CustomInput
          placeholder={verdictData.job_name}
          value={job_name}
          setValue={setJob_name}
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
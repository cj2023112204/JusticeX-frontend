import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import GenderSelector from '../../components/GenderSelector';
// import DatePicker from '../../components/DatePicker/DatePicker';
import Selector from '../../components/Selector/Selector';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../../config';
// import { TouchableOpacity } from 'react-native-gesture-handler';


const PersonalInfo = ({ route }: any) => {
    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [job_id, setJob_id] = useState('');
    const [picture_id, setPicture_id] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dobLabel, setDobLabel] = useState('您的生日');
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);


    const genderdata = [
        { label: '男', value: 'M' },
        { label: '女', value: 'F' },
    ];

    const jobdata = [
        { label: '行政管理(管理幕僚、行政後勤/總務)', value: '1' },
        { label: '金融與保險(金融保險、財務會計)', value: '2' },
        { label: '商務與市場推廣(國際貿易、業務推廣、門市銷售)', value: '3' },
        { label: '客戶服務與支援(客服開發、售後服務)', value: '4' },
        { label: '專案管理與諮詢(專案管理、顧問諮詢)', value: '5' },
        { label: '技術與工程(電腦系統/資訊/軟硬體、光電半導體、機械工程)', value: '6' },
        { label: '生產與製造(生產製程、模具相關、工具機加工)', value: '7' },
        { label: '物流與供應鏈(運輸物流、採購資材)', value: '8' },
        { label: '品質與安全(品管品保、營建/製圖/施作)', value: '9' },
        { label: '醫療與健康(醫療/護理/保健)', value: '10' },
        { label: '軍警消防', value: '11' },
        { label: '教師', value: '12' },
        { label: '法律相關(律師/法官/法律顧問)', value: '13' },
        { label: '其他', value: '14' },
    ];

    const [valueG, setValueG] = useState<string | null>(null);
    const [isFocusG, setIsFocusG] = useState(false);

    const [valueJ, setValueJ] = useState<string | null>(null);
    const [isFocusJ, setIsFocusJ] = useState(false);

    const renderLabel = () => {
        if (valueG || isFocusG) {
            return (
                <Text style={[styles.labelG, isFocusG && { color: 'black' }]}>
                    性別
                </Text>
            );
        }
        return null;
    };

    const renderLabelJob = () => {
        if (valueJ || isFocusJ) {
            return (
                <Text style={[styles.labelG, isFocusJ && { color: 'black' }]}>
                    職業類別
                </Text>
            );
        }
        return null;
    };

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
                gender: valueG,
                birth: selectedDate.toISOString().split('T')[0],
                job_id: valueJ,
                picture_id: '1',
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
                <Text style={styles.title}>個人資訊</Text>

                {/* <CustomInput
                    placeholder="Name"
                    value={username}
                    setValue={setUsername}
                /> */}
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>
                    <AntDesign
                        name='user'
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor='gray'
                        value={username}
                        onChangeText={setUsername}
                        style={{ flex: 1, paddingVertical: 0 }}
                    />
                </View>

                {/* <GenderSelector onSelectGender={handleSelectGender} /> */}
                {/* <CustomInput
                    placeholder="Gender"
                    value={gender}
                    setValue={setGender}
                /> */}

                <View style={styles.container}>
                    {renderLabel()}
                    <Dropdown
                        style={[styles.dropdown, isFocusG && { borderColor: 'black' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={genderdata}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusG ? '性別' : '...'}
                        searchPlaceholder="Search..."
                        value={valueG}
                        onFocus={() => setIsFocusG(true)}
                        onBlur={() => setIsFocusG(false)}
                        onChange={item => {
                            setValueG(item.value);
                            setIsFocusG(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocusG ? 'black' : 'black'}
                                name="woman"
                                size={20}
                            />
                        )}
                    />
                </View>

                {/* <DatePicker/> */}
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: 'gray',
                        width:"100%",
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 30
                    }}>
                    <Ionicons
                        name='calendar-outline'
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Text style={{ color: '#666', marginLeft: 5, marginTop: 5 }}>
                            {dobLabel}
                        </Text>
                    </TouchableOpacity>
                </View>

                <DatePicker
                    modal
                    open={open}
                    date={selectedDate}
                    mode={'date'}
                    locale={'en-US'}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setDobLabel(date.toISOString().split('T')[0])
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                {/* <CustomInput
                    placeholder="Birth"
                    value={birth}
                    setValue={setBirth}
                /> */}
                {/* <Selector/> */}
                {/* <CustomInput
                    placeholder="JobId"
                    value={job_id}
                    setValue={setJob_id}
                /> */}

                <View style={styles.container}>
                    {renderLabelJob()}
                    <Dropdown
                        style={[styles.dropdown, isFocusJ && { borderColor: 'black' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={jobdata}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusJ ? '職業類別' : '...'}
                        searchPlaceholder="Search..."
                        value={valueJ}
                        onFocus={() => setIsFocusJ(true)}
                        onBlur={() => setIsFocusJ(false)}
                        onChange={item => {
                            setValueJ(item.value);
                            setIsFocusJ(false);
                        }}
                        renderLeftIcon={() => (
                            <Entypo
                                style={styles.icon}
                                color={isFocusJ ? 'black' : 'black'}
                                name="suitcase"
                                size={20}
                            />
                        )}
                    />
                </View>
                {/* <CustomInput
                    placeholder="Picture"
                    value={picture_id}
                    setValue={setPicture_id}
                /> */}

                <CustomButton text="註冊" onPress={onRegisterPressed} />

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
        gap:10
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
    container: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        right: 10,
        width: "105%"
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    labelG: {
        position: 'absolute',
        backgroundColor: '#f2f2f2',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default PersonalInfo
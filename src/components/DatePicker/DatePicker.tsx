import { View, Text, TextInput, StyleSheet, Platform, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, Pressable, StatusBar, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';




const DatePicker = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const [formReady, setFormReady] = useState(false);

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }: any, selectedDate: any) => {
        if (type == 'set') {
            const currentDate = selectedDate
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDateOfBirth(formatDate(date));
            }
        } else {
            toggleDatepicker();
        }
    }

    const confirmIOSDate = () => {
        setDateOfBirth(formatDate(date));
        toggleDatepicker();
    }

    

    const formatDate = (rawDate: any) => {
        let date = new Date(rawDate);

        let year = date.getFullYear()
        let month = (date.getMonth() + 1).toString()
        let day = date.getDate().toString()

        

        return `${year}-${month}-${day}`
    }

    // const onSubmit = () => {
    //     Alert.alert(`${fullName} ${email} ${dateOfBirth}`)
    // }

    useEffect(() => {
        setFormReady(Boolean(fullName && email && dateOfBirth));

        return () => {
            setFormReady(false)
        }
    }, [fullName, email, dateOfBirth])

    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;


    return (
        <SafeAreaView style={[styles.container, { paddingTop: statusBarHeight }]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                >
                    {/* <Text style={styles.head}>
                        <MaterialCommunityIcons
                            name='flower-tulip-outline'
                            size={20}
                            color='#075985'
                        />{""}
                        Flowerio
                    </Text>

                    <Text style={styles.moto}>
                        Make Every Flower Count
                    </Text>

                    <View>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Albert Su'
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor='#11182744'
                        />
                    </View> */}

                    {/* <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='test@example.com'
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor='#11182744'
                        />
                    </View> */}

                    <View>
                        <Text style={styles.label}>Date Of Birth</Text>

                        {showPicker && (
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                                style={styles.datePicker}
                            />
                        )}

                        {showPicker && Platform.OS === 'ios' && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <TouchableOpacity style={[
                                    styles.button,
                                    styles.pickerButton,
                                    { backgroundColor: '#11182711' },
                                ]}
                                    onPress={toggleDatepicker}
                                >
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            { color: '#075985' }
                                        ]}
                                    >Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[
                                    styles.button,
                                    styles.pickerButton,
                                ]}
                                    onPress={confirmIOSDate}
                                >
                                    <Text
                                        style={[
                                            styles.buttonText,
                                        ]}
                                    >Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        )}




                        {!showPicker && (
                            <Pressable onPress={toggleDatepicker}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Thu June 1 2023'
                                    value={dateOfBirth}
                                    onChangeText={setDateOfBirth}
                                    placeholderTextColor='#11182744'
                                    editable={false}
                                    onPressIn={toggleDatepicker}
                                />
                            </Pressable>
                        )}
                    </View>

                    {/* <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: formReady ? '#075985' : '#11182711' },
                        ]}
                        disabled={!formReady}
                        onPress={onSubmit}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                { color: formReady ? '#fff' : '#11182766' },
                            ]}
                        >
                            Sumbit
                        </Text>
                    </TouchableOpacity> */}

                    
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#white',
        width: '100%',
        marginVertical: '5',
    },
    contentContainer: {
        padding: 10,
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight  + 50 : 50,

    },
    head: {
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        color: '#111827cc',
    },
    moto: {
        fontWeight: '400',
        fontSize: 15,
        marginBottom: 35,
        textAlign: 'center',
        color: '#111827cc',
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        marginBottom: 10,
        color: '#111827cc',
    },
    input: {
        backgroundColor: 'transparent',
        height: 50,
        fontSize: 14,
        fontWeight: '500',
        color: '#111827cc',
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: '#11182711',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#075985'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
})

export default DatePicker
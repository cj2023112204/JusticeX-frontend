import React, { useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated } from 'react-native'
import { COLORS, SIZES } from '../../constants';
import data from '../../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Quiz = ({ access_token }: any) => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState("");
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const navigation: any = useNavigation();

    const validateAnswer = (selectedOption: any) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption == correct_option) {
            // Set Score
            setScore(score + 1)
        }
        // Show Next Button
        setShowNextButton(true)
    }
    const handleNext = () => {
        if (currentQuestionIndex == allQuestions.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption("");
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const doneQuiz = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        //const previousValue = await AsyncStorage.getItem('is_quiz');
        const newValue = 'true';
      
        try {
          const response = await fetch(`${API_URL}/account/add_eazy_quiz/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              question_id: '1',
              score: score,
            }),
          });

          const data = await response.json();
      
          if (data.success === true) {
            console.log(data.message);
            await AsyncStorage.setItem('is_quiz', newValue);
            const is_quiz = await AsyncStorage.getItem('is_quiz');
            console.log(is_quiz)
          } else {
            console.log('error');
          }
      
          console.log(data);
          navigation.navigate('Home' as never);
        } catch (error) {
          console.error(error);
        }
      };

      const navigationToHome = async () => {
        navigation.navigate('Home' as never);
      }



    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{ color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2 }}>{currentQuestionIndex + 1}</Text>
                    <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionsDisabled}
                            key={option}
                            style={{
                                borderWidth: 3,
                                borderColor: option == correctOption
                                    ? COLORS.success
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.secondary + '40',
                                backgroundColor: option == correctOption
                                    ? COLORS.success + '20'
                                    : option == currentOptionSelected
                                        ? COLORS.error + '20'
                                        : COLORS.secondary + '20',
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10
                            }}
                        >
                            <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {
                                option == correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30 / 2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                    }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>下一題</Text>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                }, {
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <View style={{
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative'
            }}>

                {/* ProgressBar */}
                {renderProgressBar()}

                {/* Question */}
                {renderQuestion()}

                {/* Options */}
                {renderOptions()}

                {/* Next Button */}
                {renderNextButton()}

                {/* Score Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{score > (allQuestions.length / 2) ? '不錯噢!' : '待加強!'}</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ {allQuestions.length}</Text>
                            </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity
                                onPress={navigationToHome}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>完成</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>

                {/* Background Image */}
                <Image
                    source={require('../../../assets/images/DottedBG.png')}
                    style={{
                        width: SIZES.width,
                        height: 130,
                        zIndex: -1,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0.5
                    }}
                    resizeMode={'contain'}
                />

            </View>
        </SafeAreaView>
    )
}

export default Quiz
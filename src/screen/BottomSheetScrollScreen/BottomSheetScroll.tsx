import { StyleSheet, SafeAreaView, Text, View, Button } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import BottomSheet, { BottomSheetMethods } from '../../components/BottomSheet/BottomSheet';
import ButtonSheetScrollQuiz from '../BottomSheetScrollQuizScreen/BottomSheetScrollQuiz';
import BottomSheetScrollView2 from '../../components/BottomSheetScrollView';
import Lorem from '../../components/BottomSheetScrollView/Lorem';




const BottomSheetScroll = () => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const bottomSheetRef2 = useRef<BottomSheetMethods>(null);
    const route = useRoute();
    const verdictId = route.params?.verdictId;
    const pressHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const pressHandler2 = useCallback(() => {
        bottomSheetRef2.current?.expand();
    }, []);



    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <Button title='Blank' onPress={() => pressHandler()} />
                    <Button title='ScrollView' onPress={() => pressHandler2()} />

                    <BottomSheet
                        ref={bottomSheetRef}
                        snapTo={'50%'}
                        backgroundColor='white'
                        backDropColor='black'
                    >
                        <ButtonSheetScrollQuiz />
                    </BottomSheet>

                    <BottomSheetScrollView2
                        ref={bottomSheetRef2}
                        snapTo={'50%'}
                        backgroundColor='white'
                        backDropColor='black'
                        
                    >
                        <ButtonSheetScrollQuiz/>
                    </BottomSheetScrollView2>
                </SafeAreaView>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default BottomSheetScroll


import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Dimensions, StyleSheet, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { API_URL } from "../../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';



export default function Testchart  ({verdictId,crimeId}:any)  {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [chartData, setChartData] = useState<any>(null);
    useEffect(() => {
        fetchData();
    }, []);

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    const fetchData = async () => {
        // const verdictId = 10;
        // const crimeId = 1;
        console.log("1")
        const accessToken = await AsyncStorage.getItem('access_token');

        fetch(`${API_URL}/comment/feature/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "verdict_id": verdictId, "crime_id": crimeId }),
        })

            .then((response) => response.json())
            .then((responseData) => {
                setChartData([responseData.data]);
                bottomSheetRef.current.expand();
                console.log('Data:', chartData);
                if (chartData && chartData[0] && chartData[0].is_money_related) {
                    console.log('Data:', chartData[0].is_money_related);
                } else {
                    console.log('Data is not available or does not contain is_money_related property.');
                }
            })
            .catch((error) => {
                console.error('API 请求错误:', error);
            })
            .finally(() => {

            });
    }

    const piedata = {

        1: [
            {   title:'是否為金錢相關',
                name: '是',
                population: chartData && chartData[0] && chartData[0].is_money_related ? chartData[0].is_money_related : 0,
                color: '#f00',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
            {
                name: '否',
                population: 6 - (chartData && chartData[0] && chartData[0].is_money_related ? chartData[0].is_money_related : 0), // 没有 "is_money_related" 的人数
                color: '#ccc',
                legendFontColor: '#000',
                legendFontSize:  12,
            },
        ],
        2: [
            {   
                title:'是否有遺棄贓物',
                name: '有',
                population: chartData && chartData[0] && chartData[0].is_abandoned ? chartData[0].is_abandoned : 0,
                color: '#f00',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
            {
                name: '沒有',
                population: 2, // 没有 "is_money_related" 的人数
                color: '#ccc',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
        ],
        3: [
            {
                title:'犯罪地點為室內',
                name: '是',
                population: chartData && chartData[0] && chartData[0].is_indoor ? chartData[0].is_indoor : 0,
                color: '#f00',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
            {
                name: '否',
                population: 2, // 没有 "is_money_related" 的人数
                color: '#ccc',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
        ],
        4: [
            {   
                title:'竊盜方法具破壞性	',
                name: '是',
                population: chartData && chartData[0] && chartData[0].is_destructive ? chartData[0].is_destructive : 0,
                color: '#f00',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
            {
                name: '否',
                population: 2, // 没有 "is_money_related" 的人数
                color: '#ccc',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
        ],
        5: [
            {
                title: '兩人以上(含)犯案',
                name: '是',
                population: chartData && chartData[0] && chartData[0].is_group_crime ? chartData[0].is_group_crime : 0,
                color: '#f00',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
            {
                name: '否',
                population: 2, // 没有 "is_money_related" 的人数
                color: '#ccc',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
        ],
        6: [
            {
                title:'利用交通工具輸送贓物	',
                name: '是',
                population: chartData && chartData[0] && chartData[0].is_transportation_used ? chartData[0].is_transportation_used : 0,
                color: '#f00',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
            {
                name: '否',
                population: 2, // 没有 "is_money_related" 的人数
                color: '#ccc',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
        ],
        7: [
            {
                title:'是否有前科紀錄',
                name: '有',
                population: chartData && chartData[0] && chartData[0].has_criminal_record ? chartData[0].has_criminal_record : 0,
                color: '#f00',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
            {
                name: '沒有',
                population: 2, // 没有 "is_money_related" 的人数
                color: '#ccc',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
        ],
        8: [
            {
                title:'竊取之財物為被害人生財工具',
                name: '是',
                population: chartData && chartData[0] && chartData[0].is_income_tool ? chartData[0].is_income_tool : 0,
                color: '#f00',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
            {
                name: '否',
                population: 2, // 没有 "is_money_related" 的人数
                color: '#ccc',
                legendFontColor: '#000',
                legendFontSize: 12,
            },
        ],

    }

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title="獲取資料" onPress={fetchData} />
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={['10%', '50%']}
                containerStyle={styles.bottomSheet}
                enablePanDownToClose
                animateOnMount
            >
                <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
                    留言分布統計圖
                </Text>
                <BottomSheetScrollView>
                <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10,marginTop:10 }}>
                            {piedata['1'][0].title}
                    </Text>
                    <View
                        style={styles.chartcontainer}>
                        {chartData !== null ? (
                            <PieChart
                                data={piedata['1']} // 或者 data[1]
                                width={Dimensions.get("window").width}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            // center={[10, 50]}
                            // absolute
                            />
                        ) : (
                            <Text>Loading data...</Text>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10,marginTop:10 }}>
                            {piedata['2'][0].title}
                    </Text>
                    <View
                        style={styles.chartcontainer}>
                        {chartData !== null ? (
                            <PieChart
                                data={piedata['2']} // 或者 data[1]
                                width={Dimensions.get("window").width}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            // center={[10, 50]}
                            // absolute
                            />
                        ) : (
                            <Text>Loading data...</Text>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10,marginTop:10 }}>
                            {piedata['3'][0].title}
                    </Text>
                    <View
                        style={styles.chartcontainer}>
                        {chartData !== null ? (
                            <PieChart
                                data={piedata['3']} // 或者 data[1]
                                width={Dimensions.get("window").width}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            // center={[10, 50]}
                            // absolute
                            />
                        ) : (
                            <Text>Loading data...</Text>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10,marginTop:10 }}>
                            {piedata['4'][0].title}
                    </Text>
                    <View
                        style={styles.chartcontainer}>
                        {chartData !== null ? (
                            <PieChart
                                data={piedata['4']} // 或者 data[1]
                                width={Dimensions.get("window").width}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            // center={[10, 50]}
                            // absolute
                            />
                        ) : (
                            <Text>Loading data...</Text>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10 }}>
                            {piedata['5'][0].title}
                    </Text>
                    <View
                        style={styles.chartcontainer}>
                        {chartData !== null ? (
                            <PieChart
                                data={piedata['5']} // 或者 data[1]
                                width={Dimensions.get("window").width}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            // center={[10, 50]}
                            // absolute
                            />
                        ) : (
                            <Text>Loading data...</Text>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10,marginTop:10 }}>
                            {piedata['6'][0].title}
                    </Text>
                    <View
                        style={styles.chartcontainer}>
                        {chartData !== null ? (
                            <PieChart
                                data={piedata['6']} // 或者 data[1]
                                width={Dimensions.get("window").width}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            // center={[10, 50]}
                            // absolute
                            />
                        ) : (
                            <Text>Loading data...</Text>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10,marginTop:10 }}>
                            {piedata['7'][0].title}
                    </Text>
                    <View
                        style={styles.chartcontainer}>
                        {chartData !== null ? (
                            <PieChart
                                data={piedata['7']} // 或者 data[1]
                                width={Dimensions.get("window").width}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            // center={[10, 50]}
                            // absolute
                            />
                        ) : (
                            <Text>Loading data...</Text>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10,marginTop:10 }}>
                            {piedata['8'][0].title}
                    </Text>
                    <View
                        style={styles.chartcontainer}>
                        {chartData !== null ? (
                            <PieChart
                                data={piedata['8']} // 或者 data[1]
                                width={Dimensions.get("window").width}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            // center={[10, 50]}
                            // absolute
                            />
                        ) : (
                            <Text>Loading data...</Text>
                        )}
                    </View>


                </BottomSheetScrollView>


            </BottomSheet>

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSheet: {
        // backgroundColor: 'white',
    },
    button: {
        position: 'absolute',
        top: 20, // 调整底部距离
        left: Dimensions.get('window').width / 2 - 50, // 居中按钮
    },
    chartcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

// export default Testchart;

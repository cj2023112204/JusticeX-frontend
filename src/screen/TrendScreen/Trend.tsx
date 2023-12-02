import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../../../config";




const TrendScreen = () => {
    const { height, width } = Dimensions.get('window');
    const labels = ["竊盜罪", "殺人罪", "強盜罪", "酒駕致死"];
    const crimeIds = [1, 2, 3, 4];
    const [data, setData] = useState(null);
    const [selectedCrime, setSelectedCrime] = useState(1);
    const [selectedTag, setSelectedTag] = useState(0);

    useEffect(() => {
        fetchData(selectedCrime);
    }, [selectedCrime]);

    const crimeFieldMapping = {
        1: {
            "is_money_related_total": "金錢相關犯罪",
            "is_abandoned_total": "遺棄罪",
            "is_indoor_total": "室內犯罪",
            "is_destructive_total": "破壞罪",
            "is_group_crime_total": "團體犯罪",
            "is_transportation_used_total": "使用交通工具",
            "has_criminal_record_total": "有刑事記錄",
            "is_income_tool_total": "經濟工具犯罪",
        },
        2: {
            "is_attempted_total": "嘗試犯罪",
            "is_child_victim_total": "兒童受害",
            "is_family_relation_total": "家庭關係",
            "is_mentally_ill_total": "精神疾病",
            "is_money_dispute_total": "金錢爭議",
            "is_prior_record_total": "先前記錄",
            "is_emotional_dispute_total": "情感爭議",
            "has_historical_hate_total": "有歷史仇恨",
        },
        3: {
            "is_victim_injured_total": "受害者受傷",
            "is_group_crime_total": "團體犯罪",
            "is_weapon_used_total": "使用武器",
            "has_prior_record_total": "有先前記錄",
            "is_planned_total": "計劃犯罪",
            "is_multi_victims_total": "多名受害者",
            "is_due_to_hardship_total": "因困境而犯罪",
            "is_property_damaged_total": "財產損壞犯罪",
        },
        4: {
            "has_driving_license_total": "有駕照",
            "has_passengers_total": "有乘客",
            "affected_traffic_safety_total": "影響交通安全",
            "caused_property_damage_total": "造成財產損害",
            "is_professional_driver_total": "職業司機",
            "hit_and_run_total": "肇事後逃逸",
            "victim_has_severe_injury_total": "受害者重傷",
            "weather_was_clear_total": "天氣晴朗",
        },
    };

    const fetchData = async (crimeIds: number) => {
        const accessToken = await AsyncStorage.getItem('access_token');
        console.log(crimeIds)
        console.log("API URL:", `${API_URL}/verdict/crime_trend/?crime_id=${crimeIds}`);
        fetch(`${API_URL}/verdict/crime_trend/?crime_id=${crimeIds}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                const dataMapping = crimeFieldMapping[crimeIds];
                if (dataMapping) {
                    const mappedData = {};
                    for (const field in dataMapping) {
                        mappedData[dataMapping[field]] = json.data[field];
                    }
                    const chartData = {
                        labels: Object.keys(mappedData).filter((key) => key !== 'verdict_total'),
                        datasets: [
                            {
                                data: Object.values(mappedData).map((value) => (value as number / json.data.verdict_total) * 100),
                            },
                        ],
                    };
                    setData(chartData);
                    console.log(json)
                }
            })
            .catch((error) => console.error(error));
    };

    const chartConfig = {
        backgroundColor: '#022173',
        // backgroundGradientFrom: '#022173',
        // backgroundGradientTo: '#1b3fa0',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,

        }
    };
    const handleTagPress = (index: React.SetStateAction<number>) => {
        setSelectedTag(index);
    };

    return (
        <View>

            <ScrollView style={styles.tagContainer} horizontal={true}>

                {labels.map((label, index) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: selectedTag === index ? "#252525" : "#E6E6E6",
                            paddingHorizontal: 20,  // 標籤的水平內邊距
                            paddingVertical: 5,   // 標籤的垂直內邊距
                            borderRadius: 20,     // 圓角半徑，使其呈現圓形外觀
                            margin: 10,           // 標籤之間的外邊距
                            height: 30,
                        }}
                        key={index}
                        onPress={() => {
                            setSelectedCrime(crimeIds[index]);
                            handleTagPress(index);
                        }}
                    >
                        <Text style={{
                            color: selectedTag === index ? "#FFFFFF" : "#252525",      // 文本顏色
                            fontSize: 14,        // 文本字體大小
                            fontWeight: 'bold',
                        }}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>


            {/* 渲染图表 */}
            {data && (
                <View>
                    {/* <Text>选定的罪名: {labels[crimeIds.indexOf(selectedCrime)]}</Text> */}
                    <View style={styles.chartcontainer}>
                        <BarChart
                            data={data}
                            width={width * 0.98}
                            height={600}
                            yAxisLabel=""
                            chartConfig={chartConfig}
                            yAxisSuffix='%'
                            verticalLabelRotation={90}
                            yLabelsOffset={20}
                            xLabelsOffset={10}
                            // showValuesOnTopOfBars	
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>

                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    chartcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagContainer: {
        // position: 'absolute',
        // top: 79, // 调整这个值以达到期望的位置
        // zIndex: 0,        
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        // height:30,
        backgroundColor: 'transparent', // 使背景透明

    },
})

export default TrendScreen;

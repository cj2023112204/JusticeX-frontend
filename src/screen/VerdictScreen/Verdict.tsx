import * as React from "react";
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, TextInput, Button } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from '../../../config';
import { useEffect, useRef, useState, useCallback } from "react";
import Card from "../../components/Card/Card";
import Testchart from "../Testchart";
import { LineChart, PieChart } from 'react-native-chart-kit';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ButtonSheetScrollQuiz from '../BottomSheetScrollQuizScreen/BottomSheetScrollQuiz';
import ButtonSheetScrollQuiz2 from '../BottomSheetScrollQuizScreen/BottomSheetScrollQuiz';
import ButtonSheetScrollQuiz3 from '../BottomSheetScrollQuizScreen/BottomSheetScrollQuiz';
import ButtonSheetScrollQuiz4 from '../BottomSheetScrollQuizScreen/BottomSheetScrollQuiz';
import BottomSheetScrollView2 from '../../components/BottomSheetScrollView/BottomSheetScrollView2';



const Verdict = () => {
    const route = useRoute();
    const { height, width } = Dimensions.get('window');
    const [incidentType, setIncidentType] = useState('incident');
    const verdictId = route.params?.verdictId;
    const [verdictData, setVerdictData] = useState(null);
    const [Firstrecommendations, setFirstRecommendations] = useState(null);
    const [Secondrecommendations, setSecondRecommendations] = useState(null);
    const [Thirdrecommendations, setThirdRecommendations] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [coLike, setCoLike] = useState(false);
    const [codisLike, setCodisLike] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const navigation = useNavigation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [chartData, setChartData] = useState<any>(null);
    const [comments, setComments] = useState([]);
    const combottomSheetRef = useRef<BottomSheet>(null);
    const [replyText, setReplyText] = useState('');
    const bottomSheetRef2 = useRef<BottomSheet>(null);
    const bottomSheetRef3 = useRef<BottomSheet>(null);
    const bottomSheetRef4 = useRef<BottomSheet>(null);
    const bottomSheetRef5 = useRef<BottomSheet>(null);
    const [is_money_related, setis_money_related] = useState(false);

    const pressHandler2 = useCallback((crimeID: any) => {
        console.log(verdictId)
        if (crimeID === 1) {
            bottomSheetRef2.current?.expand();
        } else if (crimeID === 2) {
            bottomSheetRef3.current?.expand();
        } else if (crimeID === 3) {
            bottomSheetRef4.current?.expand();
        } else (crimeID === 4)
        bottomSheetRef5.current?.expand();


    }, []);
    const [crimeID, setcrimeID] = useState(0);
    useEffect(() => {
        // fetchData();
        fetchVerdictData();
        fetchRecommendations();
        fetchCommentsData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return () => bottomSheetRef2.current?.close()
        }, [])
    );

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
        //const crimeId = 1;
        console.log("1")
        const accessToken = await AsyncStorage.getItem('access_token');

        fetch(`${API_URL}/comment/feature/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "verdict_id": verdictId, "crime_id": crimeID }),
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

    const handleLike = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');

        fetch(`${API_URL}/verdict/like_verdict/?verdict_id=${verdictId}`, { // Use the verdictId in the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                verdict_id: verdictId,
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success) {
                    // 更新按讚狀態
                    setIsLiked((prevIsLiked) => !prevIsLiked);
                    console.log("讚");

                    updateLikeCount();

                } else {

                    console.log(responseData.message);

                    fetch(`${API_URL}/verdict/unlike_verdict/?verdict_id=${verdictId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            verdict_id: verdictId,
                        }),
                    })
                        .then((response) => response.json())
                        .then((cancelLikeData) => {
                            console.log(cancelLikeData.message);

                            // 同時更新按讚狀態和 icon
                            setIsLiked(false);
                        })
                        .catch((cancelLikeError) => {
                            console.error(cancelLikeError);

                        });
                    updateLikeCount();
                }
            })
            .catch((error) => {
                console.error(error);
                // 處理錯誤

            });
    };
    const piedata = {

        1: [
            {
                title: '是否為金錢相關',
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
                legendFontSize: 12,
            },
        ],
        2: [
            {
                title: '是否有遺棄贓物',
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
                title: '犯罪地點為室內',
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
                title: '竊盜方法具破壞性	',
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
                title: '利用交通工具輸送贓物	',
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
                title: '是否有前科紀錄',
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
                title: '竊取之財物為被害人生財工具',
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
    const handleSaved = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');

        fetch(`${API_URL}/verdict/collect_verdict/?verdict_id=${verdictId}`, { // Use the verdictId in the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                verdict_id: verdictId,
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success) {
                    // 更新按讚狀態
                    setIsSaved((prevIsSaved) => !prevIsSaved);
                    // console.log("讚");

                } else {

                    console.log(responseData.message);

                    fetch(`${API_URL}/verdict/uncollect_verdict/?verdict_id=${verdictId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            verdict_id: verdictId,
                        }),
                    })
                        .then((response) => response.json())
                        .then((cancelSavedData) => {
                            console.log(cancelSavedData.message);

                            // 同時更新按讚狀態和 icon
                            setIsSaved(false);
                        })
                        .catch((cancelSavedError) => {
                            console.error(cancelSavedError);

                        });
                }
            })
            .catch((error) => {
                console.error(error);
                // 處理錯誤

            });
    };

    const updateLikeCount = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        fetch(`${API_URL}/verdict/get_verdict/?verdict_id=${verdictId}`, { // Use the verdictId in the URL
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                setLikesCount(responseData.data.total_like);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    const likeComment = async (comment_id: any) => {

        const accessToken = await AsyncStorage.getItem('access_token');

        fetch(`${API_URL}/comment/add_like/`, { // Use the verdictId in the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                comment_id: comment_id,
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success) {
                    // 更新按讚狀態
                    console.log("讚")
                    // console.log("讚");
                    setCoLike((prevCoLike) => !prevCoLike);

                } else {

                    console.log(responseData.message);
                    console.log('不贊', comment_id)
                    fetch(`${API_URL}/comment/delete_like/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            comment_id: comment_id,
                        }),
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            setCoLike(false)
                            console.log("不讚")
                        })
                        .catch((cancelSavedError) => {
                            console.error(cancelSavedError);

                        });
                }
            })
            .catch((error) => {
                console.error(error);
                // 處理錯誤

            });
    };
    const dislikeComment = async (comment_id: any) => {

        const accessToken = await AsyncStorage.getItem('access_token');

        fetch(`${API_URL}/comment/add_dislike/`, { // Use the verdictId in the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                comment_id: comment_id,
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success) {
                    // 更新按讚狀態
                    console.log("讚")
                    // console.log("讚");
                    setCodisLike((prevCodisLike) => !prevCodisLike);

                } else {

                    console.log(responseData.message);
                    console.log('不贊', comment_id)
                    fetch(`${API_URL}/comment/delete_dislike/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            comment_id: comment_id,
                        }),
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            setCodisLike(false)
                            console.log("不讚")
                        })
                        .catch((cancelSavedError) => {
                            console.error(cancelSavedError);

                        });
                }
            })
            .catch((error) => {
                console.error(error);
                // 處理錯誤

            });
    };

    const fetchVerdictData = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        fetch(`${API_URL}/verdict/get_verdict/?verdict_id=${verdictId}`, { // Use the verdictId in the URL
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {

                setVerdictData(responseData.data);
                setLikesCount(responseData.data.total_like);
                setCommentsCount(responseData.data.total_comment);
                setcrimeID(responseData.data.crime_id);
            })

            .catch((error) => {
                console.error(error);
            });
    };

    const fetchCommentsData = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        fetch(`${API_URL}/comment/get_comments/?email=test3@example.com&verdict_id=${verdictId}&crime_id=${crimeID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setComments(data.data || []);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    };

    const replycomment = async (comment_id: any, content: string) => {
        const accessToken = await AsyncStorage.getItem('access_token');
        fetch(`${API_URL}/comment/add_reply/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                comment_id: comment_id,
                content: content,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(`Replying to comment ${comment_id} with: ${content}`);
                setReplyText('');
                fetch(`${API_URL}/comment/get_comments/?email=example@example.com&verdict_id=10&crime_id=1`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setComments(data.data || []);
                    })
                    .catch((error) => {
                        console.error('Error fetching comments:', error);
                    });
            })
            .catch((error) => {
                console.error('Error reply text:', error);
            });
    }

    const renderComment = (comment) => (
        <View key={comment.comment_id} style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>職業：{comment.job}</Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                <View style={{ flexDirection: "column" }}>


                    <Text style={{ fontSize: 20, marginVertical: 10 }}>{comment.comment}</Text>

                    {comment.replies.length > 0 && (
                        <View style={{ marginLeft: 16 }}>
                            {comment.replies.map((reply) => (
                                <View key={reply.reply_id} style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ fontSize: 16 }}>職業：{reply.job} 回覆：{reply.reply}</Text>
                                    {/* Add any additional reply information here */}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { likeComment(comment.comment_id) }}>
                        <MaterialCommunityIcons
                            style={[styles.cocoboldsavedIconLayout, { marginBottom: 12 }]}
                            size={24}
                            name={coLike ? "heart" : "heart-plus-outline"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { dislikeComment(comment.comment_id) }}>
                        <MaterialCommunityIcons
                            style={[styles.cocoboldsavedIconLayout, { marginBottom: 12 }]}
                            size={24}
                            name={codisLike ? "heart-broken" : "heart-broken-outline"}
                        />
                    </TouchableOpacity>
                </View>

            </View>


            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <TextInput
                    placeholder="Add a reply..."
                    value={replyText}
                    onChangeText={(text) => setReplyText(text)}
                    style={{ width: '80%', borderWidth: 1, borderColor: '#ccc', marginVertical: 8, padding: 8, marginRight: 12, borderRadius: 16 }}
                />

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { replycomment(comment.comment_id, replyText) }}>
                        <View style={{ backgroundColor: '#252525', width: 72, borderRadius: 12, padding: 12 }}>
                            <Text style={{ color: '#ffffff', textAlign: 'center' }}>回覆</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 
            <Button

                title="Reply"
                onPress={() => {
                    // Handle the logic to add a reply here, e.g., call an API
                    console.log(`Replying to comment ${comment.comment_id} with: ${replyText}`);
                }}
            /> */}
        </View>

    );

    const handleToggleIncidentType = () => {
        setIncidentType(incidentType === 'incident' ? 'incident_lite' : 'incident');
    };

    const fetchRecommendations = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        fetch(`${API_URL}/verdict/get_verdict/?verdict_id=${verdictId}`, { // Use the verdictId in the URL
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {

                setFirstRecommendations(responseData.data.recommendations[0]);
                setSecondRecommendations(responseData.data.recommendations[1]);
                setThirdRecommendations(responseData.data.recommendations[2]);
            })
            .catch((error) => {
                console.error(error);
            });
    };



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <View style={styles.verdict}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={[styles.profile, styles.profileFlexBox]}>
                        <View style={styles.profileFlexBox}>
                            <View style={styles.cocoboldsavedIconLayout}>
                                <View style={styles.avatarmain}>
                                    <Image
                                        style={styles.imageIcon}
                                        resizeMode="cover"
                                        source={require("../../../assets/images/main.png")}
                                    />
                                    {/* <Image
                style={styles.indicatorIcon}
                resizeMode="cover"
                source={require("../assets/indicator.png")}
              /> */}
                                    <Text style={[styles.mj, styles.mjFlexBox]}>MJ</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.kristoEmanuel, styles.textTypo1]}>Justice X</Text>
                    </View>
                    <Text style={[styles.text, styles.textFlexBox]}>
                        {verdictData?.title}
                    </Text>
                    <View style={[styles.time, styles.profileFlexBox]}>
                        <Text style={[styles.text1, styles.textTypo1]}>
                            {verdictData?.sub_title}
                        </Text>
                        {/* <Image
          style={styles.timeChild}
          resizeMode="cover"
          source={require("../assets/ellipse-4.png")}
        /> */}
                        <Text style={[styles.text2, styles.textTypo1]}>2022-12-21</Text>
                        {/* <Image
          style={styles.timeChild}
          resizeMode="cover"
          source={require("../assets/ellipse-3.png")}
        /> */}
                        <Text style={[styles.text2, styles.textTypo1]}>{verdictData?.crime_type}</Text>
                    </View>

                    <TouchableOpacity onPress={handleToggleIncidentType}>
                        <View style={[styles.primaryButton, styles.primarySpaceBlock]}>
                            <Text style={styles.button}>AI 摘要</Text>
                        </View>
                    </TouchableOpacity>
                    <Text
                        style={styles.airpodspro1113}
                    >{verdictData?.[incidentType]}</Text>


                    <View style={{ width: '100%', alignItems: 'flex-end', }}>
                        <TouchableOpacity onPress={handleSaved}>
                            <MaterialCommunityIcons
                                style={[styles.cocoboldsavedIcon, styles.cocoboldsavedIconLayout]}
                                size={24}
                                name={isSaved ? "bookmark" : "bookmark-outline"}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* <Image
                    style={[styles.cocoboldsavedIcon3, styles.cocoboldsavedIconLayout]}
                    resizeMode="cover"
                    source={require("../assets/cocoboldsaved3.png")}
                /> */}


                    <View style={[styles.h2, styles.dividerIconPosition]}>
                        <View style={[styles.h2Child, styles.dividerIconPosition]} />
                        <Text style={[styles.text4, styles.textTypo]}>推薦判例</Text>
                    </View>

                    <TouchableOpacity
                        style={{ flex: 1, alignItems: "center", paddingTop: 21, paddingBottom: 10 }}
                        onPress={() => navigation.navigate('Verdict', { verdictId: Firstrecommendations?.verdict_id })}
                    >
                        <Card
                            title={Firstrecommendations?.title}
                            date={Firstrecommendations?.judgement_date}
                            crime_type={Firstrecommendations?.crime_type}
                            likes={Firstrecommendations?.total_like}  // 你可以设置为推薦判例的喜欢数量
                            total_comment={Firstrecommendations?.total_comment}  // 你可以设置为推薦判例的评论数量
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: "center", paddingTop: 21, paddingBottom: 10 }}
                        onPress={() => navigation.navigate('Verdict', { verdictId: Secondrecommendations?.verdict_id })}
                    >
                        <Card
                            title={Secondrecommendations?.title}
                            date={Secondrecommendations?.judgement_date}
                            crime_type={Secondrecommendations?.crime_type}
                            likes={Secondrecommendations?.total_like}  // 你可以设置为推薦判例的喜欢数量
                            total_comment={Secondrecommendations?.total_comment}  // 你可以设置为推薦判例的评论数量
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: "center", paddingTop: 21, paddingBottom: 10 }}
                        onPress={() => navigation.navigate('Verdict', { verdictId: Thirdrecommendations?.verdict_id })}
                    >
                        <Card
                            title={Thirdrecommendations?.title}
                            date={Thirdrecommendations?.judgement_date}
                            crime_type={Thirdrecommendations?.crime_type}
                            likes={Thirdrecommendations?.total_like}  // 你可以设置为推薦判例的喜欢数量
                            total_comment={Thirdrecommendations?.total_comment}  // 你可以设置为推薦判例的评论数量
                        />
                    </TouchableOpacity>
                    <View style={{ height: 100 }}></View>

                </ScrollView>

                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 10 }}>
                    <View style={[styles.bottomBarChild, styles.bottomLayout]} />
                    <View style={[styles.downloadPro, styles.downloadProPosition]}>
                        <View style={styles.profileFlexBox}>
                            <TouchableOpacity onPress={() => {
                                combottomSheetRef.current?.expand();
                            }}>
                                <Image
                                    style={styles.cocoboldsavedIconLayout}
                                    resizeMode="cover"
                                    source={require("../../../assets/images/Download.png")}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                combottomSheetRef.current?.expand();
                            }}>
                                <Text style={[styles.text20, styles.textTypo1]}>開啟留言</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.multiSingleSelect, styles.mjFlexBox]}>
                            <TouchableOpacity

                                onPress={() => pressHandler2(crimeID)}>
                                <Text style={[styles.tag, styles.tagTypo]}>留言</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.primaryButton1, styles.downloadProPosition]}>
                        <TouchableOpacity onPress={fetchData}><Text style={styles.button}>統計圖表</Text></TouchableOpacity>
                    </View>
                    <View style={[styles.frameView, styles.profileFlexBox]}>
                        <TouchableOpacity onPress={handleLike}>
                            <MaterialCommunityIcons
                                style={styles.cocoboldsavedIconLayout}
                                size={24}
                                name={isLiked ? "heart" : "heart-plus-outline"}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.text8, styles.tagTypo]}>{likesCount} 個讚</Text>
                    </View>
                </View>
                <BottomSheetScrollView2
                    ref={bottomSheetRef2}
                    snapTo={'50%'}
                    backgroundColor='white'
                    backDropColor='black'
                >
                    <ButtonSheetScrollQuiz verdictId={verdictId} />
                </BottomSheetScrollView2>



                <BottomSheet
                    ref={combottomSheetRef}
                    index={-1}
                    snapPoints={['10%', '50%']}
                    style={styles.bottomSheet}
                    enablePanDownToClose
                    animateOnMount
                >
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 800, color: '#252525' }}>國民法官判決 {verdictData?.month} 個月</Text>
                    <BottomSheetScrollView>
                        {comments && comments.map((comment) => renderComment(comment))}
                    </BottomSheetScrollView>
                </BottomSheet>

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
                        <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>
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
                        <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>
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
                        <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>
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
                        <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>
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
                        <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>
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
                        <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>
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
                        <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>
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
        </GestureHandlerRootView>
    );
};

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
    },
    profileFlexBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    mjFlexBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    textTypo1: {
        // fontFamily: "PlusJakartaSans-Medium",
        fontWeight: "500",
        lineHeight: 17,
        fontSize: 10,
    },
    textFlexBox: {
        display: "flex",
        textAlign: "left",
        alignItems: "center",
    },
    primarySpaceBlock: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        width: 72,
        justifyContent: "center",
    },
    dividerIconPosition: {
        width: "100%",
        left: 0,
        position: "relative",
    },
    textTypo: {
        fontSize: 14,
        // fontFamily: "PlusJakartaSans-Bold",
        fontWeight: "700",
    },
    cardPosition: {
        padding: 20,
        left: 7,
        flexDirection: "row",
        position: "relative",
        backgroundColor: "#fff",
    },
    time1FlexBox: {
        marginTop: 18,
        alignItems: "center",
        flexDirection: "row",
    },
    tagTypo: {
        lineHeight: 21,
        fontSize: 12,
        // fontFamily: "PlusJakartaSans-Regular",
    },
    cocoboldsavedIconLayout: {
        height: 24,
        width: 24,
    },
    bottomLayout: {
        height: 64,
        width: 390,
        left: 0,
        position: "relative",
    },
    downloadProPosition: {
        borderRadius: 60,
        top: 13,
        backgroundColor: "#252525",
        alignItems: "center",
        position: "absolute",
    },
    text22Position: {
        top: 57,
        position: "relative",
    },
    iconPosition: {
        left: "50%",
        position: "relative",
    },
    leftSideLayout: {
        height: 21,
        width: 54,
        left: "50%",
        position: "relative",
    },
    imageIcon: {
        right: 0,
        bottom: 0,
        maxHeight: "100%",
        maxWidth: "100%",
        left: 0,
        overflow: "hidden",
        top: 0,
        borderRadius: 100,
        position: "relative",
    },
    indicatorIcon: {
        height: "18.46%",
        width: "18.46%",
        top: "4.62%",
        right: "4.62%",
        bottom: "76.92%",
        left: "76.92%",
        display: "none",
        maxHeight: "100%",
        overflow: "hidden",
        maxWidth: "100%",
        position: "relative",
    },
    mj: {
        height: "33.85%",
        width: "72.31%",
        top: "32.31%",
        left: "13.85%",
        fontSize: 9,
        lineHeight: 2,
        // fontFamily: "Inter-SemiBold",
        textAlign: "center",
        color: "#fff",
        position: "relative",
        fontWeight: "600",
        justifyContent: "center",
        display: "none",
    },
    avatarmain: {
        height: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        borderRadius: 100,
        position: "relative",
        width: "100%",
    },
    kristoEmanuel: {
        marginLeft: 8,
        textAlign: "left",
        color: "#000",
        flex: 1,
        fontWeight: "500",
        lineHeight: 17,
        fontSize: 10,
    },
    profile: {
        marginTop: 42,
        width: 160,
        alignItems: "center",
        left: 25,
        position: "relative",
    },
    text: {
        marginTop: 12,
        left: 24,
        fontSize: 26,
        lineHeight: 36,
        width: '100%',
        color: "#252525",
        // fontFamily: "PlusJakartaSans-Bold",
        fontWeight: "700",
        display: "flex",
        position: "relative",
    },
    text1: {
        color: "#999",
        textAlign: "left",
    },
    timeChild: {
        width: 2,
        height: 2,
        marginLeft: 8,
    },
    text2: {
        color: "#999",
        marginLeft: 8,
        textAlign: "left",
    },
    time: {
        marginTop: 12,
        left: 25,
        position: "relative",
    },
    airpodspro1113: {
        marginTop: 12,
        lineHeight: 24,
        width: 340,
        // fontFamily: "PlusJakartaSans-Regular",
        fontSize: 14,
        color: "#252525",
        textAlign: "left",
        left: 25,
        position: "relative",
    },
    button: {
        fontSize: 12,
        textAlign: "left",
        // fontFamily: "PlusJakartaSans-Medium",
        fontWeight: "500",
        color: "#fff",
    },
    primaryButton: {
        marginTop: -25,
        left: 290,
        borderRadius: 12,
        backgroundColor: "#252525",
        paddingVertical: 9,
        paddingHorizontal: 16,
        width: 72,
        alignItems: "center",
        position: "relative",
    },
    h2Child: {
        backgroundColor: "#f2f2f2",
        height: 37,
        top: 0,
    },
    text4: {
        top: 9,
        left: 22,
        color: "#999",
        textAlign: "left",
        position: "absolute",
    },
    h2: {
        marginTop: 12,
        height: 37,
        position: "relative",
    },
    justiceX: {
        color: "#252525",
        marginLeft: 8,
        textAlign: "left",
        flex: 1,
        fontWeight: "500",
        lineHeight: 17,
        fontSize: 10,
    },
    profile1: {
        width: 160,
        alignItems: "center",
    },
    text5: {
        alignSelf: "stretch",
        color: "#252525",
        textAlign: "left",
    },
    title: {
        alignSelf: "stretch",
    },
    time1: {
        alignSelf: "stretch",
    },
    text8: {
        marginLeft: 6,
        color: "#999",
        textAlign: "left",
    },
    cocoboldsavedIcon: {
        marginRight: 25,
    },
    info: {
        width: 193,
        marginTop: 16,
    },
    content: {
        maxWidth: 260,
    },
    frameChild: {
        top: -15,
        left: -42,
        width: 190,
        height: 190,
        position: "relative",
    },
    text9: {
        top: 32,
        left: 18,
        textAlign: "center",
        color: "#fff",
        position: "relative",
    },
    ellipseParent: {
        width: 103,
        height: 113,
        marginTop: 16,
    },
    cocoboldmoreParent: {
        alignItems: "flex-end",
        marginLeft: 39,
    },
    card: {
        top: 659,
    },
    card1: {
        top: 833,
    },
    dividerIcon: {
        top: 831,
        height: 2,
    },
    card2: {
        top: 1006,
        height: 254,
    },
    dividerIcon1: {
        top: 1004,
        height: 2,
    },
    cocoboldsavedIcon3: {
        top: 585,
        left: 341,
        position: "relative",
    },
    bottomBarChild: {
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowRadius: 20,
        elevation: 20,
        shadowOpacity: 1,
        top: 0,
        backgroundColor: "#fff",
    },
    text20: {
        marginLeft: 4,
        color: "#999",
        textAlign: "center",
    },
    tag: {
        color: "#000",
        textAlign: "center",
    },
    multiSingleSelect: {
        borderRadius: 50,
        width: 58,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "#fff",
    },
    downloadPro: {
        height: 37,
        left: 191,
        width: 174,
        justifyContent: "space-between",
        padding: 4,
        flexDirection: "row",
        borderRadius: 60,
        top: 13,
    },
    primaryButton1: {
        left: 104,
        height: 37,
        paddingVertical: 9,
        paddingHorizontal: 16,
        width: 72,
        justifyContent: "center",
    },
    frameView: {
        top: 19,
        left: 25,
        position: "absolute",
    },
    bottomBar: {
        top: 180,
    },
    cocoboldarrowLeft: {
        height: 24,
        width: 24,
        left: 25,
    },
    text22: {
        left: 103,
        width: 183,
        fontSize: 14,
        // fontFamily: "PlusJakartaSans-Bold",
        fontWeight: "700",
        color: "#999",
        display: "flex",
        textAlign: "left",
        alignItems: "center",
    },
    notchIcon: {
        marginLeft: -86,
        width: 0,
        height: 0,
        top: 0,
    },
    time4: {
        top: 1,
        fontSize: 16,
        letterSpacing: 0,
        fontFamily: "SF Pro Text",
        height: 20,
        width: 54,
        lineHeight: 21,
        color: "#000",
        textAlign: "center",
        fontWeight: "600",
        left: 0,
        position: "relative",
    },
    statusbarTime: {
        marginLeft: -27,
        borderRadius: 24,
        top: 0,
    },
    leftSide: {
        marginLeft: -168,
        top: 14,
    },
    rightSideIcon: {
        marginLeft: 91,
        width: 77,
        height: 13,
        top: 19,
    },
    statusbar: {
        height: 47,
        overflow: "hidden",
        width: 390,
        top: 0,
    },
    verdict: {
        height: "100%",
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default Verdict;

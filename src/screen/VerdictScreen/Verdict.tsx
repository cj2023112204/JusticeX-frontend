import * as React from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';

const Verdict = () => {
    const route = useRoute();
    const { height, width } = Dimensions.get('window');
    const verdictId = route.params?.verdictId;
    return (
        <View style={styles.verdict}>
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
                黃家新竊盜案件確定執行刑罰
            </Text>
            <View style={[styles.time, styles.profileFlexBox]}>
                <Text style={[styles.text1, styles.textTypo1]}>
                    111年度簡字第2950號
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
                <Text style={[styles.text2, styles.textTypo1]}>竊盜</Text>
            </View>
            <Text
                style={styles.airpodspro1113}
            >{`黃家新前因竊盜案件，經臺灣新北地方法院以109年度
聲字第4249號裁定應執行刑為有期徒刑10月確定，
於民國110年5月31日縮短刑期執行完畢。
詎仍不知悔改，意圖為自己不法之所有，基於竊盜之犯意，於111年4月23日9時30分許，前往位於臺北市○○區○○路00巷0號之璞漣商務旅館西門館櫃檯內辦公室桌上，徒手竊取王先明所有之黑色包包1個，
內有錢包1個（內有現金新臺幣【下同】2,000元）、零錢包1個、車鑰匙1串、AirPodsPro無限耳機1組、護照1本（價值合計約1萬3,000元），得手後，旋即離去。
嗣經王先明友人謝汶馨依據AirPodsPro無限耳機定位功能，耳機位於新北市○○區○○○○○0號出口處，經報警處理，始循線查悉上情。`}</Text>
            <View style={[styles.primaryButton, styles.primarySpaceBlock]}>
                <Text style={styles.button}>AI 摘要</Text>
            </View>
            <View style={[styles.h2, styles.dividerIconPosition]}>
                <View style={[styles.h2Child, styles.dividerIconPosition]} />
                <Text style={[styles.text4, styles.textTypo]}>推薦判例</Text>
            </View>
            {/* <View style={[styles.card, styles.cardPosition]}>
                <View style={styles.content}>
                    <View style={[styles.profile1, styles.profileFlexBox]}>
                        <View style={styles.profileFlexBox}>
                            <View style={styles.cocoboldsavedIconLayout}>
                                <View style={styles.avatarmain}>
                                    <Image
                                        style={styles.imageIcon}
                                        resizeMode="cover"
                                        source={require("../assets/image1.png")}
                                    />
                                    <Image
                                        style={styles.indicatorIcon}
                                        resizeMode="cover"
                                        source={require("../assets/indicator1.png")}
                                    />
                                    <Text style={[styles.mj, styles.mjFlexBox]}>MJ</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.justiceX, styles.textTypo1]}>Justice X</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.title}>
                            <Text style={[styles.text5, styles.textTypo]}>
                                尤日祥竊盜案件定罪！
                            </Text>
                        </View>
                        <View style={[styles.time1, styles.time1FlexBox]}>
                            <Text style={[styles.text1, styles.textTypo1]}>2022-12-28</Text>
                            <Image
                                style={styles.timeChild}
                                resizeMode="cover"
                                source={require("../assets/ellipse-31.png")}
                            />
                            <Text style={[styles.text2, styles.textTypo1]}>竊盜</Text>
                        </View>
                        <View style={styles.time1FlexBox}>
                            <Image
                                style={styles.cocoboldsavedIconLayout}
                                resizeMode="cover"
                                source={require("../assets/cocoboldheart.png")}
                            />
                            <Text style={[styles.text8, styles.tagTypo]}>0 個讚</Text>
                            <Image
                                style={[
                                    styles.cocoboldsavedIcon,
                                    styles.cocoboldsavedIconLayout,
                                ]}
                                resizeMode="cover"
                                source={require("../assets/cocoboldsaved.png")}
                            />
                            <Image
                                style={[
                                    styles.cocoboldsavedIcon,
                                    styles.cocoboldsavedIconLayout,
                                ]}
                                resizeMode="cover"
                                source={require("../assets/cocoboldmessage--4.png")}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.cocoboldmoreParent}>
                    <Image
                        style={styles.cocoboldsavedIconLayout}
                        resizeMode="cover"
                        source={require("../assets/cocoboldmore.png")}
                    />
                    <View style={styles.ellipseParent}>
                        <Image
                            style={styles.frameChild}
                            resizeMode="cover"
                            source={require("../assets/ellipse-6.png")}
                        />
                        <Text style={[styles.text9, styles.textTypo]}>
                            已有 0 位在參與討論
                        </Text>
                    </View>
                </View>
            </View>
            <View style={[styles.card1, styles.cardPosition]}>
                <View style={styles.content}>
                    <View style={[styles.profile1, styles.profileFlexBox]}>
                        <View style={styles.profileFlexBox}>
                            <View style={styles.cocoboldsavedIconLayout}>
                                <View style={styles.avatarmain}>
                                    <Image
                                        style={styles.imageIcon}
                                        resizeMode="cover"
                                        source={require("../assets/image2.png")}
                                    />
                                    <Image
                                        style={styles.indicatorIcon}
                                        resizeMode="cover"
                                        source={require("../assets/indicator2.png")}
                                    />
                                    <Text style={[styles.mj, styles.mjFlexBox]}>MJ</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.justiceX, styles.textTypo1]}>Justice X</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.title}>
                            <Text style={[styles.text5, styles.textTypo]}>
                                陳爾君竊取4萬7千元
                            </Text>
                        </View>
                        <View style={[styles.time1, styles.time1FlexBox]}>
                            <Text style={[styles.text1, styles.textTypo1]}>2022-12-22</Text>
                            <Image
                                style={styles.timeChild}
                                resizeMode="cover"
                                source={require("../assets/ellipse-32.png")}
                            />
                            <Text style={[styles.text2, styles.textTypo1]}>竊盜</Text>
                        </View>
                        <View style={styles.time1FlexBox}>
                            <Image
                                style={styles.cocoboldsavedIconLayout}
                                resizeMode="cover"
                                source={require("../assets/cocoboldheart1.png")}
                            />
                            <Text style={[styles.text8, styles.tagTypo]}>0 個讚</Text>
                            <Image
                                style={[
                                    styles.cocoboldsavedIcon,
                                    styles.cocoboldsavedIconLayout,
                                ]}
                                resizeMode="cover"
                                source={require("../assets/cocoboldsaved1.png")}
                            />
                            <Image
                                style={[
                                    styles.cocoboldsavedIcon,
                                    styles.cocoboldsavedIconLayout,
                                ]}
                                resizeMode="cover"
                                source={require("../assets/cocoboldmessage--41.png")}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.cocoboldmoreParent}>
                    <Image
                        style={styles.cocoboldsavedIconLayout}
                        resizeMode="cover"
                        source={require("../assets/cocoboldmore1.png")}
                    />
                    <View style={styles.ellipseParent}>
                        <Image
                            style={styles.frameChild}
                            resizeMode="cover"
                            source={require("../assets/ellipse-61.png")}
                        />
                        <Text style={[styles.text9, styles.textTypo]}>
                            已有 0 位在參與討論
                        </Text>
                    </View>
                </View>
            </View>
            <Image
                style={[styles.dividerIcon, styles.dividerIconPosition]}
                resizeMode="cover"
                source={require("../assets/divider.png")}
            />
            <View style={[styles.card2, styles.cardPosition]}>
                <View style={styles.content}>
                    <View style={[styles.profile1, styles.profileFlexBox]}>
                        <View style={styles.profileFlexBox}>
                            <View style={styles.cocoboldsavedIconLayout}>
                                <View style={styles.avatarmain}>
                                    <Image
                                        style={styles.imageIcon}
                                        resizeMode="cover"
                                        source={require("../assets/image3.png")}
                                    />
                                    <Image
                                        style={styles.indicatorIcon}
                                        resizeMode="cover"
                                        source={require("../assets/indicator3.png")}
                                    />
                                    <Text style={[styles.mj, styles.mjFlexBox]}>MJ</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.justiceX, styles.textTypo1]}>Justice X</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.title}>
                            <Text style={[styles.text5, styles.textTypo]}>
                                前竊盜犯再次行竊 南安宮金牌遭盜取
                            </Text>
                        </View>
                        <View style={[styles.time1, styles.time1FlexBox]}>
                            <Text style={[styles.text1, styles.textTypo1]}>2023-08-09</Text>
                            <Image
                                style={styles.timeChild}
                                resizeMode="cover"
                                source={require("../assets/ellipse-33.png")}
                            />
                            <Text style={[styles.text2, styles.textTypo1]}>竊盜</Text>
                        </View>
                        <View style={styles.time1FlexBox}>
                            <Image
                                style={styles.cocoboldsavedIconLayout}
                                resizeMode="cover"
                                source={require("../assets/cocoboldheart2.png")}
                            />
                            <Text style={[styles.text8, styles.tagTypo]}>0 個讚</Text>
                            <Image
                                style={[
                                    styles.cocoboldsavedIcon,
                                    styles.cocoboldsavedIconLayout,
                                ]}
                                resizeMode="cover"
                                source={require("../assets/cocoboldsaved2.png")}
                            />
                            <Image
                                style={[
                                    styles.cocoboldsavedIcon,
                                    styles.cocoboldsavedIconLayout,
                                ]}
                                resizeMode="cover"
                                source={require("../assets/cocoboldmessage--42.png")}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.cocoboldmoreParent}>
                    <Image
                        style={styles.cocoboldsavedIconLayout}
                        resizeMode="cover"
                        source={require("../assets/cocoboldmore2.png")}
                    />
                    <View style={styles.ellipseParent}>
                        <Image
                            style={styles.frameChild}
                            resizeMode="cover"
                            source={require("../assets/ellipse-62.png")}
                        />
                        <Text style={[styles.text9, styles.textTypo]}>
                            已有 0 位在參與討論
                        </Text>
                    </View>
                </View>
            </View> */}
            {/* <Image
                style={[styles.dividerIcon1, styles.dividerIconPosition]}
                resizeMode="cover"
                source={require("../assets/divider1.png")}
            />
            <Image
                style={[styles.cocoboldsavedIcon3, styles.cocoboldsavedIconLayout]}
                resizeMode="cover"
                source={require("../assets/cocoboldsaved3.png")}
            /> */}
            <View style={[styles.bottomBar, styles.bottomLayout]}>
                <View style={[styles.bottomBarChild, styles.bottomLayout]} />
                <View style={[styles.downloadPro, styles.downloadProPosition]}>
                    <View style={styles.profileFlexBox}>
                        {/* <Image
                            style={styles.cocoboldsavedIconLayout}
                            resizeMode="cover"
                            source={require("../assets/cocobolddownload.png")}
                        /> */}
                        <Text style={[styles.text20, styles.textTypo1]}>開啟留言</Text>
                    </View>
                    <View style={[styles.multiSingleSelect, styles.mjFlexBox]}>
                        <Text style={[styles.tag, styles.tagTypo]}>留下想法</Text>
                    </View>
                </View>
                <View style={[styles.primaryButton1, styles.downloadProPosition]}>
                    <Text style={styles.button}>統計圖表</Text>
                </View>
                <View style={[styles.frameView, styles.profileFlexBox]}>
                    {/* <Image
                        style={styles.cocoboldsavedIconLayout}
                        resizeMode="cover"
                        source={require("../assets/cocoboldheart3.png")}
                    /> */}
                    <Text style={[styles.text8, styles.tagTypo]}>5 個讚</Text>
                </View>
            </View>
            {/* <Image
                style={[styles.cocoboldarrowLeft, styles.text22Position]}
                resizeMode="cover"
                source={require("../assets/cocoboldarrow--left.png")}
            /> */}

        </View>
    );
};

const styles = StyleSheet.create({
    profileFlexBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    mjFlexBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    textTypo1: {
        fontFamily: "PlusJakartaSans-Medium",
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
        width: 390,
        left: 0,
        position: "absolute",
    },
    textTypo: {
        fontSize: 14,
        fontFamily: "PlusJakartaSans-Bold",
        fontWeight: "700",
    },
    cardPosition: {
        padding: 20,
        left: 7,
        flexDirection: "row",
        position: "absolute",
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
        fontFamily: "PlusJakartaSans-Regular",
    },
    cocoboldsavedIconLayout: {
        height: 24,
        width: 24,
    },
    bottomLayout: {
        height: 64,
        width: 390,
        left: 0,
        position: "absolute",
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
        position: "absolute",
    },
    iconPosition: {
        left: "50%",
        position: "absolute",
    },
    leftSideLayout: {
        height: 21,
        width: 54,
        left: "50%",
        position: "absolute",
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
        position: "absolute",
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
        position: "absolute",
    },
    mj: {
        height: "33.85%",
        width: "72.31%",
        top: "32.31%",
        left: "13.85%",
        fontSize: 9,
        lineHeight: 2,
        fontFamily: "Inter-SemiBold",
        textAlign: "center",
        color: "#fff",
        position: "absolute",
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
        position: "absolute",
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
        top: 123,
        width: 160,
        alignItems: "center",
        left: 25,
        position: "absolute",
    },
    text: {
        top: 159,
        left: 24,
        fontSize: 26,
        lineHeight: 36,
        width: 341,
        color: "#252525",
        fontFamily: "PlusJakartaSans-Bold",
        fontWeight: "700",
        display: "flex",
        position: "absolute",
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
        top: 207,
        left: 25,
        position: "absolute",
    },
    airpodspro1113: {
        top: 236,
        lineHeight: 24,
        width: 340,
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 14,
        color: "#252525",
        textAlign: "left",
        left: 25,
        position: "absolute",
    },
    button: {
        fontSize: 12,
        textAlign: "left",
        fontFamily: "PlusJakartaSans-Medium",
        fontWeight: "500",
        color: "#fff",
    },
    primaryButton: {
        top: 199,
        left: 290,
        borderRadius: 12,
        backgroundColor: "#252525",
        paddingVertical: 9,
        paddingHorizontal: 16,
        width: 72,
        alignItems: "center",
        position: "absolute",
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
        top: 622,
        height: 37,
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
        marginLeft: 6,
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
        position: "absolute",
    },
    text9: {
        top: 32,
        left: 18,
        textAlign: "center",
        color: "#fff",
        position: "absolute",
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
        position: "absolute",
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
        top: 780,
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
        fontFamily: "PlusJakartaSans-Bold",
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
        position: "absolute",
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
        height: 844,
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default Verdict;

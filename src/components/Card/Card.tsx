
import * as React from "react";
import { Text, StyleSheet, Image, View, StatusBar } from "react-native";
import { FontFamily, FontSize, Padding, Color, Border } from "./GlobalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from 'react-native-fast-image'

export default function Card ({ title, date, crime_type, likes, total_comment }:any) {
    return (
            <View style={[styles.cardSpaceBlock]}>
                <View style={styles.content}>
                    <View style={[styles.profile, styles.avatarFlexBox]}>
                        <View style={styles.avatarFlexBox}>
                            <View style={styles.iconLayout1}>
                                <View style={styles.avatarmain}>
                                    <FastImage
                                        style={[styles.imageIcon, styles.iconLayout]}
                                        resizeMode={FastImage.resizeMode.contain}
                                        source={require("../../../assets/images/main.png")}
                                    />
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.justiceX, styles.textTypo]}>Justice X</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.title}>
                            <Text style={[styles.text1, styles.textTypo1]}>
                                {title}
                            </Text>
                        </View>
                        <View style={[styles.time, styles.timeFlexBox]}>
                            <Text style={[styles.text2, styles.textTypo]}>{date}</Text>
                            <FastImage
                                style={styles.timeChild}
                                resizeMode={FastImage.resizeMode.contain}
                                source={require("../../../assets/images/Ellipse-3.jpg")}
                            />
                            <Text style={[styles.text3, styles.textTypo]}>{crime_type}</Text>
                        </View>
                        <View style={styles.timeFlexBox}>
                            <MaterialCommunityIcons
                                name="heart-outline"
                                size={24}
                            />
                            <Text style={styles.text4}>{likes} 個讚</Text>
                            <MaterialCommunityIcons
                                style={styles.cocoboldsavedIcon}
                                name="bookmark-outline"
                                size={24}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.cocoboldmoreParent}>
                    <MaterialCommunityIcons
                        name="dots-horizontal"
                        size={24}
                    />
                    <View style={styles.ellipseParent}>
                        <FastImage
                            style={styles.frameChild}
                            resizeMode={FastImage.resizeMode.contain}
                            source={require("../../../assets/images/Ellipse-6.jpg")}
                        />
                        <Text style={[styles.text5, styles.mjFlexBox]}>
                            已有 {total_comment} 位{"\n"}在參與討論
                        </Text>
                    </View>
                </View>
            </View>
        
    );
};

const styles = StyleSheet.create({
    tabFlexBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    textTypo1: {
        textAlign: "left",
        fontFamily: FontFamily.subtitle,
        fontWeight: "700",
        fontSize: FontSize.subtitle_size,
    },
    iconLayout1: {
        height: 24,
        width: 24,
    },
    dividerIconPosition: {
        width: 390,
        left: 0,
        position: "absolute",
    },
    cardSpaceBlock: {
        // padding: Padding.p_xl,
        flexDirection: "row",
    },
    avatarFlexBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    iconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        position: "absolute",
    },
    mjFlexBox: {
        textAlign: "center",
        color: Color.themeWhiteDefault,
        position: "absolute",
    },
    textTypo: {
        fontFamily: FontFamily.text3,
        fontWeight: "500",
        lineHeight: 17,
        fontSize: FontSize.text3_size,
        textAlign: "left",
    },
    timeFlexBox: {
        marginTop: 18,
        alignItems: "center",
        flexDirection: "row",
    },
    navbarShadowBox: {
        shadowOpacity: 1,
        elevation: 45,
        shadowRadius: 45,
        shadowOffset: {
            width: 0,
            height: -30,
        },
        width: 390,
        backgroundColor: Color.themeWhiteDefault,
    },
    iconPosition: {
        top: 62,
        height: 25,
        position: "absolute",
    },
    tabTypo: {
        lineHeight: 24,
        fontFamily: FontFamily.text1,
        textAlign: "center",
        fontSize: FontSize.subtitle_size,
    },
    tabSpaceBlock: {
        marginTop: 4,
        borderStyle: "solid",
        alignSelf: "stretch",
    },
    text: {
        color: Color.grey2,
    },
    cocoboldsearchIcon: {
        marginLeft: 240,
    },
    parent: {
        top: 155,
        left: 27,
        borderRadius: 6,
        backgroundColor: Color.grey4,
        width: 335,
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: "row",
        position: "absolute",
    },
    dividerIcon: {
        top: 412,
        height: 2,
    },
    imageIcon: {
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        borderRadius: Border.br_81xl,
    },
    indicatorIcon: {
        height: "18.46%",
        width: "18.46%",
        top: "4.62%",
        right: "4.62%",
        bottom: "76.92%",
        left: "76.92%",
        display: "none",
    },
    mj: {
        height: "33.85%",
        width: "72.31%",
        top: "32.31%",
        left: "13.85%",
        fontSize: FontSize.size_4xs,
        lineHeight: 2,
        fontWeight: "600",
        fontFamily: FontFamily.headingsH3,
        display: "none",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarmain: {
        height: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        borderRadius: Border.br_81xl,
        position: "absolute",
        width: "100%",
    },
    justiceX: {
        marginLeft: 8,
        color: Color.black1,
        flex: 1,
    },
    profile: {
        width: 160,
    },
    text1: {
        alignSelf: "stretch",
        color: Color.black1,
    },
    title: {
        alignSelf: "stretch",
    },
    text2: {
        color: Color.grey2,
    },
    timeChild: {
        width: 2,
        marginLeft: 8,
        height: 2,
    },
    text3: {
        marginLeft: 8,
        color: Color.grey2,
    },
    time: {
        alignSelf: "stretch",
    },
    text4: {
        fontSize: FontSize.text2_size,
        lineHeight: 21,
        marginLeft: 6,
        fontFamily: FontFamily.text1,
        textAlign: "left",
        color: Color.grey2,
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
    text5: {
        top: 32,
        left: 18,
        fontFamily: FontFamily.subtitle,
        fontWeight: "700",
        fontSize: FontSize.subtitle_size,
        textAlign: "center",
        color: Color.themeWhiteDefault,
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
        top: 414,
        left: 7,
        padding: Padding.p_xl,
        position: "absolute",
        backgroundColor: Color.themeWhiteDefault,
    },
    card1: {
        top: 219,
        left: 7,
        padding: Padding.p_xl,
        position: "absolute",
        backgroundColor: Color.themeWhiteDefault,
    },
    dividerIcon1: {
        top: 604,
        height: 2,
    },
    card2: {
        top: 606,
        left: 7,
        padding: Padding.p_xl,
        position: "absolute",
        backgroundColor: Color.themeWhiteDefault,
    },
    dividerIcon2: {
        top: 799,
        height: 2,
    },
    card3: {
        top: 801,
        left: 7,
        padding: Padding.p_xl,
        position: "absolute",
        backgroundColor: Color.themeWhiteDefault,
    },
    homeChild: {
        shadowColor: "rgba(22, 22, 22, 0.05)",
        height: 131,
        top: 0,
        left: 0,
        position: "absolute",
    },
    cihamburgerMdIcon: {
        left: 21,
        width: 25,
        top: 62,
    },
    justicexHighResolutionLogoIcon: {
        left: 115,
        width: 160,
    },
    tabActive: {
        color: Color.black1,
    },
    tabChild: {
        borderColor: Color.black1,
        borderTopWidth: 2,
        height: 2,
    },
    tab: {
        flex: 1,
    },
    tabActive1: {
        color: Color.grey2,
    },
    tabItem: {
        borderColor: Color.grey2,
        borderTopWidth: 1,
        height: 1,
    },
    tab2: {
        width: 100,
        display: "none",
    },
    tabBar: {
        top: 103,
        flexDirection: "row",
    },
    home: {
        height: 844,
        width: "100%",
        flex: 1,
        backgroundColor: Color.themeWhiteDefault,
    },
});

// export default Card;
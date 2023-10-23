import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, SafeAreaView, ScrollView, Image, PixelRatio } from 'react-native';
import FastImage from 'react-native-fast-image';

const IntroductionPage = () => {
  const { height,width } = Dimensions.get('window');
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const setSliderPage = (event: any) => {
    
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    if (indexOfNextScreen != currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
      console.log("換頁囉");
      console.log(currentPage,indexOfNextScreen);
    }else{console.log(currentPage,indexOfNextScreen);}
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ width,flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          
          onScroll={(event: any) => {
            setSliderPage(event);
          }}
        >
          <View style={[{ width, height, backgroundColor: '#F2F2F2' }, styles.blackBlock]}>
            <View style={styles.imagecontainer}>
              <Image
                source={require('../../assets/images/book.png')}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.header}>國民法官制度是什麼？</Text>
              <Text style={styles.paragraph}>國民法官制度，就是由一群來自各行各業的民眾，{'\n'}
                與法官一起坐在法檯上，共同審判的制度。{'\n'}{'\n'}

                國民法官雖然沒有法律背景，{'\n'}
                但可以把不同的生活經驗、價值思考，帶進法庭。{'\n'}
                藉著國民法官的參與，可以讓司法審判更透明，{'\n'}
                讓司法專業與外界對話，彼此交流與反思，{'\n'}
                藉此促進國民與法院間的相互理解。</Text>
            </View>

          </View>
          <View style={[{ width, height }, styles.blackBlock]}>
            <View style={styles.imagecontainer}>
              <Image
                source={require('../../assets/images/2ppl.png')}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.header}>誰可以當國民法官？</Text>

              <Text style={styles.paragraph}>符合「三種」基本資格就有機會擔任國民法官</Text>

              <View style={styles.listwrapper}>
                <Image
                  style={[{ top: '110%', }, styles.iconStyle]}
                  source={require('../../assets/images/v.png')}
                  resizeMode="cover"
                />
                <Text style={styles.paragraph1}>年滿 23 歲</Text>
              </View>
              <View style={styles.listwrapper}>
                <Image
                  style={[{ top: '110%', }, styles.iconStyle]}
                  source={require('../../assets/images/v.png')}
                  resizeMode="cover"
                />
                <Text style={styles.paragraph1}>具有中華民國國籍的國民</Text>
              </View>
              <View style={styles.listwrapper}>
                <Image
                  style={[{ top: '110%', }, styles.iconStyle]}
                  source={require('../../assets/images/v.png')}
                  resizeMode="cover"
                />
                <Text style={styles.paragraph1}>地方法院管轄區域連續居住滿 4 個月以上</Text>
              </View>

            </View>

          </View>

          <View style={[{ width, height }, styles.blackBlock]}>
            <View style={styles.imagecontainer}>
              <Image
                source={require('../../assets/images/searchans.png')}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.header}>國民法官怎麼選？</Text>
              <View style={styles.cdwpr}>
                <View style={styles.circle}>
                  <View style={styles.circle1}>
                    <Text style={styles.paragraph2}>初選名冊</Text>
                  </View>
                </View>
                <View style={styles.dashedLine} />

              </View>
              <View style={styles.square}>
                <View style={styles.square1}>
                  <Text style={styles.paragraph3}>隨機抽選</Text>
                  <Text style={styles.paragraph3}>● 地方政府提出符合條件的國民法官初選名冊</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[{ width, height }, styles.blackBlock]}>
            <View style={styles.imagecontainer}>
              <Image
                source={require('../../assets/images/searchans.png')}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.header}>國民法官怎麼選？</Text>
              <View style={styles.cdwpr}>
                <View style={styles.circle}>
                  <View style={styles.circle1}>
                    <Text style={styles.paragraph2}>複選名冊</Text>
                  </View>
                </View>
                <View style={styles.dashedLine} />

              </View>
              <View style={styles.square}>
                <View style={styles.square1}>
                  <Text style={styles.paragraph3}>組成審核小組</Text>
                  <Text style={styles.paragraph3}>● 排除「不符法定資格」的情形。{'\n'}● 法院通知合格國民，次年度可能擔任國民法官。</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[{ width, height }, styles.blackBlock]}>
            <View style={styles.imagecontainer}>
              <Image
                source={require('../../assets/images/fliter.png')}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </View>


            <View style={styles.wrapper}>
              <Text style={styles.header}>國民法官怎麼選？</Text>
              <View style={styles.cdwpr}>
                <View style={styles.circle}>
                  <View style={styles.circle1}>
                    <Text style={styles.paragraph2}>候選{'\n'}國民法官</Text>
                  </View>
                </View>
                <View style={styles.dashedLine} />

              </View>
              <View style={styles.square}>
                <View style={styles.square1}>
                  <Text style={styles.paragraph3}>● 法院受理案件後，從複選名冊中隨機抽選一定數量之候選國民法官。</Text>
                  <Text style={styles.paragraph3}>● 通知選任期日到庭。</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[{ width, height }, styles.blackBlock]}>
            <View style={styles.imagecontainer}>
              <Image
                source={require('../../assets/images/findans.png')}
                style={styles.imageStyle}
                resizeMode='cover'
              />
            </View>


            <View style={styles.wrapper}>
              <Text style={styles.header}>國民法官怎麼選？</Text>
              <View style={styles.cdwpr}>
                <View style={styles.circle}>
                  <View style={styles.circle1}>
                    <Text style={styles.paragraph2}>國民法官{'\n'}3 結果</Text>
                  </View>
                </View>
                <View style={styles.dashedLineend} />

              </View>
              <View style={styles.square}>
                <View style={styles.square1}> 
                  <Text style={styles.paragraph3}>結果一  不符資格</Text>
                  <Text style={styles.paragraph3}>結果二  符合資格但有權拒絕者拒絕擔任</Text>
                  <Text style={styles.paragraph3}>結果三  符合資格並被抽選到</Text>
                </View>
              </View>
            </View>
          </View>

        </ScrollView>

        <View style={styles.paginationWrapper}>
          {Array.from(Array(6).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
      </SafeAreaView >
    </>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative'
  },
  imageStyle: {
    position: 'absolute',
    top: '120%', // 垂直居中
    left: '50%', // 水平居中
    transform: [
      { translateX: -100 },
      { translateY: -25 },
    ],
  },
  blackBlock: {
    flex: 1, // 占据屏幕高度的 100%
    backgroundColor: '#252525',
    height: '55%', // 占据屏幕高度的 60%
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    top: '70%',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  paragraph: {
    top: '110%',
    fontSize: 17,
    color: 'black',
    fontWeight:'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  listwrapper: {
    bottom: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 13,
  },
  paragraph1: {
    top: '110%',
    fontSize: 20,
    color: 'black',
    fontWeight:'bold',

  },
  circle: {
    width: 125,
    height: 125,
    borderRadius: 75,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',

  },
  circle1: {
    borderWidth: 1.5,
    borderColor: '#252525',
    marginTop: 15,
    marginLeft: 15,
    width: 125,
    height: 125,
    borderRadius: 75,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',

  },
  paragraph2: {
    fontSize: 20,
    color: '#252525',
    textAlign: 'center',
    // lineHeight: 100,
    fontWeight: 'bold',
  },
  dashedLine: {

    flex: 1,
    borderWidth: 1,
    borderColor: '#252525',
    borderStyle: 'dashed',
    marginLeft: 14.5,
    marginRight: 5,
    marginTop: 15,
    position: 'relative',
  },
  cdwpr: {
    width: '100%',
    top: '70%',
    left: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    top: '130%',
    borderRadius: 5,
    width: 320, // 正方形的宽度
    height: 64, // 正方形的高度
    backgroundColor: '#252525', // 正方形的背景颜色
  },
  square1: {
    borderWidth: 1.5,
    borderColor: '#252525',
    marginTop: 15,
    marginLeft: 4,
    borderRadius: 5,

    // top: '130%',
    width: 320, // 正方形的宽度
    height: 64, // 正方形的高度
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
  },
  paragraph3: {
    marginLeft: 9,
    fontSize: 13,
    color: '#252525',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'center',
    // lineHeight: 100,
    fontWeight: 'bold',

  },
  dashedLineend:{
    flex: 1,
    borderWidth: 0,
    borderColor: '#252525',
    borderStyle: 'dashed',
    marginLeft: 14.5,
    marginRight: 5,
    marginTop: 15,
    position: 'relative',
    width: '50%',
    left: 0,
  },
  square3:{
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: '2%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#252525',
    marginLeft: 10,
  },
});


export default IntroductionPage;

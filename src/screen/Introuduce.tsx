import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import FastImage from 'react-native-fast-image';

const IntroductionPage = () => {
  return (
    <View style={styles.container}>
      {/* <FastImage
        source={{
          uri:
            'https://images.unsplash.com/photo-1516673069977-387ccfd9f1b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0aW9uYWwsanVkZ2V8fHx8fHwxNjg1Njg1MzI5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
        }}
        style={styles.image}
      /> */}
      <Text style={styles.title}>國民法官制度是什麼？</Text>
      <Text style={styles.description}>
        國民法官制度，就是由一群來自各行各業的民眾，{'\n'}與法官一起坐在法檯上，共同審判的制度{'\n'}
        國民法官雖然沒有法律背景{'\n'}但可以把不同的生活經驗、價值思考，帶進法庭。{'\n'}
        藉著國民法官的參與，可以讓司法審判更透明{'\n'}讓司法專業與
        外界對話，彼此交流與反思{'\n'}藉此促進國民與法院間的相互理解。
      </Text>
      <Text style={styles.title}>{'\n'}{'\n'}誰可以當國民法官？ </Text>
      <Text style={styles.description}>
        符合「三種」基本資格就有機會擔任國民法官{'\n'}
        ⚫ 年滿 23 歲{'\n'}
        ⚫ 具有中華民國國籍的國民{'\n'}
        ⚫ 在「地方法院管轄區域」連續居住滿 4 個月以上{'\n'}
        *例如臺灣嘉義地方法院的管轄區域為嘉義市與嘉義縣。{'\n'}
      </Text>
      <Text style={styles.title}>{'\n'}{'\n'}國民法官怎麼選？</Text>
      <Text style={styles.description}>
        初選名冊{'\n'}
        隨機抽選{'\n'}
        地方政府提出符合條件的國民法官初選名冊。{'\n'}
        複選名冊{'\n'}
        組成審核小組{'\n'}
        排除「不符法定資格」的情形。{'\n'}
        法院通知合格之國民，次年度可能擔任國民法官。{'\n'}
        候選國民法官{'\n'}
        法院受理案件後，從複選名冊中隨機抽選一定數量之候選國民法官（例如 50
        名）。{'\n'}
        通知選任期日到庭（表明不具資格或有正當理由拒絕參與者，可不到庭）。{'\n'}
        國民法官產生{'\n'}
        於選任期日進行詢問{'\n'}
        結果一 不符資格{'\n'}
結果二 符合資格但有權拒絕者拒絕擔任-{'>'}不選任為國民法官{'\n'}
結果三 符合資格並被抽選到-{'>'}獲選擔任國民法官{'\n'}

      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // 将垂直对齐方式改为居上
    alignItems: 'center', // 水平居中对齐
    paddingTop: 50, // 调整顶部留白，使标题和描述文本上移
  },
  // 其他样式...
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});


export default IntroductionPage;

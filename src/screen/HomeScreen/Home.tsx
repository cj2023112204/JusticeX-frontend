import * as React from "react";
import { Text, StyleSheet, Image, View, StatusBar, FlatList, ActivityIndicator, Platform, TouchableOpacity, Pressable } from "react-native";
import { FontFamily, FontSize, Padding, Color, Border } from "./GlobalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider, color, SearchBar } from "@rneui/base";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import Card from "../../components/Card/Card";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation();
  const Separator = () => <View style={styles.separator} />;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(100);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [tags, setTags] = useState(["全部", "竊盜罪", "殺人罪", "強盜罪", "酒駕致死"]);
  const [selectedTagIndex, setSelectedTagIndex] = useState(0);

  const getItemLayout = (data: any, index: number) => ({
    length: 180, // 这里根据你的列表项高度进行设置
    offset: 180 * index, // 这里根据你的列表项高度进行设置
    index,
  });

  const handleSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  }
  
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log("isLoading changed:", isLoading);
  }, [isLoading]);

  const getData = async () => {
    if (isLoading || isLoadingMore) {
      return;
    }
    setSelectedTagIndex(0);
    setIsLoading(true);
    const nextPage = Math.floor(data.length / 10) + 1;
    const accessToken = await AsyncStorage.getItem('access_token');
    // console.log("hi");
    fetch(`${API_URL}/verdict/get_verdicts/?page=1&is_latest=0`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData((prevData) => [...responseData.data]);        // setPage(page + 1);
        // setTotalPages(responseData.total_pages);
        console.log("Loaded data: ", nextPage);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
        console.log(`load done`);
      });

  };

  const fliter_data = async() =>{
    const accessToken = await AsyncStorage.getItem('access_token');
    fetch(`${API_URL}/verdict/filter_verdicts/?title=竊盜&page=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData((prevData) => [...responseData.data]);        // setPage(page + 1);
        // setTotalPages(responseData.total_pages);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
        console.log(`load done`);
      });
  }

  const loadMoreData = async () => {
    if (isLoading || isLoadingMore || page >= totalPages) {
      // 如果正在加载或者已加载所有数据，或者当前页大于等于总页面数，就不再加载数据
      return;
    }
    const nextPage = page + 1;
    const accessToken = await AsyncStorage.getItem('access_token');

    setIsLoading(true);
    fetch(`${API_URL}/verdict/get_verdicts/?page=${page}&is_latest=0`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData((prevData) => [...prevData, ...responseData.data]);
        setPage(nextPage);
        // setTotalPages(responseData.total_pages);
        console.log("Loaded data: ", nextPage);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

  };

  const handleTagSearch = async (tagIndex: number) => {
    if (isLoading || isLoadingMore) {
      return;
    }
    setIsLoading(true);
    setSelectedTagIndex(tagIndex);

    const selectedTag = tags[tagIndex];

    if (selectedTag === "全部") {
      getData();
    } else if (selectedTag === "竊盜罪") {
      const accessToken = await AsyncStorage.getItem('access_token');
      fetch(`${API_URL}/verdict/get_crime_verdicts/?crime_id=1&page=1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setData([...responseData.data]);
          console.log('Data:', 1);
        })
        .catch((error) => {
          console.error('API 请求错误:', error);
        })
        .finally(() => {
          setIsLoading(false); // 设置isLoading为false，无论请求成功或失败
        });
    } else if (selectedTag === "殺人罪") {
      const accessToken = await AsyncStorage.getItem('access_token');
      fetch(`${API_URL}/verdict/get_crime_verdicts/?crime_id=2&page=1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setData([...responseData.data]);
          console.log('Data:', 1);
        })
        .catch((error) => {
          console.error('API 请求错误:', error);
        })
        .finally(() => {
          setIsLoading(false); // 设置isLoading为false，无论请求成功或失败
        });
    }
    else if (selectedTag === "強盜罪") {
      const accessToken = await AsyncStorage.getItem('access_token');
      fetch(`${API_URL}/verdict/get_crime_verdicts/?crime_id=3&page=1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setData([...responseData.data]);
          console.log('Data:', 1);
        })
        .catch((error) => {
          console.error('API 请求错误:', error);
        })
        .finally(() => {
          setIsLoading(false); // 设置isLoading为false，无论请求成功或失败
        });
    }
    else if (selectedTag === "酒駕致死") {
      const accessToken = await AsyncStorage.getItem('access_token');
      fetch(`${API_URL}/verdict/get_crime_verdicts/?crime_id=4&page=1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setData([...responseData.data]);
          console.log('Data:', 1);
        })
        .catch((error) => {
          console.error('API 请求错误:', error);
        })
        .finally(() => {
          setIsLoading(false); // 设置isLoading为false，无论请求成功或失败
        });
    }
    else {
      console.log(`點擊了標籤: ${selectedTag}`);
      setIsLoading(false);
    }

  };

  const CardItem = React.memo(({ item, index }: { item: any, index: number }) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        style={{ flex: 1, alignItems: "center", paddingTop: 21, paddingBottom: 10 }}
        onPress={() => navigation.navigate('Verdict', { verdictId: item.verdict_id } )}
      >
        <Card
          title={item.title}
          date={item.judgement_date}
          crime_type={item.crime_type}
          likes={item.total_like}
          total_comment={item.total_comment}
        />
      </TouchableOpacity>
    );
  });


  return (
    <View style={styles.home}>

      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        </View>
      )}

      <View style={[styles.parent, styles.tabFlexBox]}>
        <TextInput
          style={[styles.text, styles.textTypo1]}
          inputMode="text"
          placeholder="搜尋判例"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
        <MaterialCommunityIcons
          style={styles.cocoboldsearchIcon}
          size={24}
          name="magnify"
        />
      </View>
      <Divider style={[styles.dividerIcon]}></Divider>
      <View style={{ height: 130 }}>
        <FlatList
          contentContainerStyle={styles.tagContainer}
          data={tags}
          horizontal={true}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <Pressable
              style={[styles.tag, index === selectedTagIndex && styles.selectedTag,]}
              onPress={() => handleTagSearch(index)}
            >
              <Text style={[styles.tagText, index === selectedTagIndex && styles.selectedTagText]}>{item}</Text>
            </Pressable>
          )}
        />
      </View>

      <FlatList
        ListEmptyComponent={<Text>No data available</Text>}
        data={data}
        renderItem={({ item, index }) => (<CardItem item={item} index={index} />)}
        keyExtractor={(item, index) => `${item.verdict_id}-${index}`}
        initialNumToRender={30}
        maxToRenderPerBatch={1}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={Separator}
        onEndReached={loadMoreData}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        extraData={[data, /* other relevant data */]}
        // contentContainerStyle={[styles.card, styles.scrollView]}
        getItemLayout={getItemLayout}
        removeClippedSubviews
      />
    </View>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingVertical: 10,
    width: "100%",
  },
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
    height: 30,
    width: 30,
  },
  dividerIconPosition: {
    width: 390,
    left: 0,
    position: "absolute",
  },
  cardSpaceBlock: {
    padding: Padding.p_xl,
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
    right: 10
  },
  parent: {
    top: 24,
    left: 35,
    borderRadius: 6,
    backgroundColor: Color.grey4,
    width: 335,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    position: "absolute",
  },
  dividerIcon: {

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
    // marginTop: 73,
    // left: 10,
    flex: 1,
    zIndex: 1,
    // padding: Padding.p_xl,
    position: "absolute",
    backgroundColor: Color.themeWhiteDefault,
    height: "auto",
    // height:100,
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
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: '#ccc',
    ...Platform.select({
      ios: {
        marginLeft: 16,
      },
      android: {
        paddingLeft: 16,
      },
    }),
  },
  tag: {
    // top: 93,
    // marginTop:13,
    backgroundColor: Color.grey3,
    paddingHorizontal: 10,  // 標籤的水平內邊距
    paddingVertical: 5,   // 標籤的垂直內邊距
    borderRadius: 20,     // 圓角半徑，使其呈現圓形外觀
    margin: 10,           // 標籤之間的外邊距
    height: 30,
  },
  tagText: {
    color: Color.black1,      // 文本顏色
    fontSize: 14,        // 文本字體大小
    fontWeight: 'bold',  // 文本粗細
  },
  tagContainer: {
    position: 'absolute',
    top: 79, // 调整这个值以达到期望的位置
    // zIndex: 0,
    flexDirection: 'row', // 水平排列标签
    alignItems: 'center', // 居中标签
    paddingHorizontal: 10,
    paddingVertical: 5,
    // height:30,
    backgroundColor: 'transparent', // 使背景透明
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // 设置z-index确保它在顶部
  },
  selectedTag: {
    backgroundColor: Color.black1,
    paddingHorizontal: 10,  // 標籤的水平內邊距
    paddingVertical: 5,   // 標籤的垂直內邊距
    borderRadius: 20,     // 圓角半徑，使其呈現圓形外觀
    margin: 10,           // 標籤之間的外邊距
    height: 30,
  },
  selectedTagText:{
    color: Color.grey4,      // 文本顏色
    fontSize: 14,        // 文本字體大小
    fontWeight: 'bold',
  },
});

export default Home;
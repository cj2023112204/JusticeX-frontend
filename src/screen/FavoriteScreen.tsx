import React, { useEffect, useState } from 'react';
import { FlatList,Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Article from './Article';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';
import Card from "../components/Card/Card";

interface Article {
  verdict_id: number;
  title: string;
  judgement_date: string;
  total_like: number;
  total_comment: number;
  crime_type: string;
}

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLatest, setIsLatest] = useState(0);
  const [searchText, setSearchText] = useState('');
  const Separator = () => <View style={styles.separator} />;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = React.useState<any[]>([]);

  const getItemLayout = (data: any, index: number) => ({
    length: 180, // 这里根据你的列表项高度进行设置
    offset: 180 * index, // 这里根据你的列表项高度进行设置
    index,
  });

  useEffect(() => {
    fetchArticles(currentPage, isLatest);
  }, [currentPage, isLatest]);

  const fetchArticles = (page: number, isLatest: number) => {
    const checkLoginStatus = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      fetch(`${API_URL}/account/collect_list/?page=${page}&is_latest=${isLatest}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
        .then(response => response.json())
        .then(responseData => {
          const data = responseData.data;
          const uniqueData = data.filter((item: Article) => !articles.some(article => article.verdict_id === item.verdict_id));
          setArticles(prevArticles => [...prevArticles, ...uniqueData]);
        })
        .catch(error => {
          console.error(error);
        });
    };
    checkLoginStatus();
  };


  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderArticleItem = ({ item }: { item: Article }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Comment', { verdictId: item.verdict_id })}>
        <View style={styles.articleContainer}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 14 }}>{item.judgement_date}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 8 }}>Like: {item.total_like}</Text>
              <Text>Comment: {item.total_comment}</Text>
            </View>
            <Text style={styles.crimeTypeLabel}>{item.crime_type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
    <View style={styles.container}>
      {/* <FlatList
        data={filteredArticles}
        renderItem={renderArticleItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      /> */}
<FlatList
        ListEmptyComponent={<Text>No data available</Text>}
        data={filteredArticles}
        renderItem={({ item, index }) => (<CardItem item={item} index={index} />)}
        keyExtractor={(item, index) => `${item.verdict_id}-${index}`}
        initialNumToRender={30}
        maxToRenderPerBatch={1}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={Separator}
        // onEndReached={loadMoreData}
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
  container: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  activeCategoryButton: {
    backgroundColor: '#2196F3',
  },
  categoryButtonText: {
    color: '#666',
  },
  activeCategoryButtonText: {
    color: '#fff',
  },
  searchBar: {
    marginBottom: 16,
  },
  articleListContainer: {
    paddingBottom: 16,
  },
  loadMoreButton: {
    alignItems: 'center',
    padding: 16,
  },
  loadMoreButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
  crimeTypeLabel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#2196F3',
    borderRadius: 4,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  articleContainer: {
    marginBottom: 16,
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
});


export default FavoriteScreen;
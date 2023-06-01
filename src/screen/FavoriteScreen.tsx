import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Article from './Article';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentList from './Comment';
import { API_URL } from '../../config';

interface Article {
  verdict_id: number;
  title: string;
  judgement_date: string;
}

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLatest, setIsLatest] = useState(0);
  const [searchText, setSearchText] = useState('');

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
          setArticles(prevArticles => [...prevArticles, ...data]);
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
      <TouchableOpacity onPress={() => navigation.navigate('Comment' as never)}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 14 }}>{item.judgement_date}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={filteredArticles}
        renderItem={renderArticleItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    height: 56,
    width: '100%',
  },
  categoryBar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  activeCategoryButtonText: {
    color: 'black',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activePaginationButton: {
    backgroundColor: 'black',
  },
  paginationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  pageNumberButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumberText: {
    color: 'white',
  },
});

export default FavoriteScreen;

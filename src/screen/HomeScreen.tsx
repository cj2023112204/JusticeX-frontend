import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Article from './Article';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentList from './Comment';
import { API_URL } from '../../config';

const categories = [
  { id: 1, name: '熱門判例' },
  { id: 2, name: '最新判例' },
];

interface Article {
  verdict_id: number;
  title: string;
  judgement_date: string;
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLatest, setIsLatest] = useState(0);

  useEffect(() => {
    fetchArticles(currentPage, isLatest);
  }, [isLatest]);

  const fetchArticles = (page: number, isLatest: number) => {
    const checkLoginStatus = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      fetch(`${API_URL}/verdict/get_verdicts/?page=${page}&is_latest=${isLatest}`, {
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

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchArticles(nextPage, isLatest);
    setCurrentPage(nextPage);
  };

  const handleCategoryPress = (category: any) => {
    setActiveCategory(category);
    setIsLatest(category.id === 2 ? 1 : 0);
    setArticles([]); // 清空articles数组
  };

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
      <SearchBar
        placeholder="Search here"
        onChangeText={(text) => console.log(text)}
      />
      <View style={styles.categoryBar}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory.id === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory.id === category.id && styles.activeCategoryButtonText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  searchbar: {
    height: 56,
    width: 359,
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
});

export default HomeScreen;
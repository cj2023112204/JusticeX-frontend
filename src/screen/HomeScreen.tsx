import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, name: '熱門判例' },
  { id: 2, name: '最新判例' },
];

interface Article {
  verdict_id: number;
  title: string;
  judgement_date: string;
  total_like: number;
  total_comment: number;
  crime_type: string;
}
const Separator = () => <View style={styles.separator} />;
const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
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
      fetch(`${API_URL}/verdict/get_verdicts/?page=${page}&is_latest=${isLatest}`, {
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

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchArticles(nextPage, isLatest);
  };

  const handleCategoryPress = (category: any) => {
    setActiveCategory(category);
    setIsLatest(category.id === 2 ? 1 : 0);
    setArticles([]);
    setCurrentPage(1);
    fetchArticles(1, category.id === 2 ? 1 : 0); // Fetch articles immediately when category is changed
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
    if (text === '') {
      setFilteredArticles(articles); // 將過濾後的文章設置為原始文章列表
    } else {
      const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredArticles(filteredArticles);
    }
    fetchArticles(1, isLatest); // 發送網路請求以獲取符合搜尋文字的結果的第一頁
  };

  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredArticles(articles);
    } else {
      const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredArticles(filteredArticles);
    }
  }, [searchText, articles]);


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

  const renderLoadMoreButton = () => {
    if (filteredArticles.length > 0) {
      const totalPages = Math.ceil(filteredArticles.length / 10);
      const hasNextPage = currentPage < totalPages;

      if (hasNextPage) {
        return (
          <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </TouchableOpacity>
        );
      }
    }

    return null;
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchArticles(nextPage, isLatest);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchText('');
      setFilteredArticles([]);
      setCurrentPage(1);
      fetchArticles(1, isLatest);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category)}
            style={[styles.categoryButton, activeCategory.id === category.id && styles.activeCategoryButton]}
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
      <SearchBar
        placeholder="Search"
        onPressToFocus={true}
        onChangeText={handleSearch}
        style={styles.searchBar}
        fontColor="#666"
        iconColor="#666"
        shadowColor="#333"
      />
      <FlatList
        data={filteredArticles}
        renderItem={renderArticleItem}
        keyExtractor={(item, index) => `${item.verdict_id}-${index}`}
        contentContainerStyle={styles.articleListContainer}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={renderLoadMoreButton}
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

export default HomeScreen;

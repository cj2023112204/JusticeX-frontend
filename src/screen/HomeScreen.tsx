import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Article from './Article';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentList from './Comment';
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
}

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
          setArticles(prevArticles => [...prevArticles, ...data]);
        })
        .catch(error => {
          console.error(error);
        });
    };
    checkLoginStatus();
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    fetchArticles(nextPage, isLatest);
    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    fetchArticles(prevPage, isLatest);
    setCurrentPage(prevPage);
  };

  const handlePageChange = (pageNumber: number) => {
    fetchArticles(pageNumber, isLatest);
    setCurrentPage(pageNumber);
  };

  const handleCategoryPress = (category: any) => {
    setActiveCategory(category);
    setIsLatest(category.id === 2 ? 1 : 0);
    setArticles([]);
    setCurrentPage(1); // 重置为第一页
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
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

  const renderPagination = () => {
    if (filteredArticles.length > 0) {
      const totalPages = Math.ceil(filteredArticles.length / 10); // 假设每页显示10个文章
      const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
      const visiblePageNumbers = pageNumbers.slice(Math.max(currentPage - 2, 0), currentPage + 3);

      const renderPageNumbers = visiblePageNumbers.map(pageNumber => (
        <TouchableOpacity
          key={pageNumber}
          style={[
            styles.paginationButton,
            currentPage === pageNumber && styles.activePaginationButton,
            styles.pageNumberButton,
          ]}
          onPress={() => handlePageChange(pageNumber)}
        >
          <Text
            style={[
              styles.paginationButtonText,
              currentPage === pageNumber && styles.activePaginationButtonText,
              styles.pageNumberText,
            ]}
          >
            {pageNumber}
          </Text>
        </TouchableOpacity>
      ));

      return (
        <View style={styles.paginationContainer}>
          {currentPage > 1 && (
            <TouchableOpacity
              style={[styles.paginationButton, styles.pageNumberButton]}
              onPress={handlePrevPage}
            >
              <Text style={[styles.paginationButtonText, styles.pageNumberText]}>Prev</Text>
            </TouchableOpacity>
          )}
          {visiblePageNumbers[0] > 1 && (
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePageChange(visiblePageNumbers[0] - 1)}
            >
              <Text style={styles.paginationButtonText}>...</Text>
            </TouchableOpacity>
          )}
          {renderPageNumbers}
          {visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages && (
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePageChange(visiblePageNumbers[visiblePageNumbers.length - 1] + 1)}
            >
              <Text style={styles.paginationButtonText}>...</Text>
            </TouchableOpacity>
          )}
          {currentPage < totalPages && (
            <TouchableOpacity
              style={[styles.paginationButton, styles.pageNumberButton]}
              onPress={handleNextPage}
            >
              <Text style={[styles.paginationButtonText, styles.pageNumberText]}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search here"
        onChangeText={handleSearch}
        style={styles.searchbar}
      />
      <View style={styles.categoryBar}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { width: width / categories.length },
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
        data={filteredArticles}
        renderItem={renderArticleItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      />
      {renderPagination()}
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

export default HomeScreen;

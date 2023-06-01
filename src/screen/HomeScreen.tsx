import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Article from './Article';
import { useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CommentList from './Comment';

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

  useEffect(() => {
    fetchArticles(currentPage);
  }, []);
  const fetchArticles= (page: number) => {
    fetch(`http://13.208.146.112:8000/api/verdict/get_verdicts/?page=${page}&is_latest=0`, {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MDI0NjQ1LCJpYXQiOjE2ODI0ODg2NDUsImp0aSI6IjA0MjljMTdiNzg2MDQyNzU4MzJiZTJjYWM2ODU4MTZlIiwidXNlcl9pZCI6ImV4YW1wbGVAZXhhbXBsZS5jb20ifQ.yAE_l0hSX5ygOyeZrZaHmw-OspVUZcLU5-t0dIYNdqw',
        // 其他標頭欄位...
      }
    })
      .then(response => response.json())
      .then(responseData => {
        const data = responseData.data; // 取得回應資料的 data 屬性
        setArticles(prevArticles => [...prevArticles, ...data]); // 將 data 設定給 articles 狀態
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchArticles(nextPage);
    setCurrentPage(nextPage);
  };
  // const handleArticlePress = (item: any) => {
  //   navigation.navigate('Comment', { article: item });
  // };

  const renderArticleItem = ({ item }: { item: Article }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('Comment' as never)}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 14 }}>{item.judgement_date}</Text>
        </View>
      </TouchableOpacity>

    );
  };


  return (
    <View style={style.container}>
      <SearchBar
        placeholder="Search here"
        onChangeText={(text) => console.log(text)}
      />
      <View style={style.categoryBar}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              style.categoryButton,
              activeCategory.id === category.id && style.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                style.categoryButtonText,
                activeCategory.id === category.id && style.activeCategoryButtonText,
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
        keyExtractor={item => item.verdict_id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  searchbar: {
    height: 56,
    width: 359
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
})
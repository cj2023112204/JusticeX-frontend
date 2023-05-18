import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Article from './Article';
import { useState } from 'react';

const categories = [
  { id: 1, name: '熱門文章' },
  { id: 2, name: '最新文章' },
];
interface Article {
  verdict_id: number;
  title: string;
  judgement_date: string;
}


const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [articles, setArticles] = useState<Article[]>([]);
  React.useEffect(() => {
    fetch('http://13.208.146.112:8000/api/verdict/get_verdicts/', {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MDI0NjQ1LCJpYXQiOjE2ODI0ODg2NDUsImp0aSI6IjA0MjljMTdiNzg2MDQyNzU4MzJiZTJjYWM2ODU4MTZlIiwidXNlcl9pZCI6ImV4YW1wbGVAZXhhbXBsZS5jb20ifQ.yAE_l0hSX5ygOyeZrZaHmw-OspVUZcLU5-t0dIYNdqw',
        // 其他標頭欄位...
      }
    })
      .then(response => response.json())
      .then(responseData => {
        const data = responseData.data; // 取得回應資料的 data 屬性
        setArticles(data); // 將 data 設定給 articles 狀態
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderArticleItem = ({ item }: { item: Article}) => {
    return (
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ fontSize: 14 }}>{item.judgement_date}</Text>
      </View>
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
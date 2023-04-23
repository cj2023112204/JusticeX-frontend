import * as React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Article from './Article';
import { useState } from 'react';

const categories = [
    { id: 1, name: '熱門文章' },
    { id: 2, name: '最新文章' },
  ];
  

const HomeScreen = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [articles, setArticles] = useState([]);
    return(
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

            <ScrollView>
                <Article title="Article 1" date="2021/01/05" />
                <Article title="Article 2" author="Jane Smith" />
                <Article title="Article 3" author="Bob Johnson" />
                <Article title="Article 4" author="Samantha Lee" />
                <Article title="Article 5" author="Alex Kim" />
                <Article title="Article 6" author="Mike Brown" />
                <Article title="Article 7" author="Emily Chen" />
                <Article title="Article 8" author="David Lee" />
                <Article title="Article 9" author="Sarah Johnson" />
                <Article title="Article 10" author="Chris Smith" />
                </ScrollView>
        </View>
    );
};

export default HomeScreen

const style = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
    },
    searchbar:{
        height: 56,
        width:359
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
import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Comment = ({ route }: any) => {

  const [years, setYears] = useState(1);
  const [months, setMonths] = useState(0);
  const [message, setMessage] = useState('');
  const verdictId = route.params.verdictId;
  const navigation: any = useNavigation();
  const yearsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20];

  const monthsOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // const showcomment = ()=>{
  //   console.log(message)
  // }

  const handleCommentSubmit = async ( event: any) => {
    event.persist();
    console.log('12312312312312312323',verdictId);
    try {
      const totalMonths = years * 12 + months;
      const accessToken = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/comment/add_comment/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verdict_id: verdictId,
          content: message,
          is_money_related: '1',
          is_abandoned: '0',
          is_indoor: '1',
          is_destructive: '1',
          is_group_crime: '0',
          is_transportation_used: '1',
          has_criminal_record: '1',
          is_income_tool: '0',
          month: totalMonths,
          crime_id: 1
        }),
      });
      navigation.navigate('Verdict' as never, { verdictId } as never)
      const data = await response.json();
      console.log(data);
      // Refresh comments
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>請選擇刑期:</Text>

      <Text style={styles.text}>刑期年數:</Text>
      <Picker style={styles.picker}
        selectedValue={years}
        onValueChange={(itemValue) => setYears(itemValue)}
      >
        {yearsOptions.map(y =>
          <Picker.Item key={y} label={y + '年'} value={y} />
        )}
      </Picker>

      <Text style={styles.text}>刑期月數:</Text>
      <Picker style={styles.picker}
        selectedValue={months}
        onValueChange={(itemValue) => setMonths(itemValue)}
      >
        {monthsOptions.map(m =>
          <Picker.Item key={m} label={m + '個月'} value={m} />
        )}
      </Picker>

      <TextInput
        placeholder="請輸入留言"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCommentSubmit}
      >
        <Text>確認留言</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={showcomment}
      >
        <Text>確認留言</Text>
      </TouchableOpacity> */}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginVertical: 8
  },
  button: {
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 4,
    marginTop: 12
  },
  text: {
    fontSize: 16,
    color: '#333'
  }
})

export default Comment
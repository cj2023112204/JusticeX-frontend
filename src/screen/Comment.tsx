import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../../config';

const VerdictScreen = () => {
  const navigation = useNavigation();
  const [incidentType, setIncidentType] = useState('incident');
  const [verdictData, setVerdictData] = useState(null);

  useEffect(() => {
    fetchVerdictData();
  }, []);

  const fetchVerdictData = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    fetch(`${API_URL}/verdict/get_verdict/?verdict_id=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
      .then(response => response.json())
      .then(responseData => {
        setVerdictData(responseData.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleToggleIncidentType = () => {
    setIncidentType(incidentType === 'incident' ? 'incident_lite' : 'incident');
  };

  if (!verdictData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleToggleIncidentType}>
        <Text style={styles.translationText}>
          {incidentType === 'incident' ? '切換案件類型' : 'Switch Incident Type'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.verdictContainer}>
        <Text style={styles.title}>判例標題:</Text>
        <Text style={styles.verdictTitle}>{verdictData.title}</Text>
      </View>
      <View style={styles.verdictContainer}>
        <Text style={styles.title}>判例內文:</Text>
        <Text style={styles.verdictData}>{verdictData[incidentType]}</Text>
      </View>
      <CommentList />
    </ScrollView>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        {/* 在這裡顯示頭像 */}
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <View style={styles.likeDislikeContainer}>
        </View>
        <Button title="回覆" />
        {comment.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {comment.replies.map((reply) => (
              <View key={reply.reply_id} style={styles.replyContainer}>
                <Text style={styles.replyText}>{reply.reply}</Text>
                <Text style={styles.replyInfo}>{`By: ${reply.reply_email}`}</Text>
                <Text style={styles.replyInfo}>{`Time: ${reply.reply_create_time}`}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const CommentList = () => {
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await fetch(`${API_URL}/comment/get_comments/?verdict_id=1`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setComments(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return (
    <View>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={(item) => item.comment_id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="輸入留言..." />
        <Button title="發送" onPress={() => { }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  translationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textDecorationLine: 'underline', // 添加下划线效果
  },
  verdictContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  verdictTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  verdictData: {
    fontSize: 16,
    lineHeight: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
    justifyContent: 'center',
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  likeDislikeContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  likeDislikeText: {
    marginRight: 10,
  },
  repliesContainer: {
    marginTop: 10,
  },
  replyContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 5,
  },
  replyText: {
    fontSize: 14,
    marginBottom: 5,
  },
  replyInfo: {
    fontSize: 12,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default VerdictScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { API_URL } from '../../config';

const VerdictScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const verdictId = route.params?.verdictId; // Access the verdictId parameter from the route
  const [incidentType, setIncidentType] = useState('incident');
  const [verdictData, setVerdictData] = useState(null);

  useEffect(() => {
    fetchVerdictData();
  }, []);

  const fetchVerdictData = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    fetch(`${API_URL}/verdict/get_verdict/?verdict_id=${verdictId}`, { // Use the verdictId in the URL
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setVerdictData(responseData.data);
      })
      .catch((error) => {
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
      <View style={styles.verdictContainer}>
        <Text style={styles.verdictTitle}>{verdictData.title}</Text>
        <Text style={styles.verdictData}>{verdictData[incidentType]}</Text>
      </View>

      <View style={styles.separator}></View>

      <TouchableOpacity onPress={handleToggleIncidentType} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {incidentType === 'incident' ? '切換案件類型' : 'Switch Incident Type'}
        </Text>
      </TouchableOpacity>

      <View style={styles.separator}></View>

      <CommentList verdictId={verdictId} />
    </ScrollView>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        {/* Display avatar here */}
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <View style={styles.commentInfoContainer}>
          <Text style={styles.commentInfoText}>{`By: ${comment.commenter}`}</Text>
          <Text style={styles.commentInfoText}>{`Time: ${comment.time}`}</Text>
        </View>
        <View style={styles.likeDislikeContainer}></View>
        <Button title="Reply" />
        {comment.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {comment.replies.map((reply) => (
              <View key={reply.reply_id} style={styles.replyContainer}>
                <Text style={styles.replyText}>{reply.reply}</Text>
                <View style={styles.replyInfoContainer}>
                  <Text style={styles.replyInfoText}>{`By: ${reply.replyer}`}</Text>
                  <Text style={styles.replyInfoText}>{`Time: ${reply.time}`}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const CommentList = ({ verdictId }) => {
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await fetch(`${API_URL}/comment/get_comments/?verdict_id=${verdictId}`, {
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
        <TextInput style={styles.input} placeholder="Enter comment..." />
        <Button title="Send" onPress={() => {}} />
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
  verdictContainer: {
    marginBottom: 16,
  },
  verdictTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  verdictData: {
    fontSize: 16,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 16,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentInfoContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentInfoText: {
    fontSize: 12,
    color: 'gray',
    marginRight: 10,
  },
  likeDislikeContainer: {
    flexDirection: 'row',
    marginBottom: 5,
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
  replyInfoContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  replyInfoText: {
    fontSize: 12,
    color: 'gray',
    marginRight: 10,
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

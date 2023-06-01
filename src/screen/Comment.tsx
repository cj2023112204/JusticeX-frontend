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
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [liked, setLiked] = useState(false); // Add the 'liked' state variable
  const [bookmarked, setBookmarked] = useState(false);

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
        setLikesCount(responseData.data.total_like);
        setCommentsCount(responseData.data.total_comment);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleIncidentType = () => {
    setIncidentType(incidentType === 'incident' ? 'incident_lite' : 'incident');
  };

  const handleCommentSubmit = async (comment) => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/comment/add_comment/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verdict_id: verdictId,
          content: comment,
        }),
      });
      const data = await response.json();
      console.log(data);
      // Refresh comments
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeVerdict = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const url = liked ? `${API_URL}/verdict/unlike_verdict/` : `${API_URL}/verdict/like_verdict/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verdict_id: verdictId,
        }),
      });
      const data = await response.json();
      console.log(data);
      // Refresh likes count
      fetchVerdictData();

      if (data.is_liked) {
        // Like was successful
        setLiked(true);
      } else {
        // Like was canceled
        setLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmarkVerdict = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const url = `${API_URL}/verdict/collect_verdict/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verdict_id: verdictId,
        }),
      });
      const data = await response.json();
      console.log(data);

      // Update bookmarked state
      setBookmarked(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (!verdictData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.verdictContainer}>
        <Text style={styles.verdictTitle}>{verdictData.title}</Text>
        <Text style={styles.verdictData}>{verdictData[incidentType]}</Text>
      </View>

      <View style={styles.separator}></View>

      <TouchableOpacity onPress={handleToggleIncidentType} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {incidentType === 'incident' ? '查看簡化判例' : '查看原始判例'}
        </Text>
      </TouchableOpacity>

      <View style={styles.separator}></View>

      <View style={styles.likesCommentsContainer}>
        <TouchableOpacity onPress={handleLikeVerdict}>
          <Text style={[styles.likeButton, liked ? { color: 'white' } : null]}>❤️ Like</Text>
        </TouchableOpacity>
        <Text style={styles.likesCount}>{likesCount} likes</Text>
        <Text style={styles.commentsCount}>{commentsCount} comments</Text>
        <TouchableOpacity onPress={handleBookmarkVerdict}>
          <Text style={styles.bookmarkButton}>
            {bookmarked ? '🔖' : '🔖'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator}></View>

      <CommentList verdictId={verdictId} handleCommentSubmit={handleCommentSubmit} />
    </View>
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
          <Text style={styles.commentInfoText}>{`By: ${comment.comment_email}`}</Text>
          <Text style={styles.commentInfoText}>{`Time: ${comment.comment_create_time}`}</Text>
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

const CommentList = ({ verdictId, handleCommentSubmit }) => {
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

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

  const handleSendComment = () => {
    if (commentText.trim() !== '') {
      handleCommentSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <View>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={(item) => item.comment_id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter comment..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <Button title="Send" onPress={handleSendComment} />
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
  likesCommentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  likeButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  likesCount: {
    fontSize: 16,
    marginRight: 8,
  },
  commentsCount: {
    fontSize: 16,
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
    marginLeft: 20,
  },
  replyContainer: {
    marginBottom: 10,
  },
  replyText: {
    fontSize: 14,
    marginBottom: 5,
  },
  replyInfoContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  replyInfoText: {
    fontSize: 12,
    color: 'gray',
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bookmarkButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 100,
  },
});

export default VerdictScreen;

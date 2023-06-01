import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const CommentItem = ({ comment }) => {

  return (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        {/* 在這裡顯示頭像 */}
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{comment.content}</Text>
        <View style={styles.likeDislikeContainer}>
          <Text style={styles.likeDislikeText}>Like: {comment.like}</Text>
          <Text style={styles.likeDislikeText}>Dislike: {comment.dislike}</Text>
        </View>
        <Button title="回覆" />
      </View>
    </View>
  );
};

const CommentList = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      drawerLabel: () => null, // Hide the drawer label for this screen
    });
  }, [navigation]);

  useEffect(
    React.useCallback(() => {
      const parentNavigation = navigation.getParent();
      if (parentNavigation) {
        parentNavigation.setOptions({
          drawerLockMode: 'locked-closed', // Hide the drawer for this screen
        });
      }

      return () => {
        if (parentNavigation) {
          parentNavigation.setOptions({
            drawerLockMode: 'unlocked', // Restore drawer visibility when leaving this screen
          });
        }
      };
    }, [navigation])
  );

  const comments = [
    {
      id: 1,
      content: '殺人又竊盜的，這應該要判死刑吧',
      like: 5,
      dislike: 2,
    },
    {
      id: 2,
      content: '判死刑不是唯一，犯人擁有精神疾病，可能需要先就醫評估精神狀況',
      like: 3,
      dislike: 1,
    },
    {
      id: 3,
      content: '這種人應與世隔絕！最好關到死！！',
      like: 1,
      dislike: 0,
    },
  ];

  //   const handleReply = (commentId) => {
  //     // 處理回覆按鍵的邏輯
  //   };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={(item) => item.id.toString()}
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
    padding: 10,
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

export default CommentList;

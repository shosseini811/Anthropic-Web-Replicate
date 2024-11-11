import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const flatListRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!textInput.trim()) return;
    
    const newMessage = { text: textInput, user: 'user' };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTextInput('');

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message: textInput, 
          history: newMessages  // Changed from messages to newMessages to include the current message
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages(data.history);

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { 
        text: "Error: Could not connect to the server. Please try again.", 
        user: 'error' 
      }]);
    }
  };

  const renderMessage = ({ item, index }) => {
    const isUser = item.user === 'user';
    const isError = item.user === 'error';

    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.assistantMessage,
        isError && styles.errorMessage
      ]}>
        <Text style={[
          styles.messageUser,
          isUser ? styles.userLabel : styles.assistantLabel
        ]}>
          {item.user}:
        </Text>
        <Text style={[
          styles.messageText,
          isUser ? styles.userText : styles.assistantText
        ]}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={textInput} 
          onChangeText={setTextInput} 
          placeholder="Type your message..."
          multiline
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    marginLeft: '15%',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
    marginRight: '15%',
  },
  errorMessage: {
    backgroundColor: '#FFE5E5',
    alignSelf: 'center',
  },
  messageUser: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userLabel: {
    color: '#fff',
  },
  assistantLabel: {
    color: '#666',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  assistantText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    maxHeight: 100,
  },
});

export default App;
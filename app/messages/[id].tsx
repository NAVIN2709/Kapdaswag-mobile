import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

export const navigationOptions = {
  headerShown: false,
};

// Utility to format timestamp
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = hours % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

const initialMessages = [
  { id: '1', sender: 'them', text: 'Hey!', timestamp: Date.now() - 1000000 },
  { id: '2', sender: 'me', text: 'Hi, how are you?', timestamp: Date.now() - 900000 },
  { id: '3', sender: 'them', text: 'Doing well, you?', timestamp: Date.now() - 850000 },
  { id: '4', sender: 'me', text: 'Pretty good, just chilling.', timestamp: Date.now() - 800000 },
  { id: '5', sender: 'them', text: 'What did you do today?', timestamp: Date.now() - 750000 },
  { id: '6', sender: 'me', text: 'Worked on a React Native app.', timestamp: Date.now() - 700000 },
  { id: '7', sender: 'them', text: 'Sounds cool! What feature?', timestamp: Date.now() - 650000 },
  { id: '8', sender: 'me', text: 'A swipe-based card interface.', timestamp: Date.now() - 600000 },
  { id: '9', sender: 'them', text: 'Nice. Used Tailwind too?', timestamp: Date.now() - 550000 },
  { id: '10', sender: 'me', text: 'Yup, with NativeWind. Looks clean.', timestamp: Date.now() - 500000 },
  { id: '11', sender: 'them', text: 'Great combo!', timestamp: Date.now() - 450000 },
  { id: '12', sender: 'me', text: 'Thanks! What about you?', timestamp: Date.now() - 400000 },
  { id: '13', sender: 'them', text: 'Just debugging a modal issue.', timestamp: Date.now() - 350000 },
  { id: '14', sender: 'me', text: 'Those can be tricky.', timestamp: Date.now() - 300000 },
  { id: '15', sender: 'them', text: 'Yeah, especially with state management.', timestamp: Date.now() - 250000 },
  { id: '16', sender: 'me', text: 'Redux or Context?', timestamp: Date.now() - 200000 },
  { id: '17', sender: 'them', text: 'Using Zustand lately.', timestamp: Date.now() - 150000 },
  { id: '18', sender: 'me', text: 'Oh nice, lightweight and clean.', timestamp: Date.now() - 100000 },
  { id: '19', sender: 'them', text: 'Exactly why I like it.', timestamp: Date.now() - 50000 },
  { id: '20', sender: 'me', text: 'Let me know if you need help.', timestamp: Date.now() - 10000 },
];

export default function DM() {
  type Message = {
    id: string;
    sender: 'me' | 'them';
    text: string;
    timestamp: number;
  };

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages.sort((a, b) => a.timestamp - b.timestamp));
  const [text, setText] = useState('');
  const handleSend = () => {
    if (!text.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text,
      timestamp: Date.now(),
    };
    const updated = [...messages, newMessage].sort((a, b) => a.timestamp - b.timestamp);
    setMessages(updated);
    setText('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
  <View
    style={[
      styles.messageBubble,
      item.sender === 'me' ? styles.myMessage : styles.theirMessage,
    ]}
  >
    <Text style={styles.messageText}>{item.text}</Text>
    <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 12 }}>
            <FontAwesome name="arrow-left" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat with {id}</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Messages */}
        <FlatList
          data={[...messages].reverse() as any[]} // Latest at bottom
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
          inverted
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message..."
            style={styles.input}
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <FontAwesome name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '600' },
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: '75%',
  },
  myMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#eee', alignSelf: 'flex-start' },
  messageText: { fontSize: 15 },
  timestamp: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 50,
    marginLeft: 8,
  },
});

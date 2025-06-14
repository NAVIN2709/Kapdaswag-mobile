import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type Message = {
    id: string;
    username: string;
    profilePic: string;
    text: string;
    image: string | null;
    timestamp: string;
    likes: number;
    comments: number;
};

type Comment = {
    id: string;
    username: string;
    text: string;
    timestamp: string;
};

export default function Community() {
    const router = useRouter();
    const navigation = useNavigation();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            username: 'Kapdaswag',
            profilePic: 'https://i.pravatar.cc/150?img=1',
            text: 'hii',
            image: null,
            timestamp: '24 May 2025, 17:20',
            likes: 4,
            comments: 2,
        },
        {
            id: '2',
            username: 'ft._navin',
            profilePic: 'https://i.pravatar.cc/150?img=2',
            text: 'hello',
            image: null,
            timestamp: '24 May 2025, 17:20',
            likes: 2,
            comments: 1,
        },
        {
            id: '3',
            username: 'ft._navin',
            profilePic: 'https://i.pravatar.cc/150?img=2',
            text: 'Scan this qr to join kapdaswag today !!',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHOYDQk151x3jhU3B5fe2J3SXoE-oHMsW1qA&s',
            timestamp: '24 May 2025, 17:27',
            likes: 3,
            comments: 0,
        },
    ]);

    const [input, setInput] = useState<string>('');
    const [pickedImage, setPickedImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [commentInput, setCommentInput] = useState('');
    const [mockComments, setMockComments] = useState<Comment[]>([
        {
            id: 'c1',
            username: 'nithish',
            text: 'This is dope!',
            timestamp: '24 May, 18:00',
        },
        {
            id: 'c2',
            username: 'harsha',
            text: 'where can I get it?',
            timestamp: '24 May, 18:15',
        },
    ]);

    const handleSend = () => {
        if (input.trim() === '' && !pickedImage) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            username: 'YourUsername',
            profilePic: 'https://i.pravatar.cc/150?img=3',
            text: input,
            image: pickedImage,
            timestamp: new Date().toLocaleString(),
            likes: 0,
            comments: 0,
        };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        setPickedImage(null);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
        });

        if (!result.canceled && result.assets.length > 0) {
            setPickedImage(result.assets[0].uri);
        }
    };

    const handleLike = (id: string) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
            )
        );
    };

    const openCommentModal = (message: Message) => {
        setSelectedMessage(message);
        setCommentModalVisible(true);
    };

    const handleCommentSend = () => {
        if (commentInput.trim() === '') return;

        const newComment: Comment = {
            id: Date.now().toString(),
            username: 'YourUsername',
            text: commentInput,
            timestamp: new Date().toLocaleTimeString(),
        };
        setMockComments((prev) => [...prev, newComment]);
        setCommentInput('');
    };

    const renderItem = ({ item }: { item: Message }) => (
        <View style={styles.messageCard}>
            <View style={styles.header}>
                <Image source={{ uri: item.profilePic }} style={styles.avatar} />
                <Text style={styles.username}>{item.username}</Text>
            </View>
            {item.text ? <Text style={styles.messageText}>{item.text}</Text> : null}
            {item.image ? (
                <TouchableOpacity
                    onPress={() => {
                        setSelectedImage(item.image);
                        setModalVisible(true);
                    }}
                >
                    <Image source={{ uri: item.image }} style={styles.messageImage} />
                </TouchableOpacity>
            ) : null}
            <View style={styles.footer}>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => handleLike(item.id)}>
                        <Text style={styles.likeButton}>❤️ {item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openCommentModal(item)}>
                        <Text style={styles.commentText}>💬 {item.comments}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar style='dark' />
                <View style={styles.Header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Swaggers</Text>
                </View>

                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.chatList}
                    keyboardShouldPersistTaps="handled"
                />

                {pickedImage && (
                    <Image source={{ uri: pickedImage }} style={styles.previewImage} />
                )}
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                        <Text style={styles.buttonText}>📷</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Message..."
                        value={input}
                        onChangeText={setInput}
                    />
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                        <Text style={styles.buttonText}>➤</Text>
                    </TouchableOpacity>
                </View>

                {/* Fullscreen Image Modal */}
                <Modal visible={modalVisible} transparent animationType="fade">
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContent}>
                            <Image source={{ uri: selectedImage ?? '' }} style={styles.fullImage} />
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* Comment Modal */}
                <Modal visible={commentModalVisible} transparent animationType="slide">
                    <View style={styles.commentModalContainer}>
                        <View style={styles.commentModalContent}>
                            {selectedMessage?.image && (
                                <Image
                                    source={{ uri: selectedMessage.image }}
                                    style={styles.commentModalImage}
                                />
                            )}
                            <Text style={styles.modalMessage}>
                                {selectedMessage?.text ?? ''}
                            </Text>

                            <FlatList
                                data={mockComments}
                                keyExtractor={(item) => item.id}
                                style={{ marginBottom: 10 }}
                                renderItem={({ item }) => (
                                    <View style={styles.commentItem}>
                                        <Text style={styles.commentUser}>{item.username}</Text>
                                        <Text style={styles.commentTextOnly}>{item.text}</Text>
                                        <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
                                    </View>
                                )}
                            />
                            <View style={styles.commentInputContainer}>
                                <TextInput
                                    style={styles.commentInput}
                                    placeholder="Write a comment..."
                                    value={commentInput}
                                    onChangeText={setCommentInput}
                                />
                                <TouchableOpacity onPress={handleCommentSend} style={styles.sendButton}>
                                    <Text style={styles.buttonText}>➤</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => setCommentModalVisible(false)}
                                style={{ alignSelf: 'center', marginTop: 10 }}
                            >
                                <Text style={{ color: 'gray' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    commentModalImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    commentModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    commentModalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        maxHeight: '80%',
    },
    modalMessage: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        color: '#e91e63',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentInput: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    commentItem: {
        paddingVertical: 6,
    },
    commentUser: {
        fontWeight: '600',
        color: '#111',
    },
    commentTextOnly: {
        fontSize: 14,
        color: '#333',
    },
    commentTimestamp: {
        fontSize: 10,
        color: '#aaa',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Header: {
        flexDirection: 'row',
        paddingHorizontal: 28,
        marginBottom: 12,
        alignItems: 'center',
    },
    backButton: {
        marginTop: 8,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    chatList: {
        padding: 10,
    },
    messageCard: {
        backgroundColor: '#ffe4f0',
        borderRadius: 15,
        padding: 12,
        marginBottom: 16,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    username: {
        fontWeight: 'bold',
        color: '#e91e63',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    messageImage: {
        width: '100%',
        height: 400,
        borderRadius: 10,
        marginTop: 10,
    },
    footer: {
        marginTop: 10,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
    },
    likeButton: {
        fontSize: 14,
        color: '#e91e63',
    },
    commentText: {
        fontSize: 14,
        color: '#e91e63',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: -40
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        marginHorizontal: 10,
    },
    imageButton: {
        padding: 8,
    },
    sendButton: {
        padding: 8,
        backgroundColor: '#ff69b4',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    previewImage: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: '80%',
    },
    fullImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 10,
    },
});

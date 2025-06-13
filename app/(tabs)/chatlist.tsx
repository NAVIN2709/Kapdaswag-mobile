import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const mockChats = [
    {
        id: '1',
        name: 'Aarav',
        lastMessage: 'Hey, what’s up?',
        profilePic: 'https://api.a0.dev/assets/image?text=Man&aspect=1:1&seed=11',
    },
    {
        id: '2',
        name: 'Neha',
        lastMessage: 'Let’s catch up!',
        profilePic: 'https://api.a0.dev/assets/image?text=Woman&aspect=1:1&seed=2',
    },
    {
        id: '3',
        name: 'Kiran',
        lastMessage: 'You free tonight?',
        profilePic: 'https://api.a0.dev/assets/image?text=Person&aspect=1:1&seed=3',
    }
];

export default function ChatList() {
    const router = useRouter();
    const renderItem = ({ item }: { item: typeof mockChats[0] }) => (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: '/messages/[id]',
                    params: { id: item.id },
                })
            }
            style={styles.chatItem}
        >
            <Image source={{ uri: item.profilePic }} style={styles.avatar} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message} numberOfLines={1}>
                    {item.lastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Swag Circle</Text>
                <View style={{ width: 20 }} /> {/* Placeholder to balance header */}
            </View>

            {/* Chat List */}
            <FlatList
                data={mockChats}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 10 }}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: '#eee', marginLeft: 70 }} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ddd',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    message: {
        fontSize: 14,
        color: '#555',
    },
});

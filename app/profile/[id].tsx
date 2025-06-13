import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const MATCHED_USERS = [
    {
        id: '4',
        name: 'Liam',
        bio: "Coffee lover and music enthusiast.",
        image: "https://api.a0.dev/assets/image?text=Man with classic casual style&aspect=1:1&seed=21",
        interests: ['Casual', 'Vintage', 'Denim', 'Sneakers']
    },
    {
        id: '5',
        name: 'Emma',
        bio: "Designer at heart. Dog mom.",
        image: "https://api.a0.dev/assets/image?text=Woman with modern fashion style&aspect=1:1&seed=22",
        interests: ['Modern', 'Minimalist', 'Chic', 'Monochrome']
    },
    {
        id: '10',
        name: 'Oliver',
        bio: "Traveler. Bookworm. Introvert.",
        image: "https://api.a0.dev/assets/image?text=Man with vintage style&aspect=1:1&seed=23",
        interests: ['Vintage', 'Layered', 'Corduroy', 'Muted Tones']
    },
    {
        id: '11',
        name: 'Ava',
        bio: "Yoga and matcha addict 🌱",
        image: "https://api.a0.dev/assets/image?text=Woman with bohemian fashion&aspect=1:1&seed=24",
        interests: ['Bohemian', 'Floral', 'Earth Tones', 'Layered Jewelry']
    },
    {
        id: '12',
        name: 'Noah',
        bio: "Engineer. Meme lord. Cat person.",
        image: "https://api.a0.dev/assets/image?text=Man with smart casual style&aspect=1:1&seed=25",
        interests: ['Smart Casual', 'Button-ups', 'Chinos', 'Loafers']
    },
    {
        id: '14',
        name: 'Isabella',
        bio: "Love art, photography & deep talks.",
        image: "https://api.a0.dev/assets/image?text=Woman with artsy look&aspect=1:1&seed=26",
        interests: ['Artsy', 'Oversized', 'Graphic Tees', 'Chunky Accessories']
    }
];

const ViewProfile = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const user = MATCHED_USERS.find(u => u.id === id);

    if (!user) {
        return (
            <SafeAreaView style={styles.centeredContainer}>
                <Text style={styles.notFoundText}>User not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{user.name}</Text>
                </View>

                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: user.image }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.nameText}>{user.name}</Text>
                    <Text style={styles.bioText}>{user.bio}</Text>
                </View>

                <View style={styles.interestsSection}>
                    <Text style={styles.interestsTitle}>Interests</Text>
                    <View style={styles.interestsWrapper}>
                        {user.interests.map((interest, index) => (
                            <View key={index} style={styles.interestChip}>
                                <Text style={styles.interestText}>{interest}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainer: {
        paddingBottom: 30
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    notFoundText: {
        fontSize: 18,
        color: '#4B5563'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    backButton: {
        marginRight: 16
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937'
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 16
    },
    profileImage: {
        width: 160,
        height: 160,
        borderRadius: 80
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#1F2937'
    },
    bioText: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 8,
        paddingHorizontal: 24,
        textAlign: 'center'
    },
    interestsSection: {
        marginTop: 24,
        paddingHorizontal: 24
    },
    interestsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8
    },
    interestsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    interestChip: {
        backgroundColor: '#FCE7F3',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 8,
        marginRight: 8
    },
    interestText: {
        color: '#DB2777',
        fontWeight: '500'
    }
});

export default ViewProfile;

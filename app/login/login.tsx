import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            setTimeout(() => {
                router.replace("/onboarding/onboarding");
            }, 1500);
        } catch (error) {
            setIsLoading(false);
            alert('Login failed');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/icon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.appName}>Kapdaswag</Text>
                <Text style={styles.tagline}>Where Style Connects People</Text>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.welcomeText}>Step into your style world</Text>
                <Text style={styles.descriptionText}>
                    Discover, vibe, and connect through fashion. Join a community where every outfit tells a story.
                </Text>

                <TouchableOpacity
                    style={[styles.authButton, styles.googleButton]}
                    onPress={handleGoogleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            <FontAwesome name="google" size={18} color="#fff" style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>Continue with Google</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View style={styles.termsContainer}>
                    <Text style={styles.termsText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.linkText}>Terms</Text> &{' '}
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 20,
        marginBottom: 10,
    },
    appName: {
        fontSize: 30,
        fontWeight: '700',
        color: '#ff375f',
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 28,
        justifyContent: 'center',
        marginTop: 10,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#111',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#666',
        lineHeight: 22,
        marginBottom: 36,
    },
    authButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 16,
    },
    googleButton: {
        backgroundColor: '#ff375f',
    },
    buttonIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    termsContainer: {
        marginTop: 20,
    },
    termsText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
    linkText: {
        color: '#ff375f',
        fontWeight: '500',
    },
});

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    TextInput,
    Modal,
    ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const loginWithEmail = async (email: string, password: string) => {
        console.log('Logging in with', email, password);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    const signupWithEmail = async (email: string, password: string) => {
        console.log('Signing up with', email, password);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [isSignupModalVisible, setSignupModalVisible] = useState(false);
    const [showPolicyModal, setShowPolicyModal] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await loginWithEmail(email, password);
            router.replace('/onboarding');
        } catch (error: any) {
            alert(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            await signupWithEmail(signupEmail, signupPassword);
            setSignupModalVisible(false);
            alert('Account created! You can now log in.');
        } catch (error: any) {
            alert(error.message || 'Signup failed');
        } finally {
            setIsLoading(false);
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
                <Text style={styles.welcomeText}>Login to your account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={[styles.authButton, styles.loginButton]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSignupModalVisible(true)}>
                    <Text style={styles.toggleText}>New here? Create an account</Text>
                </TouchableOpacity>

                <View style={styles.termsContainer}>
                    <TouchableOpacity onPress={() => setShowPolicyModal(true)}>
                        <Text style={styles.termsText}>
                            By continuing, you agree to our{' '}
                            <Text style={styles.linkText}>Terms</Text> &{' '}
                            <Text style={styles.linkText}>Privacy Policy</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Signup Modal */}
            <Modal
                visible={isSignupModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setSignupModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Create a new account</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={signupEmail}
                            onChangeText={setSignupEmail}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={signupPassword}
                            onChangeText={setSignupPassword}
                        />

                        <TouchableOpacity
                            style={[styles.authButton, styles.signupButton]}
                            onPress={handleSignup}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSignupModalVisible(false)}>
                            <Text style={styles.toggleText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Terms & Privacy Policy Modal */}
            <Modal
                visible={showPolicyModal}
                animationType="slide"
                transparent
                onRequestClose={() => setShowPolicyModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContainer, { maxHeight: '80%' }]}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>Terms & Privacy Policy</Text>
                            <Text style={{ fontSize: 13, color: '#333', marginBottom: 20 }}>
                                Welcome to Kapdaswag! By using this app, you agree to the following:
                                {'\n\n'}• You are responsible for keeping your account secure.
                                {'\n'}• We collect data to improve our services, including style preferences.
                                {'\n'}• We do not share your personal data with third parties without your consent.
                                {'\n'}• Content you upload must not violate any copyrights or community guidelines.
                                {'\n'}• Violation of terms may result in account suspension.
                                {'\n\n'}Please read our full policy at kapdaswag.com/legal for detailed terms.
                            </Text>
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => setShowPolicyModal(false)}
                            style={[styles.authButton, styles.loginButton]}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 20,
        marginBottom: 5,
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
        marginTop: -100,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#111',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        marginBottom: 16,
        color: '#333',
        backgroundColor: '#f9f9f9',
    },
    authButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 16,
    },
    loginButton: {
        backgroundColor: '#ff375f',
    },
    signupButton: {
        backgroundColor: '#f87171',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    toggleText: {
        textAlign: 'center',
        color: '#ff375f',
        fontWeight: '500',
        marginTop: 8,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ff375f',
        textAlign: 'center',
        marginBottom: 20,
    },
});

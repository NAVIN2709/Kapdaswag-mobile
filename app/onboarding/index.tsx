import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Image, Dimensions, Animated
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const INTERESTS = [
  'Minimalist', 'Streetwear', 'Vintage', 'Bohemian', 'Luxury',
  'Sustainable', 'Business Casual', 'Athleisure', 'Avant-garde',
  'Preppy', 'Y2K', 'Cottagecore', 'Skater', 'Gothic', 'Androgynous'
];

export default function OnboardingScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('https://api.a0.dev/assets/image?text=Upload%20profile%20photo&aspect=1:1');
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    instagram: '',
    snapchat: '',
    interests: []
  });

  const slideAnim = useRef(new Animated.Value(0)).current;

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const interests = [...prev.interests];
      const index = interests.indexOf(interest);
      if (index > -1) interests.splice(index, 1);
      else interests.push(interest);
      return { ...prev, interests };
    });
  };

  const animateToNextStep = () => {
    Animated.timing(slideAnim, { toValue: -width, duration: 300, useNativeDriver: true }).start(() => {
      setStep(current => current + 1);
      slideAnim.setValue(width);
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    });
  };

  const animateToPrevStep = () => {
    Animated.timing(slideAnim, { toValue: width, duration: 300, useNativeDriver: true }).start(() => {
      setStep(current => current - 1);
      slideAnim.setValue(-width);
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    });
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [1, 1],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    } else {
      // fallback to a random one
      const randomImages = [
        'https://api.a0.dev/assets/image?text=Fashion%20profile%20woman%20stylish%20close-up%20portrait&aspect=1:1',
        'https://api.a0.dev/assets/image?text=Fashion%20profile%20man%20stylish%20close-up%20portrait&aspect=1:1',
        'https://api.a0.dev/assets/image?text=Fashion%20influencer%20artsy%20portrait&aspect=1:1',
      ];
      const fallback = randomImages[Math.floor(Math.random() * randomImages.length)];
      setProfileImage(fallback);
    }
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        return formData.username.trim().length >= 3;
      case 2:
        return !profileImage.includes('Upload%20profile%20photo');
      case 5:
        return formData.interests.length >= 3;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (step < 5) animateToNextStep();
    else handleComplete();
  };

  const handleBack = () => {
    if (step > 1) animateToPrevStep();
  };

  const handleComplete = async () => {
  setLoading(true);
  const userData = { ...formData, profileImage };

  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data saved to local storage');
  } catch (error) {
    console.error('Failed to save user data:', error);
  }

  setTimeout(() => {
    setLoading(false);
    router.replace('/(tabs)/home');
  }, 1500);
};


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose your username</Text>
            <Text style={styles.stepDescription}>This will be your unique identifier on Kapdaswag</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="at" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={formData.username}
                onChangeText={text => updateFormData('username', text)}
              />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Add a profile photo</Text>
            <TouchableOpacity style={styles.imageUploadContainer} onPress={handlePickImage}>
              <Image source={{ uri: profileImage }} style={styles.previewImage} />
              <View style={styles.uploadOverlay}>
                <FontAwesome name="camera" size={24} color="#fff" />
                <Text style={styles.uploadText}>Tap to change</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Tell us about yourself</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Describe your vibe..."
              value={formData.bio}
              onChangeText={text => updateFormData('bio', text)}
              multiline
              maxLength={150}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Connect your socials</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="instagram" size={20} color="#E1306C" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Instagram handle"
                value={formData.instagram}
                onChangeText={text => updateFormData('instagram', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="snapchat-ghost" size={20} color="#FFFC00" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Snapchat username"
                value={formData.snapchat}
                onChangeText={text => updateFormData('snapchat', text)}
              />
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select your style interests</Text>
            <View style={styles.interestsContainer}>
              {INTERESTS.map(interest => (
                <TouchableOpacity
                  key={interest}
                  style={[styles.interestTag, formData.interests.includes(interest) && styles.selectedInterestTag]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={[styles.interestText, formData.interests.includes(interest) && styles.selectedInterestText]}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} disabled={step === 1 || loading}>
          {step > 1 && <FontAwesome name="chevron-left" size={20} color="#333" />}
        </TouchableOpacity>
        <View style={styles.progressBar}><View style={[styles.progress, { width: `${(step / 5) * 100}%` }]} /></View>
        <View style={{ width: 20 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Animated.View style={[styles.stepContainer, { transform: [{ translateX: slideAnim }] }]}>
          {renderStep()}
        </Animated.View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Creating...' : step === 5 ? 'Complete Setup' : 'Continue'}</Text>
        </TouchableOpacity>
        {step === 5 && <Text style={styles.skipText}>You can update these later</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 20,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#ff375f',
  },
  stepCount: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  stepContainer: {
    width: '100%',
  },
  stepContent: {
    width: '100%',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  bioInput: {
    height: 120,
    paddingHorizontal: 16,
    paddingTop: 12,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  imageUploadContainer: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    borderRadius: 80,
    overflow: 'hidden',
    marginVertical: 20,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  uploadOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  interestTag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedInterestTag: {
    backgroundColor: '#ff375f',
  },
  interestText: {
    fontSize: 14,
    color: '#333',
    fontWeight:'500'
  },
  selectedInterestText: {
    color: '#fff',
    fontWeight: '500',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#ff375f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loadingButton: {
    backgroundColor: '#ff7599',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});
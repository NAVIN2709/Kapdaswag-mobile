import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const INTEREST_OPTIONS = [
  'Minimalist', 'Streetwear', 'Casual', 'Formal', 'Vintage',
  'Athletic', 'Bohemian', 'Preppy', 'Punk', 'High Fashion',
  'Y2K', 'Cottagecore', 'Gothic', 'Business Casual',
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('kapdaswag2025');
  const [bio, setBio] = useState('hello');
  const [instagram, setInstagram] = useState('kapdaswag');
  const [snapchat, setSnapchat] = useState('kapdaswag123');
  const [interests, setInterests] = useState(['fashion', 'code', 'Casuals']);
  const [profileImage, setProfileImage] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrnmr3CB1oDs0WqiWPzNxENXCnRE-1yKVKw&s'
  );

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleImagePicker = () => {
    const newImage = `https://api.a0.dev/assets/image?text=${encodeURIComponent(username)}&aspect=1:1&seed=${Date.now()}`;
    setProfileImage(newImage);
    alert("Profile photo updated");
  };

  const handleSave = () => {
    if (!username.trim()) {
      alert("Username is required");
      return;
    }
    alert("Profile updated successfully");
    setModalVisible(false);
  };

  const handleLogout = () => {
    alert('Logged out');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      {/* Main Profile View */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <Image source={{ uri: profileImage }} style={styles.avatar} />
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.bio}>{bio}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Style Interests</Text>
          <View style={styles.interestWrap}>
            {interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          <View style={styles.socialList}>
            {instagram && (
              <View style={styles.socialItem}>
                <FontAwesome name="instagram" size={24} color="#E1306C" />
                <Text style={styles.socialText}>{instagram}</Text>
              </View>
            )}
            {snapchat && (
              <View style={styles.socialItem}>
                <FontAwesome name="snapchat-ghost" size={24} color="#FFFC00" />
                <Text style={styles.socialText}>{snapchat}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Modal */}
      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={styles.modalContainer}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome name="arrow-left" size={20} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.modalAvatarSection}>
                <Image source={{ uri: profileImage }} style={styles.modalAvatar} />
                <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
                  <FontAwesome name="camera" size={16} color="#fff" />
                  <Text style={styles.imagePickerText}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              {/* Username */}
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputPrefix}>@</Text>
                <TextInput style={styles.textInput} value={username} onChangeText={setUsername} />
              </View>

              {/* Bio */}
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={styles.bioInput}
                multiline
                maxLength={150}
                value={bio}
                onChangeText={setBio}
                placeholder="Write something about yourself"
              />
              <Text style={styles.charCount}>{bio.length}/150</Text>

              {/* Socials */}
              <Text style={styles.sectionTitle}>Social Media</Text>

              <Text style={styles.label}>Instagram</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputPrefix}>@</Text>
                <TextInput style={styles.textInput} value={instagram} onChangeText={setInstagram} />
              </View>

              <Text style={styles.label}>Snapchat</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputPrefix}>@</Text>
                <TextInput style={styles.textInput} value={snapchat} onChangeText={setSnapchat} />
              </View>

              <Text style={styles.sectionTitle}>Style Interests</Text>
              <Text style={styles.interestHint}>Select your fashion interests</Text>

              <View style={styles.interestWrap}>
                {INTEREST_OPTIONS.map((interest, index) => {
                  const selected = interests.includes(interest);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.interestOption, selected ? styles.interestSelected : styles.interestUnselected]}
                      onPress={() => toggleInterest(interest)}
                    >
                      <Text style={[styles.interestOptionText, selected ? styles.selectedText : styles.unselectedText]}>
                        {interest}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  backButton: {
    marginTop: 8,
    marginRight: 12,
  },
  headerText: { fontSize: 21, fontWeight: 'bold', color: '#1f2937' },
  scrollContainer: { padding: 20 },
  profileSection: { alignItems: 'center', marginBottom: 32 },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 16 },
  username: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
  bio: { fontSize: 14, color: '#374151', textAlign: 'center', paddingHorizontal: 20, marginBottom: 16,width:'100%' },
  editButton: { backgroundColor: '#db2777', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999 },
  editButtonText: { color: 'white', fontWeight: '600' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  interestWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  interestTag: { backgroundColor: '#db2777', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, marginRight: 8, marginBottom: 8 },
  interestText: { color: 'white', fontWeight: '500', fontSize: 14 },
  socialList: { gap: 12 },
  socialItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  socialText: { marginLeft: 12, fontSize: 16, color: '#1f2937' },
  logoutButton: {
    marginTop: 16,
    marginBottom: 40,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#db2777',
    borderRadius: 16,
  },
  logoutText: { color: '#db2777', fontWeight: '600', fontSize: 16 },

  // Modal
  modalContainer: { flex: 1, backgroundColor: 'white' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937' },
  saveButton: { backgroundColor: '#db2777', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 999 },
  saveButtonText: { color: 'white', fontWeight: '600' },
  modalContent: { padding: 20 },
  modalAvatarSection: { alignItems: 'center', marginBottom: 24 },
  modalAvatar: { width: 112, height: 112, borderRadius: 56, marginBottom: 12 },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db2777',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  imagePickerText: { color: 'white', fontWeight: '500', marginLeft: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputPrefix: { marginRight: 4, fontSize: 16, color: '#9ca3af' },
  textInput: { flex: 1, paddingVertical: 10, fontSize: 16 },
  bioInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  charCount: { textAlign: 'right', fontSize: 12, color: '#9ca3af', marginBottom: 20 },
  interestHint: { fontSize: 13, color: '#6b7280', marginBottom: 12 },
  interestOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  interestSelected: { backgroundColor: '#db2777', borderColor: '#db2777' },
  interestUnselected: { backgroundColor: '#f3f4f6', borderColor: '#d1d5db' },
  interestOptionText: { fontSize: 14, fontWeight: '500' },
  selectedText: { color: 'white' },
  unselectedText: { color: '#374151' },
});

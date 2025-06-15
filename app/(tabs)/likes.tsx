import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const INCOMING_MATCHES = [
    {
        id: '1',
        name: 'Sophia',
        matchPercentage: '92%',
        image: 'https://api.a0.dev/assets/image?text=Confident woman with modern style&aspect=1:1&seed=1',
        bio: "hiiii"
    },
    {
        id: '2',
        name: 'Marcus',
        matchPercentage: '88%',
        image: 'https://api.a0.dev/assets/image?text=Man with street fashion style&aspect=1:1&seed=2',
        bio: "helolooo"
    },
];

const MATCHED_USERS = [
    {
        id: '4',
        name: 'Liam',
        bio: "Coffee lover and music enthusiast.",
        image: "https://api.a0.dev/assets/image?text=Man with classic casual style&aspect=1:1&seed=21"
    },
    {
        id: '5',
        name: 'Emma',
        bio: "Designer at heart. Dog mom.",
        image: "https://api.a0.dev/assets/image?text=Woman with modern fashion style&aspect=1:1&seed=22"
    },
    {
        id: '10',
        name: 'Oliver',
        bio: "Traveler. Bookworm. Introvert.",
        image: "https://api.a0.dev/assets/image?text=Man with vintage style&aspect=1:1&seed=23"
    },
    {
        id: '11',
        name: 'Ava',
        bio: "Yoga and matcha addict 🌱",
        image: "https://api.a0.dev/assets/image?text=Woman with bohemian fashion&aspect=1:1&seed=24"
    },
    {
        id: '12',
        name: 'Noah',
        bio: "Engineer. Meme lord. Cat person.",
        image: "https://api.a0.dev/assets/image?text=Man with smart casual style&aspect=1:1&seed=25"
    },
    {
        id: '14',
        name: 'Isabella',
        bio: "Love art, photography & deep talks.",
        image: "https://api.a0.dev/assets/image?text=Woman with artsy look&aspect=1:1&seed=26"
    }
];


const SUGGESTIONS = [
    {
        id: '6',
        name: 'Noah',
        matchPercentage: '86%',
        image: 'https://api.a0.dev/assets/image?text=Man with athleisure style&aspect=1:1&seed=6',
        bio: "hiieee"
    },
    {
        id: '7',
        name: 'Ava',
        matchPercentage: '84%',
        image: 'https://api.a0.dev/assets/image?text=Woman with minimalist style&aspect=1:1&seed=7',
        bio: "helomnzxcvbcvjxsdfhvbsdmnvhjsvhjsdhjfdhvdfhjhvjdsh"
    },
];

type TabType = 'incoming' | 'matched' | 'suggestions';

const MatchesScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('matched');

  const handleAcceptMatch = (name: string) => alert(`Match accepted with ${name}`);
  const handleDeclineMatch = () => alert(`Match declined`);
  const handleMessageUser = (name: string) => alert(`Removed ${name}`);

  const renderIncomingItem = ({ item }: any) => (
    <View style={styles.cardRow}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bio}>{item.bio}</Text>
        <Text style={styles.matchPercent}>{item.matchPercentage} match</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleDeclineMatch} style={styles.declineBtn}>
          <FontAwesome name="times" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAcceptMatch(item.name)} style={styles.acceptBtn}>
          <FontAwesome name="check" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMatchedItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/profile/[id]', params: { id: item.id } })}
      style={styles.cardRow}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bio}>{item.bio}</Text>
      </View>
      <View style={styles.endActions}>
        <TouchableOpacity onPress={() => handleMessageUser(item.name)} style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </TouchableOpacity>
        <FontAwesome name="chevron-right" size={18} color="#aaa" />
      </View>
    </TouchableOpacity>
  );

  const renderSuggestionItem = ({ item }: any) => (
    <View style={styles.cardRow}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.matchPercent}>{item.matchPercentage} match</Text>
      </View>
      <TouchableOpacity onPress={() => handleMessageUser(item.name)} style={styles.giveRequestBtn}>
        <Text style={styles.giveRequestText}>Give Request</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'incoming':
        return <FlatList data={INCOMING_MATCHES} renderItem={renderIncomingItem} keyExtractor={item => item.id} key="incoming" />;
      case 'matched':
        return <FlatList data={MATCHED_USERS} renderItem={renderMatchedItem} keyExtractor={item => item.id} key="matched" />;
      case 'suggestions':
        return <FlatList data={SUGGESTIONS} renderItem={renderSuggestionItem} keyExtractor={item => item.id} key="suggestions" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connections</Text>
      </View>

      <View style={styles.tabs}>
        {['incoming', 'matched', 'suggestions'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as TabType)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
            {tab === 'incoming' && INCOMING_MATCHES.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{INCOMING_MATCHES.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.listContainer}>{renderContent()}</View>
    </SafeAreaView>
  );
};

export default MatchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  header: {
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
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#ec4899',
  },
  tabText: {
    color: '#6b7280',
    fontSize: 16,
    width: 144,
    marginLeft: 48,
  },
  activeTabText: {
    color: '#ec4899',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 24,
    backgroundColor: '#ec4899',
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  cardRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  bio: {
    color: '#6b7280',
    marginTop: 2,
  },
  matchPercent: {
    color: '#ec4899',
    fontWeight: '500',
    marginTop: 4,
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  declineBtn: {
    backgroundColor: '#ec4899',
    padding: 8,
    borderRadius: 999,
    marginBottom: 8,
  },
  acceptBtn: {
    backgroundColor: '#16a34a',
    padding: 8,
    borderRadius: 999,
  },
  endActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  removeBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
  giveRequestBtn: {
    backgroundColor: '#ec4899',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  giveRequestText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 4,
  },
});
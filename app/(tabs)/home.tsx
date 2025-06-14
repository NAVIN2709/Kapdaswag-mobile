import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Modal } from 'react-native';

const cards = [
  {
    id: 1,
    brand: "Allen Solly",
    category: "Shirt",
    image_url: "https://f.media-amazon.com/images/I/61idJrfaIRL._AC_UL320_.jpg",
    link: "https://www.amazon.in/dp/B07DMZQTNX",
    name: "Men's Solid Slim Fit Shirt",
    price: "1599",
    tagline: "Men's Solid Slim Fit Shirt - Wear the vibe.",
  },
  {
    id: 2,
    brand: "Levi's",
    category: "Jeans",
    image_url: "https://f.media-amazon.com/images/I/81WcnNQ-TBL._AC_UL320_.jpg",
    link: "https://www.amazon.in/dp/B08B46C6G2",
    name: "Levi's Slim Fit Mid-Rise Jeans",
    price: "2299",
    tagline: "Classic comfort meets timeless style.",
  },
  {
    id: 3,
    brand: "H&M",
    category: "T-Shirt",
    image_url: "https://f.media-amazon.com/images/I/61MBlA8nKHL._AC_UL320_.jpg",
    link: "https://www.amazon.in/dp/B098MN7L2G",
    name: "H&M Men's Cotton T-Shirt",
    price: "799",
    tagline: "Minimalist tee for everyday swagger.",
  },
  {
    id: 4,
    brand: "Puma",
    category: "Jacket",
    image_url: "https://f.media-amazon.com/images/I/51Nn1WRglCL._AC_UL320_.jpg",
    link: "https://www.amazon.in/dp/B09MZ5L9P8",
    name: "Puma Lightweight Windbreaker",
    price: "3499",
    tagline: "Stay breezy. Stay sporty.",
  },
  {
    id: 5,
    brand: "Zara",
    category: "Dress",
    image_url: "https://f.media-amazon.com/images/I/713BQ4ylcOL._AC_UL320_.jpg",
    link: "https://www.amazon.in/dp/B0B8GJP4KZ",
    name: "Zara Women's Summer Dress",
    price: "2799",
    tagline: "Elegant curves, breezy comfort.",
  },
  {
    id: 6,
    brand: "Nike",
    category: "Joggers",
    image_url: "https://f.media-amazon.com/images/I/51QJGFuO-JL._AC_UL320_.jpg",
    link: "https://www.amazon.in/dp/B09FXVP6FR",
    name: "Nike Sportswear Men's Joggers",
    price: "1999",
    tagline: "Train hard. Chill harder.",
  },
  {
    id: 7,
    brand: "FabIndia",
    category: "Kurta",
    image_url: "https://f.media-amazon.com/images/I/71Y7N3ZpnFL._AC_UL320_.jpg",
    link: "https://www.amazon.in/dp/B09TQNBNBX",
    name: "Men's Cotton Printed Kurta",
    price: "1499",
    tagline: "Tradition, with a twist.",
  },
  {
    id: 8,
    brand: "Biba",
    category: "Ethnic Dress",
    image_url: "https://f.media-amazon.com/images/I/61XcInLLO+L._AC_UL320_.jpg",
    link: "https://www.amazon.in/dp/B07N6SBXVK",
    name: "Biba Women's Flared Anarkali",
    price: "3199",
    tagline: "Grace and tradition stitched together.",
  }
];

export default function Home() {
  const [showCamera, setShowCamera] = React.useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef(null);

  const handleQRPress = () => {
    if (!permission) {
      Alert.alert('Permission Status', 'Camera permission is still loading...');
      return;
    }
    
    if (!permission.granted) {
      Alert.alert(
        'Camera Permission Required',
        'This app needs camera access to scan QR codes.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant Permission', onPress: requestPermission }
        ]
      );
      return;
    }
    
    setShowCamera(true);
  };

  const closeCamera = () => {
    setShowCamera(false);
  };

  const renderCameraContent = () => {
    if (!permission) {
      return (
        <View style={styles.cameraMessage}>
          <Text style={styles.messageText}>Loading camera permissions...</Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.cameraMessage}>
          <Text style={styles.messageText}>We need your permission to show the camera</Text>
          <TouchableOpacity 
            onPress={requestPermission}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          ratio="16:9"
        />
        <View style={styles.cameraOverlay}>
          <TouchableOpacity
            onPress={closeCamera}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.scanArea}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>Point camera at QR code</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={require("../../assets/kapdaswag3.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={handleQRPress} style={styles.qrContainer}>
        <Ionicons name="qr-code-sharp" size={45} />
      </TouchableOpacity>

      {/* Camera Modal */}
      <Modal 
        visible={showCamera} 
        animationType="slide"
        onRequestClose={closeCamera}
      >
        <SafeAreaView style={styles.modalContainer}>
          {renderCameraContent()}
        </SafeAreaView>
      </Modal>

      <View style={styles.swiperWrapper}>
        <Swiper
          cards={cards}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image
                source={{ uri: card.image_url }}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <View style={styles.cardDetails}>
                <Text style={styles.productName}>{card.name}</Text>
                <View style={styles.brandRow}>
                  <Text
                    style={styles.brandText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {card.brand}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.price}>₹{card.price}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(card.link)}>
                    <View style={styles.tryOnButton}>
                      <Ionicons name="shirt-outline" size={23} />
                      <Text style={styles.tryOnText}>Try On !</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={styles.tagline}>{card.tagline}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(card.link)}>
                  <Text style={styles.shopNow}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          disableTopSwipe
          disableBottomSwipe
          verticalSwipe={false}
          overlayLabels={{
            left: {
              element: (
                <Image
                  source={require('../../assets/nope.png')}
                  style={styles.overlayImage}
                  resizeMode="contain"
                />
              ),
              style: {
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              element: (
                <Image
                  source={require('../../assets/like.png')}
                  style={styles.overlayImage}
                  resizeMode="contain"
                />
              ),
              style: {
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
          onSwipedLeft={(cardIndex) =>
            console.log("Noped:", cards[cardIndex].id)
          }
          onSwipedRight={(cardIndex) =>
            console.log("Liked:", cards[cardIndex].id)
          }
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          animateCardOpacity
          overlayOpacityHorizontalThreshold={10}
          cardStyle={{ borderRadius: 30 }}
          marginTop={20}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  logo: {
    height: 70,
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
  },
  qrContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
    padding: 16,
    zIndex: 10,
  },
  swiperWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
    height: '75%',
  },
  cardImage: {
    width: '100%',
    height: '50%',
  },
  cardDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  brandText: {
    fontSize: 18,
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  tryOnButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    marginLeft: 12,
  },
  tryOnText: {
    marginLeft: 6,
    width: 70,
  },
  tagline: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 8,
    fontStyle: 'italic',
  },
  shopNow: {
    backgroundColor: '#ec4899',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
  overlayImage: {
    width: 120,
    height: 80,
    opacity: 0.8,
  },
  // New camera-related styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 25,
    zIndex: 10,
  },
  scanArea: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -125 }, { translateY: -125 }],
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  scanText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  cameraMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#ec4899',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
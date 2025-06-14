import { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  Text,
  StyleSheet,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  const iconScale = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(200)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Step 1: Icon bounce in quickly
    Animated.spring(iconScale, {
      toValue: 1,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start(() => {
      // Step 2: Text slides in
      Animated.parallel([
        Animated.timing(textTranslateX, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Step 3: Subtitle fades in
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 400,
          delay: 100,
          useNativeDriver: true,
        }).start(() => {
          // Step 4: Short hold and fade out
          setTimeout(() => {
            Animated.timing(fadeOut, {
              toValue: 0,
              duration: 500,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }).start(() => {
              router.replace('/(tabs)/home');
            });
          }, 800);
        });
      });
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <Animated.Image
        source={require('../assets/images/icon.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: iconScale }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Text
        style={[
          styles.titleText,
          {
            opacity: textOpacity,
            transform: [{ translateX: textTranslateX }],
          },
        ]}
      >
        Kapdaswag
      </Animated.Text>
      <Animated.Text
        style={[
          styles.subtitleText,
          {
            opacity: subtitleOpacity,
          },
        ]}
      >
        Not just an Ecommerce app
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#777',
  },
});

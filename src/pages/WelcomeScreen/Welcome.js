import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Image } from 'react-native';
import logo from '../../../assets/ramais.png'




const WelcomeScreen = ({ navigation }) => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 1000);
    const animationTimer = setTimeout(() => {
      setAnimationVisible(true);
    }, 5000);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  useEffect(() => {
    if (animationVisible) {
      setLoading(true);
    }
  }, [animationVisible]);

//coloquei esse effect para simular o carregamento por 3 segundos
  useEffect(() => {
    if (loading) {

      const loadingTimer = setTimeout(() => {
        setAppLoaded(true);
      }, 3000);
      return () => clearTimeout(loadingTimer);
    }
  }, [loading]);

  useEffect(() => {
    if (appLoaded) {
      navigation.navigate('Login');
    }
  }, [appLoaded, navigation]);



  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {logoVisible && (
          <Image
            source={logo}
            style={styles.logo}
          />
        )}
      </View>
      <View style={styles.animationContainer}>
        {animationVisible && (
          <>
             <LottieView
              source={require('../../../assets/loading/loading.json')}
              autoPlay
              loop
              style={[styles.animation, { opacity: loading ? 1 : 0 }]}
              />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  animation: {
    width: 300,
    height: 100,
  },
  loadingText: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    
  },
});

export default WelcomeScreen;
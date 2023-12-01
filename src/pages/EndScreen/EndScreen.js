// EndScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EndScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {

      navigation.navigate('Home');
    }, 10000);

  return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>

      <Image source={require('../../../assets/images/backgrounds/end.jpg')} style={styles.backgroundImage} />

      <Text style={styles.message}>Você atingiu o último prompt. Redirecionando para a tela inicial...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  message: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default EndScreen;

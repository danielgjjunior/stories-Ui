// StoriesDetailsPage.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Importe todas as imagens de fundo no início do arquivo
import backgroundImage1 from '../../../assets/images/backgrounds/1.jpg';
import backgroundImage2 from '../../../assets/images/backgrounds/2.jpg';
// Importe outras imagens conforme necessário

const StoriesDetailsPage = ({ route, navigation }) => {
  const { storyId, storyTitle } = route.params;

  // Use a variável para acessar a imagem específica
  const backgroundImages = {
    1: backgroundImage1,
    2: backgroundImage2,
    // Adicione outras imagens conforme necessário
  };
  const backgroundImage = backgroundImages[storyId];

  const handlePlayButtonPress = () => {
    // Navegar para a página de histórias com os dados da história
    navigation.navigate('Stories', { storyId, storyTitle });
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={backgroundImage} style={styles.backgroundImage} />

      {/* Nome da história em texto grande na parte inferior */}
      <Text style={styles.storyName}>{storyTitle}</Text>

      {/* Ícone redondo com um centro de triângulo de play */}
      <TouchableOpacity style={styles.playButton} onPress={handlePlayButtonPress}>
        {/* Substitua 'seu-icone.png' pelo caminho do seu ícone de play */}
        <Image source={require('../../../assets/play.png')} style={styles.playIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Para posicionar o texto e o botão na parte inferior
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  storyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Cor do texto
    textAlign: 'center',
    marginBottom: 16,
  },
  playButton: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 16,
    marginBottom: 40
  },
  playIcon: {
    width: 40,
    height: 40,
    // Defina outras propriedades do ícone, se necessário
  },
});

export default StoriesDetailsPage;

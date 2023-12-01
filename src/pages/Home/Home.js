
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


import background1 from '../../../assets/images/backgrounds/1.jpg';
import background2 from '../../../assets/images/backgrounds/2.jpg';


const Home = ({ navigation }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const jsonData = require('../../../public/historias.json');
        setStories(jsonData);
      } catch (error) {
        console.error('Erro ao carregar histórias:', error);
      }
    };

    loadStories();
  }, []);

  const handleStorySelection = (storyId, storyTitle) => {
    navigation.navigate('StoriesDetailsPage', { storyId, storyTitle });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <Text style={styles.title}>Selecione uma história:</Text>
        {stories.map((story) => (
          <TouchableOpacity
          key={story.id}
          style={styles.card}
          onPress={() => handleStorySelection(story.id, story.title)}
          activeOpacity={0.7}  
        >
          <ImageBackground
            source={getImageSource(story.id)}
            style={styles.cardBackground}
            resizeMode="cover"
          >
            <Text style={styles.cardTitle}>{story.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
        
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
};

const getImageSource = (id) => {
  switch (id) {
    case 1:
      return background1;
    case 2:
      return background2;

    default:
      return background1; 
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
  },
  card: {
    height: '30%',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
  },
});

export default Home;

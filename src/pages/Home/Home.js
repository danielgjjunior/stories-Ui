// StorySelectionScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';

const Home = ({ navigation }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        // const response = await axios.get('../../../public/json/historias.json');
        // const jsonData = response.data;
        const jsonData = require('../../../public/historias.json');

        setStories(jsonData);
      } catch (error) {
        console.error('Erro ao carregar histórias:', error);
      }
    };

    loadStories();
  }, []);

  const handleStorySelection = (storyId, storyTitle) => {
    navigation.navigate('Stories', { storyId, storyTitle });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <Text style={styles.title}>Selecione uma história:</Text>
        {stories.map((story) => (
          <View key={story.id} style={styles.card}>
            <Button
              title={story.title}
              onPress={() => handleStorySelection(story.id, story.title)}
            />
          </View>
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#F5F5F5", // Cor de fundo
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF", // Cor do card
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333", // Cor do título
    marginBottom: 16,
  },
});

export default Home;

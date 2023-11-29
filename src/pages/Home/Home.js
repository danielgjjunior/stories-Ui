// StorySelectionScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button,  StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';


const Home = ({ navigation }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {

    const loadStories = async () => {
      try {
        //const response = await axios.get('../../../public/json/historias.json');
        //const jsonData = response.data;
        const jsonData = require('../../../public/historias.json');
        

        setStories(jsonData); ''
      } catch (error) {
        console.error('Erro ao carregar histórias:', error);
      }
    };

    loadStories();
  }, []);

  const handleStorySelection = (storyId) => {
    navigation.navigate('ChatInteractionScreen', { storyId });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
    <View>
      <Text>Selecione uma história:</Text>
      {stories.map((story) => (
        <Button
          key={story.id}
          title={story.title}
          onPress={() => handleStorySelection(story.id)}
        />
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
    backgroundColor: "white",
  },
  animationDiv: {
    height: "50%",
  },
  text: {
    marginBottom: 10,
  },
  animation: {
    alignSelf: "center",
    height: "100%",
    backgroundColor: "white",
  },
  inputsDiv: {
    padding: 15,
  },
  input: {
    height: "16%",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 4,
    borderWidth: 3,
    borderColor: "#9e3aec",
  },
  button: {
    backgroundColor: "#9e3aec",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  upperHalf: {
    height: "70%",
    paddingHorizontal: 20,
  },
  lowerHalf: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    width: "100%",
  },
  title: {
    marginTop: "30%",
    fontSize: 15,
    fontWeight: "500",
    color: "white",
    fontStyle: "normal",
  },
  greetings: {
    marginTop: "10%",
    color: "#9E3AEC",
    fontSize: 36,
    fontStyle: "normal",
    fontWeight: "700",
  },
  imageDiv: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

export default Home;
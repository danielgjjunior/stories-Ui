// StoriesPage.jsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

const PromptView = ({ prompt }) => (
  <View style={styles.promptView}>
    <Text style={styles.promptText}>{prompt}</Text>
  </View>
);

const StoriesPage = ({ route, navigation }) => {
  const { storyId } = route.params;
  const { storyTitle } = route.params;

  const [prompts, setPrompts] = useState([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [storyText, setStoryText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNextCycleButtonDisabled, setIsNextCycleButtonDisabled] = useState(false);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const [isSpeechStarted, setIsSpeechStarted] = useState(false);
  const [isLastPromptReached, setIsLastPromptReached] = useState(false);

  const loadPrompts = async () => {
    try {
      setIsLoading(true);
      const timestamp = new Date().getTime();
      const response = await fetch(`https://16d3-200-131-116-2.ngrok.io/prompts/${storyId}?timestamp=${timestamp}`);

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }

      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.error('Erro ao carregar prompts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  useEffect(() => {
    if (prompts.length > 0) {
      setCurrentPromptIndex(0);
      sendInteraction();
    }
  }, [prompts]);

  useEffect(() => {
    if (prompts.length > 0 && prompts[currentPromptIndex]?.intro) {
      setStoryTextState(prompts[currentPromptIndex].intro);
      setIsSendButtonDisabled(currentPromptIndex === 0);

      
    }
  }, [currentPromptIndex, prompts]);

  const setStoryTextState = (text) => {
    setStoryText(text);
  };

  const sendInteraction = async () => {
    try {
      const currentPrompt = prompts[currentPromptIndex];

      const respostaUsuario = `${currentPrompt.prompt},${currentPrompt.intro},${userInput},${currentPrompt.desfecho}`;

      setIsLoading(true);
      const response = await fetch('https://16d3-200-131-116-2.ngrok.io/interacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_historia: currentPrompt.id_historia,
          respostaUsuario: respostaUsuario,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Resposta do servidor:', responseData);

      setStoryText(responseData.respostaOpenAI);
      setIsNextCycleButtonDisabled(false);
      setIsSendButtonDisabled(true);

      if (!isSpeechStarted) {
        Speech.speak(responseData.respostaOpenAI, { language: 'pt-BR' });
        setIsSpeechStarted(true);
      }
    } catch (error) {
      console.error('Erro ao enviar interação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNextPrompt = () => {
    if (currentPromptIndex < prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setUserInput('');
      setStoryText('');
      setIsNextCycleButtonDisabled(true);
      setIsSendButtonDisabled(false);

      setIsSpeechStarted(false);
      Speech.speak(prompts[currentPromptIndex + 1].intro, { language: 'pt-BR' });
    } else {
      console.log('Você atingiu o último prompt.');
      setIsLastPromptReached(true);
      setIsNextCycleButtonDisabled(true);
      setIsSendButtonDisabled(false);
      navigation.navigate('EndScreen'); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={currentPromptIndex === 0 ? storyTitle : "Digite sua parte da história..."}
          onChangeText={(text) => setUserInput(text)}
          value={userInput}
          editable={currentPromptIndex === 0 ? false : true}
        />
        <Button
          title="Enviar"
          onPress={sendInteraction}
          disabled={isSendButtonDisabled || isLoading || currentPromptIndex === prompts.length + 1}
        />
      </View>

      <PromptView prompt={prompts[currentPromptIndex]?.intro || ''} />

      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
      ) : (
        <Text style={styles.storyText}>{storyText}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Próximo Ciclo"
          onPress={loadNextPrompt}
          disabled={isNextCycleButtonDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    marginTop: "20%",
    flex: 4,
  },
  input: {
    height: '50%',
    borderColor: '#9E3AEC',
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  storyText: {
    fontSize: 18,
    color: '#333333',
  },
  promptView: {
    flex: 6,
    marginTop: 20,
  },
  promptText: {
    fontSize: 18,
    color: '#9E3AEC',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default StoriesPage;

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';

const PromptView = ({ prompt }) => (
  <View style={styles.promptView}>
    <Text style={styles.promptText}>{prompt}</Text>
  </View>
);

const StoryScreen = ({ route }) => {
  const { storyId } = route.params;
  const { storyTitle } = route.params;

  const [prompts, setPrompts] = useState([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [storyText, setStoryText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNextCycleButtonDisabled, setIsNextCycleButtonDisabled] = useState(false);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

  const loadPrompts = async () => {
    try {
      setIsLoading(true);
      const timestamp = new Date().getTime();
      const response = await fetch(`https://3bb1-179-106-26-98.ngrok.io/prompts/${storyId}?timestamp=${timestamp}`);

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
    // Garante que prompts está definido antes de chamar sendInteraction
    if (prompts.length > 0) {
      setCurrentPromptIndex(0);
      sendInteraction();
    }
  }, [prompts]);

  useEffect(() => {
    if (prompts.length > 0 && prompts[currentPromptIndex]?.intro) {
      setStoryTextState(prompts[currentPromptIndex].intro);
      setIsSendButtonDisabled(currentPromptIndex === 0); // Desabilita o botão de enviar no primeiro prompt
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
      const response = await fetch('https://3bb1-179-106-26-98.ngrok.io/interacao', {
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

      // Exibe a resposta na tela
      setStoryText(responseData.respostaOpenAI);
      setIsNextCycleButtonDisabled(false);
      setIsSendButtonDisabled(true); // Desabilita o botão de enviar após enviar a resposta
    } catch (error) {
      console.error('Erro ao enviar interação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNextPrompt = () => {
    // Avança para o próximo prompt, se não for o último
    if (currentPromptIndex < prompts.length -1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setUserInput('');
      setStoryText('');
      setIsNextCycleButtonDisabled(true);
      setIsSendButtonDisabled(false); // Habilita o botão de enviar ao avançar para o próximo ciclo
    } else {
      console.log('Você atingiu o último prompt.');
      setIsNextCycleButtonDisabled(true);
      setIsSendButtonDisabled(false); // Habilita o botão de enviar após o último prompt
      // Aqui você pode adicionar qualquer lógica que desejar após o último prompt
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
          disabled={isSendButtonDisabled || isLoading || currentPromptIndex === prompts.length +1}
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
  },
  inputContainer: {
    flex: 4,
  },
  input: {
    height: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  storyText: {
    fontSize: 18,
  },
  promptView: {
    flex: 6,
    marginTop: 20,
  },
  promptText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default StoryScreen;

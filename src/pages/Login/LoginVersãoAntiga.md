import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import backPage from "../../../assets/images/backPage.svg";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLowerHalfVisible, setLowerHalfVisible] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setLowerHalfVisible(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setLowerHalfVisible(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
     
    };
  }, []);

  const handleSubmit = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
    navigation.navigate('Home');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.upperHalf}>
        <Text style={styles.greetings}>Login</Text>

        <View style={styles.animationDiv}>
          <LottieView
            source={require("../../../assets/animation/loginAnimation.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        <View style={styles.inputsDiv}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="  Digite seu email, ex: credencial@email.com"
          />

          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="   Digite sua senha"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLowerHalfVisible && (
        <View style={styles.lowerHalf}>
          <ImageBackground
            style={styles.imageDiv}
            source={require("../../../assets/wave.png")}
          >
            <Text style={styles.title}>Made with ❤️ by Daniel</Text>
          </ImageBackground>
        </View>
      )}
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

export default Login;

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LogBox } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login/Login.js";
import Home from "./src/pages/Home/Home.js";
import Welcome from "./src/pages/WelcomeScreen/Welcome.js";
import Stories from "./src/pages/Stories/StoriesPage.js"
import StoriesDetailsPage from "./src/pages/Stories/StoriesDetailsPage.js"
import EndScreen from './src/pages/EndScreen/EndScreen.js'

LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoriesDetailsPage"
          component={StoriesDetailsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stories"
          component={Stories}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EndScreen"
          component={EndScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row",
    width:"100%",
    height:"100%"
  },
});

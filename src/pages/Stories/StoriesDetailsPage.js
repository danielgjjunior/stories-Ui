import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import backgroundImage1 from "../../../assets/images/backgrounds/1.jpg";
import backgroundImage2 from "../../../assets/images/backgrounds/2.jpg";

const StoriesDetailsPage = ({ route, navigation }) => {
  const { storyId, storyTitle } = route.params;

  const backgroundImages = {
    1: backgroundImage1,
    2: backgroundImage2,
  };
  const backgroundImage = backgroundImages[storyId];

  const handlePlayButtonPress = () => {
    navigation.navigate("Stories", { storyId, storyTitle });
  };

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />

      <Text style={styles.storyName}>{storyTitle}</Text>

      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlayButtonPress}
      >
        <Image
          source={require("../../../assets/play.png")}
          style={styles.playIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  storyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  playButton: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    padding: 16,
    marginBottom: 40,
  },
  playIcon: {
    width: 40,
    height: 40,
  },
});

export default StoriesDetailsPage;

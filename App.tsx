import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';

type SelectedImage = {
  localUri: string
};

export default function App() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage|null>(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={{ width: 305, height: 159 }} />
      <Image source={logo} style={styles.logo}/>

      <Text style={styles.instructions}>To share a photo from your phone with a friend, just press the button below!</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20
  },
  button: {
    backgroundColor: '#0d6ec5',
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 20
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});

// Richie

import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  Alert,
} from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";
import { TextInput } from "react-native-gesture-handler";
import richiePfp from "../../../assets/images/richie.jpg";
import wilsonPfp from "../../../assets/images/pic.jpg";
import { NavigationContainer } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
const ScreenHeaderBtn = ({ dimension, setCurrProfilePic, currProfilePic, newProfilePic}) => {
  // modal
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  // unique code input
  const [inputText, setInputText] = useState("");
  const [validCode, setValidCode] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
 
  const handleInputChange = (text) => {
    setInputText(text);
  };
  const peopleDB = [
    { name: "Richie", id: "1", picture: require('../../../assets/images/richie.jpg') },
    { name: "Wilson", id: "2", picture: require('../../../assets/images/pic.jpg') },
  ];
  const handleLogin = () => {
    console.log(inputText);
    let foundUser = peopleDB.find(user => user.id === inputText);
    if (foundUser) {
      Alert.alert("Success", "Welcome, " + foundUser.name + "!");
      setValidCode(true);
      setCurrentUser(foundUser.name);
      setCurrProfilePic(foundUser.picture);
  
    } else {
      Alert.alert("Error", "Invalid Code");
      setValidCode(false);
    }
  };
  useEffect(() => {
    console.log("currProfilePic prop changed:", currProfilePic);
  }, [currProfilePic]);

  return (
    <TouchableOpacity style={styles.btnContainer} onPress={toggleModal}>
      <Image
        source={currProfilePic || require('../../../assets/images/emptypfp.png')}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleModal}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={toggleModal2}
          ></TouchableOpacity>
          <Text style={styles.textContainer}>Enter your unique ID: </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="ID"
              placeholderTextColor="rgba(0,0,0,0.3)"
              onChangeText={handleInputChange}
              value={inputText}
            ></TextInput>
          </View>

          <TouchableOpacity onPress={toggleModal}></TouchableOpacity>
          <View style={styles.greenButton}>
            <TouchableOpacity
              style={styles.greenText}
              onPress={handleLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>WADASDWADASD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: 20,
  }),
  modalContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -150 }],
    height: 220,
    width: 300,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "1%",
    right: "1%",
    width: 20,
    height: 20,
    backgroundColor: "#f57878",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  addButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "1%",
    left: "1%",
    width: 20,
    height: 20,
    backgroundColor: "lightblue",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  textContainer: {
    paddingBottom: 50,
    fontFamily: FONT.bold,
  },
  inputContainer: {
    borderColor: "rgba(0,0,0,0.5)",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 7,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "black",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "rgba(0,0,0,0.5)",
    width: 100,
    textAlign: "center",
    textAlignVertical: "center",
  },
  greenButton: {
    position: "absolute",
    top: "84%",
    right: "1%",
    width: 50,
    height: 30,
    backgroundColor: "lightgreen",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "rgba(0,0,0,0)",
    width: 10,
    top: "30%",
    left: "10%",
  },
});

export default ScreenHeaderBtn;
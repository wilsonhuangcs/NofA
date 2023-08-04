import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, useColorScheme } from 'react-native';
import chair from "./chair.png";
import mop from "./mop.png";
import pic from "../../../assets/images/pic.jpg"

import { icons, SIZES, FONT } from '../../../constants';

const Popularjobs = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [buttonOnePressed, setButtonOnePressed] = useState(false);
  const [buttonTwoPressed, setButtonTwoPressed] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [showPlusIcon, setShowPlusIcon] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(10);

  useEffect(() => {
    if (timerSeconds > 0 && !isModalVisible) {
      const timer = setTimeout(() => {
        setTimerSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timerSeconds === 0 && !isModalVisible) {
      setShowPlusIcon(true);
      setButtonOnePressed(false);
      setButtonTwoPressed(false);
      setSelectedButtons([]);
    }
  }, [timerSeconds, isModalVisible]);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setShowPlusIcon(!isModalVisible);
    if (isModalVisible) {
      setTimerSeconds(1800); 
    }
  };

  const handleButtonOnePress = () => {
    setButtonOnePressed(!buttonOnePressed);
  };

  const handleButtonTwoPress = () => {
    setButtonTwoPressed(!buttonTwoPressed);
  };

  const handleSend = () => {
    const selected = [];
    if (buttonOnePressed) {
      selected.push('Button One');
    }
    if (buttonTwoPressed) {
      selected.push('Button Two');
    }
    setSelectedButtons(selected);
    toggleModal(); 

    setButtonOnePressed(false);
    setButtonTwoPressed(false);
  };

  return (
    <View style={styles.container}>
      {!selectedButtons.includes('Button One') && !selectedButtons.includes('Button Two') && (
        <Pressable onPress={toggleModal}>
          {({ pressed }) => (
            <FontAwesome
              name="plus"
              size={25}
              color="black"
            />
          )}
        </Pressable>
      )}

      {!showPlusIcon && (
        <View style={styles.textContainer}>
        <Text style={styles.titleText}> WHO CAN CLEAN? </Text>
          <Text style={styles.timer}> - {timerSeconds} - </Text>
        </View>
      )}
      
        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.buttonStyles}>

          <Pressable onPress={handleButtonOnePress}>
              <View
                style={[
                  styles.buttonOne,
                  { backgroundColor: buttonOnePressed ? '#32b000' : 'transparent' },
                ]}
              >
                <Image
                  source={chair} 
                  style={{ width: 80, height: 80 }} 
                  onError={() => console.log("Error loading image")} 
                />
              </View>
          </Pressable>

          <Pressable onPress={handleButtonTwoPress}>
              <View
                style={[
                  styles.buttonTwo,
                  { backgroundColor: buttonTwoPressed ? '#32b000' : 'transparent' },
                ]}
              >
                <Image
                  source={mop} 
                  style={{ width: 80, height: 80 }} 
                  onError={() => console.log("Error loading image")} 
                />
              </View>
          </Pressable>
          </View>
          <Pressable onPress={handleSend}>
              <View style={styles.sendButton}>
                <Text> SEND </Text>
              </View>
          </Pressable>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.buttonStyles}>
        {selectedButtons.includes('Button One') && (
          <Pressable onPress={handleButtonOnePress}> 
            <View
                style={[
                  styles.buttonOne,
                  { backgroundColor: buttonOnePressed ? '#32b000' : 'transparent' },
                ]}
               >
                <Image
                  source={chair} 
                  style={{ width: 80, height: 80 }} 
                  onError={() => console.log("Error loading image")} 
                />
              </View>
              {buttonOnePressed && <Image 
                source={pic} 
                style={styles.pictwo}
              />}
          </Pressable>
        )}
        {selectedButtons.includes('Button Two') && (
          <Pressable onPress={handleButtonTwoPress}> 
            <View
                style={[
                  styles.buttonTwo,
                  { backgroundColor: buttonTwoPressed ? '#32b000' : 'transparent' },
                ]}
              >
                <Image
                  source={mop} 
                  style={{ width: 80, height: 80 }} 
                  onError={() => console.log("Error loading image")} 
                />
              </View>
              {buttonTwoPressed && <Image 
                source={pic} 
                style={styles.pic}
              />}
          </Pressable>
        )}
      </View>
      {buttonOnePressed && buttonTwoPressed && <Text style={styles.claimedText}> All Claimed! </Text> }
  </View>
  )
  
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }], // Half of the width and height
    height: 200,
    width: 300,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 20,
    color: 'black',
    paddingTop: 10,
  },
  buttonStyles: {
    flexDirection: "row", 
    padding: 20, 
    justifyContent: 'space-evenly',
  },
  buttonOne: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'transparent', 
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 20, 
  },
  buttonTwo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'transparent', 
    borderColor: 'black',
    borderWidth: 2,
  },
  closeButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '1%',
    right: '1%',
    width: 20,
    height: 20,
    backgroundColor: '#f57878',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  sendButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    borderColor: 'black',
    borderWidth: 2,
    width: 75,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 50,
    fontFamily: FONT.bold,
    letterSpacing: 20,
    marginRight: -20,
  },
  titleText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontFamily: FONT.bold,
    letterSpacing: 5,
    marginRight: -5,
    paddingBottom: 20,
  },
  pic: {
    height: 80,
    width: 80,
    borderRadius: 50,
    bottom: '50%',
    left: '10%',
  },
  pictwo: {
    height: 80,
    width: 80,
    borderRadius: 50,
    bottom: '50%',
    left: '8%',
  },
  claimedText: {
    fontFamily: FONT.medium,
    fontSize: 20,
    marginTop: -50,
  },
});


export default Popularjobs
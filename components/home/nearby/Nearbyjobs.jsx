import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text, Modal, Button, Alert } from 'react-native'
import { COLORS, SIZES } from "../../../constants";
import { TextInput } from 'react-native-gesture-handler'; 

const Nearbyjobs = ({iconUrl, dimension, handlePress}) => {
  return (
    <View>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
  },
  btnImg: (dimension) => ({
    width: 50,
    height: 50,
  }),
});
export default Nearbyjobs
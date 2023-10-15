import { View,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width, // Set the width to fill the screen
    height: height, // Set the height to fill the screen
  },
});
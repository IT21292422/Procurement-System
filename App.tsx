import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { t } from 'react-native-tailwindcss';
import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';

export default function App() {

    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });

  return (
    <View style={styles.container}>
      {/* here using tailwind styles refer following*/}
      {/* https://tvke.github.io/react-native-tailwindcss/directional.html */}
      <Text style={[t.bgBlue500,t.fontBold]}>Open up App.tsx to start working on your app!</Text>
      {/* this is how to use env values */}
      <Text style={[t.bgRed400]}>Test env keys : <Text style={[t.bgBlue700,t.text2xl]}>{process.env.EXPO_PUBLIC_APP_ID}</Text></Text>
      {/* this is how use icons */}
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
      <StatusBar style="auto" />
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
});

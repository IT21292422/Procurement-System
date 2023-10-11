import React from 'react';
import { t } from 'react-native-tailwindcss';
import {store} from './context/store'
import { Provider } from 'react-redux'
import MainNavigation from './Navigation/MainNavigation';
import { PaperProvider } from 'react-native-paper';

export default function App() {

 return(
    <Provider store={store}>
      <PaperProvider>
        <MainNavigation/>
      </PaperProvider>
    </Provider>
  )
}

// **Test run is here*****************
// return (
//   <View style={[t.flexGrow,t.justifyAround,t.selfStart]}>
//     {/* here using tailwind styles refer following*/}
//     {/* https://tvke.github.io/react-native-tailwindcss/directional.html */}
//     <Text style={[t.bgBlue500,t.fontBold]}>Open up App.tsx to start working on your app!</Text>
//     {/* this is how to use env values */}
//     <Text style={[t.bgRed400]}>Test env keys : <Text style={[t.bgBlue700,t.text2xl]}>{process.env.EXPO_PUBLIC_APP_ID}</Text></Text>
//     {/* this is how use icons */}
//     <Ionicons name="md-checkmark-circle" size={32} color="green" />
//     <StatusBar style="auto" />
//   </View>
// );
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

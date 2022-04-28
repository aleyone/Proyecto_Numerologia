import { StyleSheet, Text, View } from "react-native"
import 'react-native-gesture-handler'
import {LogBox} from 'react-native'

import Navigation from "./components/Navigation"


LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['The final argument']);


export default function App() {
  return (
    <View style={styles.main}>
      <Navigation />
    </View>
   
  );
}

const styles = StyleSheet.create({
  main: {
    flex:1,
    //backgroundColor: '#191B4D',
  },
})


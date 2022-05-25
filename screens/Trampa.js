import { useFocusEffect } from '@react-navigation/core'
import { View } from 'react-native'

export default function Trampa(props) {
  useFocusEffect(()=>{
    props.navigation.navigate("DetalleEstudio")
    //props.navigation.goback();
  })

  return(<View></View>)
}


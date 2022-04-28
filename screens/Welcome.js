import { StyleSheet, Text, Image, View } from "react-native"
import React from "react"

import Login from "./Login"

export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logo_numerologia_integrativa.jpg")}
      />
      <Text style={styles.header}>¿Estás registrado? Lógate en la app</Text>
      <Login navigation={navigation}/>
      <Text style={styles.register} onPress={()=>navigation.navigate("Registro")}>
        Si todavía no estás registrado, hazlo ahora
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "10%",
    marginTop: 100,
    padding: 5,
  },
  register: {
    marginTop: 40,
    fontStyle: "italic",
    alignSelf: "center",
    color: '#191B4D',
    textDecorationLine: 'underline',
  },
  header: {
    marginBottom: 40,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  logo: {
      height: 150,
      width: '100%',
      alignSelf: 'center',
      resizeMode: 'contain',
      marginBottom: 50,
  }
});

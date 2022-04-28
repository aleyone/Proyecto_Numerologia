import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";

import FormCrearConsultante from "../components/FormCrearConsultante";


export default function CrearEstudio(props) {

  return (
    <ScrollView style={styles.container}>
     <FormCrearConsultante navegacion={props}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 20,
    marginVertical: 20,
  }
});

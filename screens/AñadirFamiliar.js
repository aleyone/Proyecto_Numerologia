import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";

import FormCrearOtros from "../components/FormCrearOtros";


export default function AñadirFamiliar(props) {

  return (
    <ScrollView style={styles.container}>
     <FormCrearOtros props={props}/>
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

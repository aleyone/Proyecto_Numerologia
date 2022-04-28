import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import sendToExport from "../utils/sendToExport";

export default function NumerologiaEvolutiva(props) {
  const [estudio, setEstudio] = useState({});
  const [base, setBase] = useState([]);
  const [puente, setPuente] = useState([]);
  const [evolucion, setEvolucion] = useState([]);
  const [inconsciente, setInconsciente] = useState([]);

  useEffect(() => {
    (() => {
      setEstudio(props.route.params.datos);
      console.log("Dentro del useEffect de numerologia evolutiva");
      console.log("Datos desde props");
      console.log(props.route.params.datos);
    })();
    console.log("Datos desde const estudio");
    console.log(estudio);
    const arrayBase = [],
      arrayPuente = [],
      arrayInconsciente = [],
      arrayEvolucion = [];
    arrayBase.push(
      props.route.params.datos.Numerologia_evolutiva.Habitantes.uno,
      props.route.params.datos.Numerologia_evolutiva.Habitantes.dos,
      props.route.params.datos.Numerologia_evolutiva.Habitantes.tres,
      props.route.params.datos.Numerologia_evolutiva.Habitantes.cuatro,
      props.route.params.datos.Numerologia_evolutiva.Habitantes.cinco,
      props.route.params.datos.Numerologia_evolutiva.Habitantes.seis,
      props.route.params.datos.Numerologia_evolutiva.Habitantes.siete,
      props.route.params.datos.Numerologia_evolutiva.Habitantes.ocho,
      props.route.params.datos.Numerologia_evolutiva.Habitantes.nueve
    );
    arrayPuente.push(
      props.route.params.datos.Numerologia_evolutiva.Puente.uno,
      props.route.params.datos.Numerologia_evolutiva.Puente.dos,
      props.route.params.datos.Numerologia_evolutiva.Puente.tres,
      props.route.params.datos.Numerologia_evolutiva.Puente.cuatro,
      props.route.params.datos.Numerologia_evolutiva.Puente.cinco,
      props.route.params.datos.Numerologia_evolutiva.Puente.seis,
      props.route.params.datos.Numerologia_evolutiva.Puente.siete,
      props.route.params.datos.Numerologia_evolutiva.Puente.ocho,
      props.route.params.datos.Numerologia_evolutiva.Puente.nueve
    );
    arrayInconsciente.push(
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.uno,
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.dos,
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.tres,
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.cuatro,
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.cinco,
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.seis,
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.siete,
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.ocho,
      props.route.params.datos.Numerologia_evolutiva.Inconsciente.nueve
    );
    arrayEvolucion.push(
      props.route.params.datos.Numerologia_evolutiva.Evolucion.uno,
      props.route.params.datos.Numerologia_evolutiva.Evolucion.dos,
      props.route.params.datos.Numerologia_evolutiva.Evolucion.tres,
      props.route.params.datos.Numerologia_evolutiva.Evolucion.cuatro,
      props.route.params.datos.Numerologia_evolutiva.Evolucion.cinco,
      props.route.params.datos.Numerologia_evolutiva.Evolucion.seis,
      props.route.params.datos.Numerologia_evolutiva.Evolucion.siete,
      props.route.params.datos.Numerologia_evolutiva.Evolucion.ocho,
      props.route.params.datos.Numerologia_evolutiva.Evolucion.nueve
    );
    setBase(arrayBase);
    setPuente(arrayPuente);
    setEvolucion(arrayEvolucion);
    setInconsciente(arrayInconsciente);
  }, []);

  console.log("Array del puente", puente);

  const exportar = () => {
   
    sendToExport();
  };

  const alerta = () => {
    Alert.alert("Aquí iría la exportación de datos");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: 20 }}>
        <Text>Numerologia_evolutiva</Text>
      </View>
      <View style={styles.castillo}>
        <View style={styles.cabeceras}>
          <Text style={styles.header}>Casas</Text>
        </View>
        <Text style={styles.header}>1</Text>
        <Text style={styles.header}>2</Text>
        <Text style={styles.header}>3</Text>
        <Text style={styles.header}>4</Text>
        <Text style={styles.header}>5</Text>
        <Text style={styles.header}>6</Text>
        <Text style={styles.header}>7</Text>
        <Text style={styles.header}>8</Text>
        <Text style={styles.header}>9</Text>
      </View>
      <View style={styles.castillo}>
        <View style={styles.cabeceras}>
          <Text style={styles.textTitle}>Base</Text>
        </View>
        {base.map((data, index) => {
          return (
            <Text key={index} style={styles.text}>
              {data}
            </Text>
          );
        })}
      </View>
      <View style={styles.castillo}>
        <View style={styles.cabeceras}>
          <Text style={styles.textTitle}>Puente</Text>
        </View>
        {puente.map((data, index) => {
          return (
            <Text key={index} style={styles.text}>
              {data}
            </Text>
          );
        })}
      </View>
      <View style={styles.castillo}>
        <View style={styles.cabeceras}>
          <Text style={styles.textTitle}>Evolución</Text>
        </View>
        {evolucion.map((data, index) => {
          return (
            <Text key={index} style={styles.text}>
              {data}
            </Text>
          );
        })}
      </View>
      <View style={styles.castillo}>
        <View style={styles.cabeceras}>
          <Text style={styles.textTitle}>Inconsciente</Text>
        </View>
        {inconsciente.map((data, index) => {
          return (
            <Text key={index} style={styles.text}>
              {data}
            </Text>
          );
        })}
      </View>
      <Button
        title="Exportar"
        onPress={() => {
          alerta();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    paddingTop: 15,
  },
  castillo: {
    flexDirection: "row",
    paddingTop: 15,
    marginHorizontal: 5,
  },
  cabeceras: {
    width: "25%",
  },
  header: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: "lightgray",
  },
  textTitle: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: "lightgray",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});

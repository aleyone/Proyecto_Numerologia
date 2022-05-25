import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { obtenerFechas, updateData } from "../firebase-config";
import transgeneracional from "../utils/calcTransg";
import { Button } from "react-native-elements";
import { sendToExport } from "../utils/sendToExport";
import Boton from "../components/boton";

export default function NumerologiaTransgeneracional(props) {
  const [fechas, setFechas] = useState({});
  const [datos, setDatos] = useState({});
  const [id, setId] = useState();
  const exportPDF = [];

  useEffect(() => {
    (async () => {
      console.log(
        "Estoy en numerología trans y esto es el id",
        props.route.params.estudioId
      );
      setDatos(await obtenerFechas("estudio", props.route.params.estudioId));
      // setFechas(transgeneracional(datos));
    })();
  }, []);
  const data = transgeneracional(datos);
  console.log("DATA: ", data);
  console.log("Datos: ", datos);
  console.log("Fechas: ", fechas);

  updateData(
    "estudio",
    props.route.params.estudioId,
    "transgeneracional",
    "",
    data
  );

  const exportar = () => {
    console.log("Desde numerologia familiar voy a exportar, ", data);
    sendToExport("familiar", data);
  };

  const volver = () => {
    props.navigation.navigate("DetalleEstudio", props.route.params.estudioId);
  };

  const alerta = () => {
    Alert.alert("Aquí iría la exportación de datos.");
  };
  return (
    <ScrollView style={styles.container}>
      <Text>
        {data.map((datos, index) => {
          return (
            <View key={index}>
              <View style={styles.nombre}>
                <Text style={styles.textNom}>
                  {datos.Rol}: </Text><Text>{datos.Nombre}
                </Text>
              </View>
              <View style={styles.pinaculo}>
                <View style={styles.maestro}>
                  <Text style={styles.text}>{datos.Maestro}</Text>
                </View>
                <View style={styles.ancestro}>
                  <Text style={styles.text}>
                    {datos.Ancestro1}   {datos.Ancestro2}
                  </Text>
                </View>
                <View style={styles.centro}>
                  <Text style={styles.text}>
                    {datos.Mes}   {datos.Dia}   {datos.Anyo}
                  </Text>
                </View>
                <View style={styles.ancestro}>
                  <Text style={styles.text}>
                    {datos.Emocional1}   {datos.Emocional2}
                  </Text>
                </View>
                <View style={styles.maestro}>
                  <Text style={styles.text}>{datos.Anclaje}</Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  marginBottom: 5,
                }}
              />
            </View>
          );
        })}
      </Text>
      {/*<Boton titulo="Exportar" funcion={exportar()}/>
      <Boton titulo="Volver" funcion={volver()}/>*/}

      <Button
        title="Exportar"
        buttonStyle={styles.boton}
        onPress={() => {
          exportar();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingTop: 5,
    width: "100%",
  },
  pinaculo: {
    marginHorizontal: 30,
  },
  maestro: {
    marginLeft: 30,
  },
  ancestro: {
    marginLeft: 15,
  },
  centro: {
    marginLeft: 0,
  },

  text: {
    fontSize: 20,
  },
  textNom: {
    color: "red",
    fontSize: 20,
  },
  nombre: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    marginVertical: 15,
    marginHorizontal: 10,
    paddingHorizontal: 3,
  },
  boton: {
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#191B4D",
  },
});

import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { obtenerFechas, updateData } from "../firebase-config";
import transgeneracional from "../utils/calcTransg";
import { Button } from "react-native-elements";

export default function NumerologiaTransgeneracional(props) {
  const [fechas, setFechas] = useState({});
  const [datos, setDatos] = useState({});
  const [id, setId] = useState();

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
    sendToExport();
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
              <View style={styles.pinaculo}>
                <View style={styles.maestro}>
                  <Text style={styles.text}>{datos.Maestro}</Text>
                </View>
                <View style={styles.ancestros}>
                  <Text style={styles.text}>
                    {datos.Ancestro1} {datos.Ancestro2}
                  </Text>
                </View>
                <View style={styles.central}>
                  <Text style={styles.text}>
                    {datos.Mes} {datos.Dia} {datos.Anyo}
                  </Text>
                </View>
                <View style={styles.emocional}>
                  <Text style={styles.text}>
                    {datos.Emocional1} {datos.Emocional2}
                  </Text>
                </View>
                <View style={styles.anclaje}>
                  <Text style={styles.text}>{datos.Anclaje}</Text>
                </View>
              </View>
              <View style={styles.nombre}>
                <Text style={styles.textNom}>
                  {datos.Rol}: {datos.Nombre}
                </Text>
              </View>
            </View>
          );
        })}
      </Text>
      <Button
        title="Exportar"
        onPress={() => {
          alerta();
        }}
      />
      <Button
        title="Volver"
        onPress={() => {
          volver();
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
    alignContent: "center",
    width: "98%",
  },
  pinaculo: {
    textAlign: "center",
    marginHorizontal: 50,
  },
  maestro: {
    textAlign: "center",
  },
  ancestros: {
    textAlign: "center",
  },
  central: {
    textAlign: "center",
  },
  emocional: {
    textAlign: "center",
  },
  anclaje: {
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    marginHorizontal: 20,
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
});

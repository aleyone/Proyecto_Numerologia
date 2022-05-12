import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { ListItem, Button } from "react-native-elements";

import { cerrarSesion, getUsuario } from "./Login";
import { obtenerEstudios } from "../firebase-config";

export default function Espacio(props) {
  const [estudios, setEstudios] = useState([]);

  useEffect(() => {
    (async () => {
      const resultUser = [];
      const user = getUsuario();
      const result = await obtenerEstudios("estudio", user);

      result.map((registro) => {
        if (registro.Autor == user && registro.Activo == true) {
          resultUser.push(registro);
        }
        
      });
      setEstudios(resultUser);
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Button
          title="Crear estudio"
          buttonStyle={{
            width: "60%",
            marginLeft: 15,
            backgroundColor: "#191B4D",
          }}
          onPress={() => {
            props.navigation.navigate("CrearEstudio");
          }}
        />

        <Text style={styles.header}>Estudios activos</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Button
          title="Cerrar sesión"
          buttonStyle={{
            width: "60%",
            marginLeft: 15,
            backgroundColor: "#191B4D",
          }}
          onPress={() => cerrarSesion(props)}
        />
      </View>
      <View style={styles.contenedorEstudios}>
        {estudios.map((estudio) => {
          return (
            <ListItem
              key={estudio.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate("DetalleEstudio", {
                  estudioId: estudio.id,
                });
              }}
            >
              <ListItem.Chevron />
              <ListItem.Content>
                <ListItem.Title>
                  {estudio.Datos_personales.Nombre_consultante.Nombre}{" "}
                  {estudio.Datos_personales.Nombre_consultante.Apellido_1}{" "}
                  {estudio.Datos_personales.Nombre_consultante.Apellido_3}
                </ListItem.Title>
                <ListItem.Subtitle>
                  {estudio.Datos_personales.Fecha_de_nacimiento.Dia}/
                  {estudio.Datos_personales.Fecha_de_nacimiento.Mes}/
                  {estudio.Datos_personales.Fecha_de_nacimiento.Anyo}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginTop: 15,
    textAlign: "left",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    marginTop: 6,
    paddingRight: 15,
  },
});

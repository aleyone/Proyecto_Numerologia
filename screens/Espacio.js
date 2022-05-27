import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { ListItem, Button } from "react-native-elements";

import { cerrarSesion, getUsuario } from "./Login";
import { obtenerEstudios } from "../firebase-config";
import Boton from "../components/boton";
import { useFocusEffect } from "@react-navigation/core";

export default function Espacio(props) {
  const [estudios, setEstudios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Se cargan los estudios del usuario que estén activos en base de datos
  useFocusEffect(useCallback(() => {
    (async () => {
      console.log("Entrando en Espacio para ver estudio antes y después: ", estudios)
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
    setLoading(false);
  }, []));

  if(loading){
    return(
      <View>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contenedorBotones}>
      <View>
     {/*   <Boton titulo="Crear estudio" funcion={props.navigation.navigate("CrearEstudio")}/>*/ }
        <Button
          title="Nuevo"
          buttonStyle={styles.boton}
          onPress={() => {
            props.navigation.navigate("CrearEstudio");
          }}
        />

       {/* <Text style={styles.header}>Estudios activos</Text>*/}
      </View>
      <View>
     {/* <Boton titulo="Cerrar sesión" funcion={cerrarSesion(props)}/>*/}

       <Button
          title="Cerrar sesión"
          buttonStyle={styles.boton}
          onPress={() => cerrarSesion(props)}
        />
      </View>
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
    backgroundColor: '#d8d0ee',
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    marginTop: 6,
    paddingRight: 15,
  },
  boton: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#191B4D",
  },
  contenedorBotones: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '85%',
    alignContent: 'center'
  },
});

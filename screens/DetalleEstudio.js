import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, ListItem, Button } from "react-native-elements";
import {
  deleteEstudio,
  obtenerFamiliar,
  unEstudio,
  deleteFamiliar,
} from "../firebase-config";

let estudioId = "";
let form = [];

export default function DetalleEstudio(props) {
  const [estudio, setEstudio] = useState({});
  const [datos, setDatos] = useState([]);
  const array = [];
  const [familiares, setFamiliares] = useState([]);
  const [id, setId] = useState();
  let familiaresVisibles = true;

  useEffect(() => {
    (async () => {
      estudioId = props.route.params.estudioId;
      form = props.route.params.form;
      console.log("Esto es el id en el Detalle del Estudio");
      console.log(estudioId);
      const result = await unEstudio("estudio", props.route.params.estudioId);
      array.push(
        result.Datos_personales.Nombre_consultante.Nombre,
        result.Datos_personales.Nombre_consultante.Apellido_1,
        result.Datos_personales.Nombre_consultante.Apellido_3,
        result.Datos_personales.Fecha_de_nacimiento.Dia,
        result.Datos_personales.Fecha_de_nacimiento.Mes,
        result.Datos_personales.Fecha_de_nacimiento.Anyo
      );
      setEstudio(result);
      setDatos(array);
      (async () => {
        const result = await obtenerFamiliar(
          "estudio",
          props.route.params.estudioId
        );
        console.log(
          "Esto es el futuro array de familiares antes de setear ",
          result
        );
        if (result != null) {
          setFamiliares(result);
          familiaresVisibles == true;
        }
      })();
    })();
    /*(async () => {
      const result = await obtenerFamiliar(
        "estudio",
        props.route.params.estudioId
      );
      console.log(
        "Esto es el futuro array de familiares antes de setear ",
        result
      );
      if(result!=null){
      setFamiliares(result);
      familiaresVisibles==true;
      }
    })();*/
  }, []);

  const confirmarDelete = () => {
    Alert.alert("Eliminar usuario", "¿Estás seguro?", [
      { text: "Sí", onPress: () => eliminar() },
      { text: "No", onPress: () => console.log("Cancelar borrado") },
    ]);
  };

  const eliminar = async () => {
    await deleteEstudio("estudio", estudioId);
    props.navigation.navigate("DrawNavigation");
  };

  const confirmarDeleteFamiliar = (rol) => {
    Alert.alert("Eliminar familiar", "¿Estás seguro?", [
      { text: "Sí", onPress: () => eliminarFamiliar(rol) },
      { text: "No", onPress: () => console.log("Cancelar borrado") },
    ]);
  };

  const eliminarFamiliar = async (rol) => {
    console.log("Entramos en eliminarFamiliar");
    await deleteFamiliar("estudio", estudioId, rol);
    props.navigation.navigate("DrawNavigation");
  };

  const updateConsultante = () => {
    props.navigation.navigate("FormModConsultante", { estudioId: estudioId, form: form });
  };

  const updateFamiliar = (rol) => {
    props.navigation.navigate("FormModOtros", { estudioId: estudioId, rol: rol });
  };

  return (
    <View style={styles.container}>
      <View style={styles.apartado}>
        <Text style={styles.text}>Datos personales</Text>
        <View style={styles.subcontain}>
          <View style={styles.datos}>
            <Text style={styles.texto}>
              Nombre: {datos[0]} {datos[1]} {datos[2]}
            </Text>
            <Text style={styles.texto}>
              Nacimiento: {datos[3]} / {datos[4]} / {datos[5]}
            </Text>
          </View>
          <View style={styles.options}>
            <View style={styles.options2}>
              <Icon
                name="pencil"
                type="material-community"
                color="#517fa4"
                onPress={() => updateConsultante()}
              />
              <Text>Editar</Text>
            </View>
            <View style={styles.options2}>
              <Icon
                name="delete-off-outline"
                type="material-community"
                color="#517fa4"
                onPress={() => confirmarDelete()}
              />
              <Text>Eliminar</Text>
            </View>
          </View>
        </View>
        <View style={styles.apartado}>
          <View style={styles.datos}>
            <Text style={styles.text}>Datos familiares</Text>
            <Button
              title="Añadir familiar"
              buttonStyle={{
                width: "60%",
                marginLeft: 15,
                backgroundColor: "#191B4D",
              }}
              onPress={() => {
                props.navigation.navigate("AñadirFamiliar", {
                  estudioId: estudioId,
                });
              }}
            />
          </View>
        </View>
        <View style={styles.apartado}>
          <ScrollView>
            <View style={styles.contenedorEstudios}>
              {familiaresVisibles &&
                familiares.map((familiar, i) => {
                  return (
                    <View style={styles.subcontain} key={i}>
                      <View style={styles.list}>
                        <ListItem bottomDivider>
                          <ListItem.Chevron />
                          <ListItem.Content>
                            <ListItem.Title>Rol: {familiar.rol}</ListItem.Title>
                            <ListItem.Subtitle>
                              {familiar.day}/{familiar.month}/{familiar.year}
                            </ListItem.Subtitle>
                          </ListItem.Content>
                        </ListItem>
                      </View>
                      <View style={styles.options}>
                        <View style={styles.options2}>
                          <Icon
                            name="pencil"
                            type="material-community"
                            color="#517fa4"
                            onPress={() =>
                              updateFamiliar(familiar.rol)
                            }
                          />
                          <Text>Editar</Text>
                        </View>
                        <View style={styles.options2}>
                          <Icon
                            name="delete-off-outline"
                            type="material-community"
                            color="#517fa4"
                            onPress={() =>
                              confirmarDeleteFamiliar(familiar.rol)
                            }
                          />
                          <Text>Eliminar</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
          <View>
            <Text style={{ marginTop: 10 }}>
              Aquí van los botones para los estudios
            </Text>
            <Button
              title="Evolutiva"
              onPress={() => {
                props.navigation.navigate("NumerologiaEvolutiva", {
                  datos: estudio,
                });
              }}
            />
            <Button
              title="Transgeneracional"
              onPress={() => {
                props.navigation.navigate("NumerologiaTransgeneracional", {
                  datos: estudio,
                  estudioId: props.route.params.estudioId,
                });
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    paddingTop: 15,
    width: "98%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginLeft: 10,
  },
  datos: {
    margin: 10,
    backgroundColor: "white",
    paddingLeft: 5,
    paddingTop: 5,
    width: "60%",
  },
  subcontain: {
    flexDirection: "row",
  },
  options: {
    marginTop: 13,
    flexDirection: "row",
    width: "20%",
  },
  list: {
    width: "63%",
  },
  options2: {
    marginHorizontal: 13,
  },
  texto: {
    fontSize: 16,
  },
  apartado: {
    marginVertical: 15,
  },
});

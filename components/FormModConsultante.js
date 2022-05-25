import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { Input, Button } from "react-native-elements";
import React from "react";
import { useState, useEffect } from "react";

import mapeo from "../utils/probando";

import { getConsultanteToUpdate, updateData } from "../firebase-config";
import { getUsuario } from "../screens/Login";
import { getFecha } from "../utils/utils";
import transgeneracional from "../utils/calcTransg";

let letters = [];
let estudioId ="";


export default function FormModConsultante(props) {
  const [form, setForm] = useState();
  const [errorNombre, setErrorNombre] = useState("");
  const [errorDia, setErrorDia] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const [errorAnyo, setErrorAnyo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resultado = await getConsultanteToUpdate("estudio", props.route.params.estudioId, "consultante", "ninguno");
      
      console.log("A ver cómo entra el resultado: ",resultado)
      console.log(resultado.name)
      
      setForm(resultado);
      setLoading(false);
      })();
      
  }, []);

  if(loading){
    return(
      <View>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }

  const validarFormulario = () => {
    if (!validarDatos()) {
      return;
    }
    mapeoDatos();
  };

  const onChange = (e, type) => {
    console.log("Cambios en onChange:", e, type)
    setForm({ ...form, [type]: e.nativeEvent.text });
  };

  const validarDatos = () => {
    console.log(form)
    setErrorDia("");
    setErrorMes("");
    setErrorAnyo("");
    let isValid = true;

    let dia = parseInt(form.day);
    let mes = parseInt(form.month);
    let anyo = parseInt(form.year);

    if (
      form.name == "" ||
      form.lastName1 == "" ||
      form.lastName2 == "" ||
      form.lastName3 == "" ||
      form.lastName4 == ""
    ) {
      setErrorNombre("No puede ser vacío");
      isValid = false;
    }
    

    if (!Number.isInteger(dia)) {
      setErrorDia("Revisa día");
      isValid = false;
    }

    if (!Number.isInteger(mes)) {
      setErrorMes("Revisa mes.");
      isValid = false;
    }

    if (!Number.isInteger(anyo)) {
      setErrorAnyo("Revisa el año.");
      isValid = false;
    }
    // size(anyo) > 4 ||
    /*if (size(anyo) < 1) {
      setErrorAnyo("Revisa año.-");
      isValid = false;
    }*/

    if (dia > 31 || dia < 1) {
      setErrorDia("Revisa día.");

      isValid = false;
    }

    if (mes > 12 || mes < 1) {
      setErrorMes("Revisa mes.");

      isValid = false;
    }

    const date = new Date();
    const diaActual = date.getDay();
    const mesActual = date.getMonth();
    const anyoActual = date.getFullYear();

    if (anyo > anyoActual) {
      setErrorAnyo("Año a futuro");
      isValid = false;
    }

    if (dia > 29 && (mes == 2 || mes == "02")) {
      setErrorDia("Revisa día.");
      setErrorMes("Revisa mes.");
      isValid = false;
    }

    return isValid;
  };

  const mapeoDatos = () => {
    letters = (
      form.name.split() +
      form.lastName1.split() +
      form.lastName2.split() +
      form.lastName3.split() +
      form.lastName4.split()
    ).toLowerCase();
    console.log("MAPEO DESDE MODIFICAR: ", letters)

    console.log(letters);
    let iniciales = [
      form.name.split()[0],
      form.lastName1.split()[0],
      form.lastName2.split()[0],
      form.lastName3.split()[0],
      form.lastName4.split()[0],
    ];
    console.log(iniciales);
    const usuario = getUsuario();
    const fechaActual = getFecha();
    const response = mapeo(letters, iniciales);
    const numerologia = transgeneracional(form.day, form.month, form.year);
    console.log("Hacemos un console de las letras por un return");
    console.log(response);
    console.log("Prueba de transgeneracional desde crear consultante");
    console.log(numerologia);

    const data = {
      Datos_personales: {
        Nombre_consultante: {
          Nombre: form.name,
          Apellido_1: form.lastName1,
          Apellido_2: form.lastName2,
          Apellido_3: form.lastName3,
          Apellido_4: form.lastName4,
        },
        Fecha_de_nacimiento: {
          Dia: form.day,
          Mes: form.month,
          Anyo: form.year,
        },
      },

      Numerologia_evolutiva: response,
    };

    console.log("Vamos a MODIFICAR en BBDD");
    updateData(
      "estudio",
      props.route.params.estudioId,
      "consultante",
      "",
      data
    );
    props.navigation.navigate("Espacio");
  };
  return (
    <ScrollView style={styles.container}>
      <Input
        label="Nombre"
        value={form.name}
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorNombre}
      />
      <Input
        label="Apellido abuelo paterno"
        value={form.lastName1}
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "lastName1")}
        errorMessage={errorNombre}
      />
      <Input
        label="Apellido abuela paterna"
        value={form.lastName2}
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "lastName2")}
        errorMessage={errorNombre}
      />
      <Input
        label="Apellido abuelo materno"
        value={form.lastName3}
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "lastName3")}
        errorMessage={errorNombre}
      />
      <Input
        label="Apellido abuela materna"
        value={form.lastName4}
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "lastName4")}
        errorMessage={errorNombre}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "30%" }}>
          <Input
            label="Fecha"
            value={form.day}
            inputStyle={styles.inputDate}
            onChange={(e) => onChange(e, "day")}
            errorMessage={errorDia}
          />
        </View>
        <View style={{ width: "30%" }}>
          <Input
            label="de"
            value={form.month}
            inputStyle={styles.inputDate}
            onChange={(e) => onChange(e, "month")}
            errorMessage={errorMes}
          />
        </View>
        <View style={{ width: "35%" }}>
          <Input
            label="nacimiento"
            value={form.year}
            inputStyle={styles.inputDate}
            onChange={(e) => onChange(e, "year")}
            errorMessage={errorAnyo}
          />
        </View>
      </View>
      <Button
        title="Guardar"
        buttonStyle={styles.boton}
        onPress={() => {
          validarFormulario();
        }}
      />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   },
  input: {
    width: "70%",
    height: 10,
  },
  inputDate: {
    width: 20,
    height: 10,
  },
  boton: {
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#191B4D",
  },
});

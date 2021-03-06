import { StyleSheet, View, ScrollView } from "react-native";
import { Input, Button } from "react-native-elements";
import React from "react";
import { useState } from "react";

import mapeo from "../utils/probando";
import { añadirEstudio } from "../firebase-config";
import { getUsuario } from "../screens/Login";
import { getFecha } from "../utils/utils";
import { size } from "lodash";
import transgeneracional from "../utils/calcTransg";

let letters = [];

export default function FormCrearConsultante(props) {
  const defaultValues = () => {
    return {
      name: "",
      lastName1: "",
      lastName2: "",
      lastName3: "",
      lastName4: "",
      day: 0,
      month: 0,
      year: 0,
    };
  };

  const [form, setForm] = useState(defaultValues());
  const [errorNombre, setErrorNombre] = useState("");
  const [errorDia, setErrorDia] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const [errorAnyo, setErrorAnyo] = useState("");

  /**
   * Tras pulsar el botón para confirmar el guardado, validamos los datos, y si es true, 
   * continuamos al mapeo de datos
   * @returns 
   */
  const validarFormulario = () => {
    if (!validarDatos()) {
      return;
    }
    mapeoDatos();
  };

  /** 
   * Seteamos el formulario conforme se introducen datos
  */
  const onChange = (e, type) => {
    setForm({ ...form, [type]: e.nativeEvent.text });
  };

  /**
   * Validaciones sobre el formulario
   * @returns true o false
   */
  const validarDatos = () => {
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

    var fechaInicio = new Date().getTime();
    var fechaFin = new Date(anyo+'-'+mes+'-'+dia).getTime();

    if (fechaFin > fechaInicio){
          setErrorAnyo("Fecha futura. No válida.");
          isValid = false;
    }

    if (dia > 29 && (mes == 2 || mes == "02")) {
      setErrorDia("Revisa día.");
      setErrorMes("Revisa mes.");
      isValid = false;
    }

    return isValid;
  };

  /**
   * Con los datos introducidos se prepara una respuesta para guardar en base de datos
   */
  const mapeoDatos = () => {
    
    letters = (
      form.name.split() +
      form.lastName1.split() +
      form.lastName2.split() +
      form.lastName3.split() +
      form.lastName4.split()
    ).toLowerCase();

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

    // response y numerología serán un JSON de datos que obtenemos de 
    // la función mapeo y transgeneracional
    const response = mapeo(letters, iniciales);
    const numerologia = transgeneracional(form.day, form.month, form.year)
    console.log("Hacemos un console de las letras por un return");
    console.log(response);
    console.log("Prueba de transgeneracional desde crear consultante")
    console.log(numerologia)

    // Preparamos la estructura de datos que se creará al guardar el consultante principal
    const data = {
      Autor: usuario,
      Activo: true,
      Fecha: fechaActual,
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
      Datos_familiares: {},
      Numerologia_evolutiva: response,
    };

    console.log("Vamos a grabar en BBDD");

    // Guardamos el estudio y navegamos al Espacio personal pasando como props el formulario
    añadirEstudio("estudio", data);
    props.navegacion.navigation.navigate("Espacio", {form: form});
  };
  return (
    <ScrollView style={styles.container}>
      <Input
        label="Nombre"
        placeholder="Introduce tu nombre completo"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorNombre}
      />
      <Input
        label="Apellido abuelo paterno"
        placeholder="Apellido 1"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "lastName1")}
        errorMessage={errorNombre}
      />
      <Input
        label="Apellido abuela paterno"
        placeholder="Apellido 2"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "lastName2")}
        errorMessage={errorNombre}
      />
      <Input
        label="Apellido abuelo materno"
        placeholder="Apellido 3"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "lastName3")}
        errorMessage={errorNombre}
      />
      <Input
        label="Apellido abuela materna"
        placeholder="Apellido 4"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "lastName4")}
        errorMessage={errorNombre}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "30%" }}>
          <Input
            label="Fecha"
            placeholder="Día"
            inputStyle={styles.inputDate}
            onChange={(e) => onChange(e, "day")}
            errorMessage={errorDia}
          />
        </View>
        <View style={{ width: "30%" }}>
          <Input
            label="de"
            placeholder="Mes"
            inputStyle={styles.inputDate}
            onChange={(e) => onChange(e, "month")}
            errorMessage={errorMes}
          />
        </View>
        <View style={{ width: "35%" }}>
          <Input
            label="nacimiento"
            placeholder="Año"
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

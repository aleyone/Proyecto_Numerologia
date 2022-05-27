import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Input, Button } from "react-native-elements";
import { useState, useEffect } from "react";
import { updateData, getConsultanteToUpdate } from "../firebase-config";

// Funcionalidad similar a FormCrearConsultante

export default function FormModOtros(props) {
  const defaultValues = () => {
    return {
      name: "",
      rol: "",
      day: 0,
      month: 0,
      year: 0,
      key: "",
    };
  };

  const [form, setForm] = useState();
  const [rolName, setRol] = useState();
  const [loading, setLoading] = useState(true);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorDia, setErrorDia] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const [errorAnyo, setErrorAnyo] = useState("");

  useEffect(() => {
    (async () => {
      const resultado = await getConsultanteToUpdate(
        "estudio",
        props.route.params.estudioId,
        "familiares",
        props.route.params.rol
      );

      console.log("A ver cómo entra el resultado: ", resultado);
      console.log(resultado.name);

      setForm(resultado);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const onChange = (e, type) => {
    setForm({ ...form, [type]: e.nativeEvent.text });
  };

  const validarFormulario = () => {
    if (!validarDatos()) {
      return;
    }
    saveData();
  };

  const validarDatos = () => {
    setErrorDia("");
    setErrorMes("");
    setErrorAnyo("");
    setErrorNombre("");
    let isValid = true;

    let dia = parseInt(form.day);
    let mes = parseInt(form.month);
    let anyo = parseInt(form.year);

    if (form.name == "") {
      setErrorNombre("No puede estar vacío");
      isValid = false;
    }

    if (!Number.isInteger(dia)) {
      setErrorDia("Revisa día");
      isValid = false;
    }

    if (!Number.isInteger(mes)) {
      setErrorMes("Revisa mes");
      isValid = false;
    }

    if (!Number.isInteger(anyo)) {
      setErrorAnyo("Revisa el año");
      isValid = false;
    }
    // size(anyo) > 4 ||
    /*if (size(anyo) < 1) {
      setErrorAnyo("Revisa año.-");
      isValid = false;
    }*/

    if (dia > 31 || dia < 1) {
      setErrorDia("Revisa día");

      isValid = false;
    }

    if (mes > 12 || mes < 1) {
      setErrorMes("Revisa mes");

      isValid = false;
    }

    const date = new Date();
    const diaActual = date.getDay();
    const mesActual = date.getMonth();
    const anyoActual = date.getFullYear();



    var fechaInicio = new Date().getTime();
    var fechaFin = new Date(anyo+'-'+mes+'-'+dia).getTime();

    console.log("Fecha inicio",fechaInicio)
    console.log("Fecha fin ",fechaFin)



    if (fechaFin > fechaInicio){
          setErrorAnyo("Fecha futura. No válida.");
          isValid = false;
    }
     

    if (dia > 29 && (mes == 2 || mes == "02")) {
      setErrorDia("Revisa día");
      setErrorMes("Revisa mes");
      isValid = false;
    }

    return isValid;
  };

  const data = {
    name: form.name,
    day: form.day,
    month: form.month,
    year: form.year,
    rol: form.key,
  };

  const saveData = () => {
    form.rol = rolName;
    updateData(
      "estudio",
      props.route.params.estudioId,
      "familiar",
      form.key,
      data
    );
    props.navigation.navigate("DetalleEstudio");
  };

  return (
    <View style={styles.container}>
      <Input
        value={form.name}
        placeholder="Nombre"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorNombre}
      />
      <Input
        value={form.day}
        placeholder="Día de nacimiento"
        inputStyle={styles.inputDate}
        onChange={(e) => onChange(e, "day")}
      />
      <Input
        value={form.month}
        placeholder="Mes de nacimiento"
        inputStyle={styles.inputDate}
        onChange={(e) => onChange(e, "month")}
      />
      <Input
        value={form.year}
        placeholder="Año de nacimiento"
        inputStyle={styles.inputDate}
        onChange={(e) => onChange(e, "year")}
      />
      {/* <Picker
        selectedValue={rolName}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
      >
        <Picker.Item label="Selecciona el rol" value="Desconocido" />
        <Picker.Item label="Padre" value="Padre" />
        <Picker.Item label="Madre" value="Madre" />
        <Picker.Item label="Hermano/a" value="Hermano/a" />
        <Picker.Item label="Hijo/a" value="hijo/a" />
        <Picker.Item label="Abuelo paterno" value="abuelopaterno" />
        <Picker.Item label="Abuela paterna" value="abuelapaterna" />
        <Picker.Item label="Abuelo materno" value="abuelomaterno" />
        <Picker.Item label="Abuela paterno" value="abuelamaterna" />
        <Picker.Item label="Pareja" value="pareja" />
  </Picker>*/}
      <Button
        title="Guardar"
        buttonStyle={styles.boton}
        onPress={() => validarFormulario()}
      />
    </View>
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
    width: 150,
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

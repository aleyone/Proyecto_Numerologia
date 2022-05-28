import { Alert, StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { updateData } from "../firebase-config";
import { contadorHijos, contadorParejas, contadorHermanos, contadorPadres } from "../utils/utils";

// Funcionamiento como FormCrearConsultante. En el momento del guardado se hace un update
export default function FormCrearOtros(props) {
  const defaultValues = () => {
    return {
      name: "",
      rol: "",
      day: 0,
      month: 0,
      year: 0,
    };
  };

  let padre = 0,
    madre = 0,
    abuelopaterno = 0,
    abuelomaterno = 0,
    abuelamaterna = 0,
    abuelapaterna = 0;
  let errorMessage = "";

  const [form, setForm] = useState(defaultValues());
  const [rolName, setRol] = useState();
  const [errorNombre, setErrorNombre] = useState("");
  const [errorDia, setErrorDia] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const [errorAnyo, setErrorAnyo] = useState("");

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
    let isValid = true;

    let dia = parseInt(form.day);
    let mes = parseInt(form.month);
    let anyo = parseInt(form.year);

    if (
      form.name == ""
    ) {
      setErrorNombre("No puede ser vacío");
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

    var fechaInicio = new Date().getTime();
    var fechaFin = new Date(anyo+'-'+mes+'-'+dia).getTime();

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

  
  const saveData = () => {
    comprobarRol();
    props.props.navigation.navigate(
      "DetalleEstudio",
      props.props.route.params.estudioId
    );
    console.log("Hemos guardado un rol");
  };

  const comprobarRol = () => {
    if (rolName == "padre") {
      var padre = contadorPadres();
      
      if (padre <= 2) {
        form.rol = "Padre " + padre;        
        console.log("Padre");
        updateData(
          "estudio",
          props.props.route.params.estudioId,
          "familiar",
          form.rol,
          form
        );
      //} else errorMessage = "Máximo dos padres.";
        } else Alert.alert("Máximo dos padres")
    } else if (rolName == "madre") {
      if (madre < 1) {
        form.rol = "Madre";
        madre++;
        console.log("Madre");
        updateData(
          "estudio",
          props.props.route.params.estudioId,
          "familiar",
          form.rol,
          form
        );
      } else errorMessage = "Ya has puesto una madre";
    } else if (rolName == "hermano/a") {
      var hermano = contadorHermanos()      
      form.rol = "Hermano " + hermano;
      console.log(form.rol);
      console.log("Herman@");
      updateData("estudio", props.props.route.params.estudioId, "familiar",form.rol, form);
    } else if (rolName == "hijo/a") {
      var hijo = contadorHijos()      
      form.rol = "Hijo " + hijo;
      console.log("Hij@");
      updateData("estudio", props.props.route.params.estudioId, "familiar",form.rol, form);
    } else if (rolName == "abuelopaterno") {
      if (abuelopaterno < 1) {
        form.rol = "Abuelo paterno";
        abuelopaterno++;
        console.log("Abuelo paterno");
        updateData(
          "estudio",
          props.props.route.params.estudioId, "familiar",
          form.rol,
          form
        );
      } else errorMessage = "Ya hay un abuelo paterno en la bbdd";
    } else if (rolName == "abuelomaterno") {
      if (abuelomaterno < 1) {
        form.rol = "Abuelo materno";
        abuelomaterno++;
        console.log("Abuelo materno");
        updateData(
          "estudio",
          props.props.route.params.estudioId, "familiar",
          form.rol,
          form
        );
      } else errorMessage = "Ya hay un abuelo materno en la bbdd";
    } else if (rolName == "abuelapaterna") {
      if (abuelapaterna < 1) {
        form.rol = "Abuela paterna";
        abuelapaterna++;
        console.log("Abuela paterna");
        updateData(
          "estudio",
          props.props.route.params.estudioId, "familiar",
          form.rol,
          form
        );
      } else errorMessage = "Ya hay una abuela paterna en la bbdd";
    } else if (rolName == "abuelamaterna") {
      if (abuelamaterna < 1) {
        form.rol = "Abuela materna";
        abuelamaterna++;
        console.log("Abuela materna");
        updateData(
          "estudio",
          props.props.route.params.estudioId, "familiar",
          form.rol,
          form
        );
      } else errorMessage = "Ya hay un abuela materna en la bbdd";
    } else if (rolName == "pareja") {
      var pareja = contadorParejas()      
      form.rol = "Pareja " + pareja;
      console.log("Pareja");
      updateData("estudio", props.props.route.params.estudioId, "familiar",form.rol, form);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nombre"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorNombre}
      />
      <Input
        placeholder="Día de nacimiento"
        inputStyle={styles.inputDate}
        onChange={(e) => onChange(e, "day")}
        errorMessage={errorDia}

      />
      <Input
        placeholder="Mes de nacimiento"
        inputStyle={styles.inputDate}
        onChange={(e) => onChange(e, "month")}
        errorMessage={errorMes}

      />
      <Input
        placeholder="Año de nacimiento"
        inputStyle={styles.inputDate}
        onChange={(e) => onChange(e, "year")}
        errorMessage={errorAnyo}

      />
      <Picker
        selectedValue={rolName}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
      >
        <Picker.Item label="Selecciona el rol" value="Desconocido" />
        <Picker.Item label="Padre" value="padre" />
        <Picker.Item label="Madre" value="madre" />
        <Picker.Item label="Hermano/a" value="hermano/a" />
        <Picker.Item label="Hijo/a" value="hijo/a" />
        <Picker.Item label="Abuelo paterno" value="abuelopaterno" />
        <Picker.Item label="Abuela paterna" value="abuelapaterna" />
        <Picker.Item label="Abuelo materno" value="abuelomaterno" />
        <Picker.Item label="Abuela materna" value="abuelamaterna" />
        <Picker.Item label="Pareja" value="pareja" />
      </Picker>
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

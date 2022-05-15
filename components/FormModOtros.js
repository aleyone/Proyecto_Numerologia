import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Input, Button } from "react-native-elements";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { updateData, getConsultanteToUpdate } from "../firebase-config";

export default function FormModOtros(props) {
  const defaultValues = () => {
    return {
      name: "",
      rol: "",
      day: 0,
      month: 0,
      year: 0,
      key: ""
    };
  };

  const [form, setForm] = useState();
  const [rolName, setRol] = useState();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  
    (async () => {
      const resultado = await getConsultanteToUpdate("estudio", props.route.params.estudioId, "familiares", props.route.params.rol);
      
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

  const onChange = (e, type) => {
    setForm({ ...form, [type]: e.nativeEvent.text });
  };

  /*const comprobarRol = () => {
    form.rol = rolName;
  }*/

  const data = {
    name: form.name, day: form.day, month: form.month, year: form.year, rol: form.key
  }

  const saveData = () => {
    form.rol = rolName
    updateData(
      "estudio",
      props.route.params.estudioId,
      "familiar",
      form.key,
      data
    );
    props.navigation.navigate("Espacio");
  };

  return (
    <View style={styles.container}>
      <Input
        value={form.name}
        placeholder="Nombre"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "name")}
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
        onPress={() => saveData()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
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

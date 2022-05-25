import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebase-config";
import { size } from "lodash";

import { validarEmail } from "../utils/utils";
import Boton from "../components/boton";

export default function Registro({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const auth = getAuth(firebaseApp);

  const registrarUsuario = () => {
    if (!validarDatos()) {
      return;
    }
    handleCreateUser();
  };

  const validarDatos = () => {
    setErrorConfirm("");
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (email == "" || password == "" || confirmPass == "") {
      Alert.alert("No puedes dejar campos en blanco");
      isValid = false;
    } else {
      if (!validarEmail(email)) {
        setErrorEmail("Añade un correo válido");
        isValid = false;
      }

      if (size(password) < 6) {
        setErrorEmail("Contraseña de al menos 6 carácteres");
        isValid = false;
      }

      if (size(confirmPass) < 6) {
        setErrorPassword("Confirmación de contraseña de al menos 6 carácteres.");
        isValid = false;
      }

      if (password !== confirmPass) {
        Alert.alert("La contraseña y la confirmación no son iguales.");
        // setErrorConfirm("La contraseña y la confirmación no son iguales.");
        isValid = false;
      }

      return isValid;
    }
  };

  const handleCreateUser = () => {
    if (email != "" && password != "" && confirmPass != "") {
      createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
        .then((userCredential) => {
          console.log("Cuenta creada");
          const user = userCredential.user;
          console.log(user);
          navigation.navigate("DrawNavigation");
        })
        .catch((error) => {
          if (error.message == "Firebase: Error (auth/user-not-found).") {
            console.log("Correo no existente");
            setErrorEmail("Correo inexistente");
          } else if (
            error.message == "Firebase: Error (auth/wrong-password)."
          ) {
            setErrorPassword("Contraseña no válida");
          } else setErrorEmail(error.message);
          //console.log(error);
        });
    } else Alert.alert("Introduce datos");
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder="Introduce tu correo"
        inputStyle={styles.input}
        password={true}
        onChangeText={(text) => setEmail(text)}
        errorMessage={errorEmail}
      />
      <Input
        placeholder="Introduce contraseña"
        inputStyle={styles.input}
        onChangeText={(text) => setPassword(text)}
        password={true}
        secureTextEntry={true}
        errorMessage={errorPassword}
      />
      <Input
        placeholder="Confirma contraseña"
        inputStyle={styles.input}
        onChangeText={(text) => setConfirmPass(text)}
        password={true}
        secureTextEntry={true}
        errorMessage={errorConfirm}
      />
      {/*} <Boton titulo="Confirmar" funcion={registrarUsuario}/>*/}
      <Button
        title="Confirmar"
        buttonStyle={styles.boton}
        onPress={registrarUsuario}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "10%",
    marginTop: 100,
    padding: 5,
  },
  input: {
    width: "70%",
    height: 15,
  },
  boton: {
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#191B4D",
  },
});

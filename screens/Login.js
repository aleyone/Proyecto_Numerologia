import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebase-config";
import { Input, Button } from "react-native-elements";
import Boton from "../components/boton";
import { validarEmail } from "../utils/utils";

const initialState = {
  email: "",
  password: "",
};

var usuario = "";

//Aprovechamos que logamos al usuario para crear una constante 
//que nos sirva como setter y getter del usuario
export const setUsuario = (user) => {
  usuario = user;
};

export const getUsuario = () => {
  return usuario;
};

export default function Login(props) {

  const defaultValues = () => {
    return { email: "", password: "" };
  };

  const [form, setForm] = useState(defaultValues());
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const onChange = (e, type) => {
    setForm({ ...form, [type]: e.nativeEvent.text });
  };

  const auth = getAuth(firebaseApp);

  // Controlamos los errores en el .catch
  const handleSignIn = () => {
    if (form.email != "" && form.password != "") {
      if (validarEmail(form.email)) {
        signInWithEmailAndPassword(
          auth,
          form.email.toLowerCase(),
          form.password
        )
          .then((userCredential) => {
            console.log("Nos logamos");
            const user = userCredential.user;
            setUsuario(user.uid);
            console.log(user);
            props.navigation.navigate("Espacio");
          })
          .catch((error) => {
            if (error.message == "Firebase: Error (auth/user-not-found).") {
              console.log("Correo no existente");
              setErrorCorreo("Correo inexistente");
            } else if (
              error.message == "Firebase: Error (auth/wrong-password)."
            ) {
              setErrorPassword("Contraseña no válida");
            } else Alert.alert(error.message);
          });
      } else setErrorCorreo("Formato de correo incorrecto")
    } else Alert.alert("Introduce datos")
  };

  return (
    <ScrollView>
      <Input
        placeholder="Introduce tu correo"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorCorreo}
      />
      <Input
        placeholder="Introduce contraseña"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "password")}
        secureTextEntry={true}
        errorMessage={errorPassword}
      />
      {/*} <Button
        title="Accede"
        buttonStyle={styles.boton}
        onPress={handleSignIn}
  />*/}
      <Boton titulo="Acceder" funcion={handleSignIn} />
    </ScrollView>
  );
}

export const cerrarSesion = (props) => {
  const auth = getAuth(firebaseApp);
  console.log("Cerramos sesión");
  console.log(props);
  props.navigation.navigate("Welcome");
  return auth.signOut();
};

const styles = StyleSheet.create({
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

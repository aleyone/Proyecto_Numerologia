import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebase-config";
import { Input, Button } from "react-native-elements";

const initialState = {
  email: "",
  password: "",
};

var usuario=""

export const setUsuario = (user) =>{
  usuario = user;
}

export const getUsuario = () =>{
  return usuario;
}

export default function Login(props) {
  /* const [email1, setEmail] = useState("");
  const [password1, setPassword] = useState("");*/
  const defaultValues = () => {
    return { email: "", password: "" };
  };

  const [form, setForm] = useState(defaultValues());
  

  const onChange = (e, type) => {
    setForm({ ...form, [type]: e.nativeEvent.text });
  };

  const auth = getAuth(firebaseApp);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        console.log("Nos logamos");
        const user = userCredential.user;
        setUsuario(user.uid);
        console.log(user);
        props.navigation.navigate("DrawNavigation");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <Input
        placeholder="Introduce tu correo"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "email")}
      />
      <Input
        placeholder="Introduce contraseña"
        inputStyle={styles.input}
        onChange={(e) => onChange(e, "password")}
        secureTextEntry={true}
      />
      <Button
        title="Accede"
        buttonStyle={styles.boton}
        onPress={handleSignIn}
      />
    </ScrollView>
  );
}

export const cerrarSesion = (props) => {
  const auth = getAuth(firebaseApp);
  console.log("Cerramos sesión");
  console.log(props)
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

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Home from "../screens/Home";
import Login from "../screens/Login";
import Registro from "../screens/Registro";
import Welcome from "../screens/Welcome";
import DrawNavigation from "./DrawNavigation";
import DetalleEstudio from "../screens/DetalleEstudio";
import Espacio from "../screens/Espacio";
import CrearEstudio from "../screens/CrearEstudio";
import FormCrearConsultante from "./FormCrearConsultante";
import AñadirFamiliar from "../screens/AñadirFamiliar";
import NumerologiaEvolutiva from "../screens/NumerologiaEvolutiva";


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetalleEstudio"
          component={DetalleEstudio}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Espacio"
          component={Espacio}
          options={{
           title: "Tus estudios",
          }}
        />
        <Stack.Screen
          name="CrearEstudio"
          component={CrearEstudio}
          options={{
            title: "Introduce datos del consultante",
          }}
        />
        <Stack.Screen
          name="AñadirFamiliar"
          component={AñadirFamiliar}
          options={{
            title: "Introduce datos del familiar",
          }}
        />
        <Stack.Screen
          name="NumerologiaEvolutiva"
          component={NumerologiaEvolutiva}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FormCrearConsultante"
          component={FormCrearConsultante}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DrawNavigation"
          component={DrawNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

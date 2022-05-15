import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Informes from "../screens/Informes"
import TuPerfil from "../screens/TuPerfil"
import Espacio from "../screens/Espacio"

const Drawer = createDrawerNavigator();

export default function DrawNavigation() {
  return (
      <Drawer.Navigator initialRouteName="Tu Espacio">
        <Drawer.Screen name="Tu Espacio" component={Espacio}/>
       
      </Drawer.Navigator>
  );
}

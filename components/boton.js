import { Button } from "react-native-elements";
import { StyleSheet, View } from "react-native";

/**
 * Funcionalidad que pretendía utilizar un botón tipo componente 
 * para toda la aplicación. Finalmente se ha utilizado solo en 
 * algunas funcionalidades
 * 
 * @param {} props se recoge título y la función a implementar
 * @returns botón renderizado
 */
export default function Boton(props) {
  return (
    <View>
      <Button
        title={props.titulo}
        buttonStyle={styles.boton}
        onPress={props.funcion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#191B4D",
  },
});

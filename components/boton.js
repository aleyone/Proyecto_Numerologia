import { Button } from "react-native-elements";
import { StyleSheet, View } from "react-native";

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

import { View, Text } from "react";

const transgeneracional = (datos) => {
  let numeros = [];

  for (var i = 0; i < datos.length - 1; i++) {
    var anyo = reducirAnyo(datos[i].Anyo);
    var dia = parseInt(datos[i].Dia)
    var mes = parseInt(datos[i].Mes)
    var ancestro1 = dia+mes
    var ancestro2 = dia+anyo
    var maestro = ancestro1+ancestro2
    var emocional1 = Math.abs(dia-mes)
    var emocional2 = Math.abs(dia-anyo)
    var anclaje = Math.abs(emocional1-emocional2)
    var camino = dia+mes+anyo
    numeros.push({Rol: datos[i].Rol, Nombre: datos[i].Nombre, Dia: dia, Mes: mes, Anyo: anyo, Ancestro1: ancestro1, Ancestro2: ancestro2, Maestro: maestro, Emocional1: emocional1, Emocional2: emocional2, Anclaje: anclaje, Camino: camino});
  }
  console.log("Numeros: ", numeros);
  return numeros;
};

const reducirAnyo = (anyo) => {
  var suma = 0;
  if (anyo < 2000) {
    var myArr = String(anyo)
      .split("")
      .map((anyo) => {
        suma = parseInt(suma) + parseInt(anyo);
        return Number(anyo);
      });
  } else if (anyo >= 2000 && anyo < 3000) {
    var suma1 = 0,
      suma2 = 0;
    var primerosDigitos = anyo.toString().substring(0, 2);
    var ultimosDigitos = anyo.toString().substring(2, 4);
    var myArr = String(primerosDigitos)
      .split("")
      .map((primerosDigitos) => {
        suma1 = parseInt(suma1) + parseInt(primerosDigitos);
        return Number(primerosDigitos);
      });
    var myArr1 = String(ultimosDigitos)
      .split("")
      .map((ultimosDigitos) => {
        suma2 = parseInt(suma2) + parseInt(ultimosDigitos);
        return Number(ultimosDigitos);
      });
    suma = parseInt(suma1.toString() + suma2.toString());
  }
  return suma;
};

export default transgeneracional;

var contadorLetras = {
  uno: 0,
  dos: 0,
  tres: 0,
  cuatro: 0,
  cinco: 0,
  seis: 0,
  siete: 0,
  ocho: 0,
  nueve: 0,
};

var habitanteUno = 1,
  habitanteDos = 1,
  habitanteTres = 1,
  habitanteCuatro = 1,
  habitanteCinco = 1,
  habitanteSeis = 1,
  habitanteSiete = 1,
  habitanteOcho = 1,
  habitanteNueve = 1;

var arrIniciales = [];
var arrLetras = [];

var hasUno = false,
  hasDos = false,
  hasTres = false,
  hasCuatro = false,
  hasCinco = false,
  hasSeis = false,
  hasSiete = false,
  hasOcho = false,
  hasNueve = false;

const mapeo = (letters, iniciales) => {
  habitanteUno = 1,
  habitanteDos = 1,
  habitanteTres = 1,
  habitanteCuatro = 1,
  habitanteCinco = 1,
  habitanteSeis = 1,
  habitanteSiete = 1,
  habitanteOcho = 1,
  habitanteNueve = 1;
  
  arrIniciales = iniciales;
  arrLetras = letters;
  var letra = letters.split("");
  console.log("Voy a mapear la ", letters)

  // Asignar letras
  const dameLetras = letra.map(function (letras) {
    if (
      letras == "a" ||
      letras == "á" ||
      letras == "à" ||
      letras == "ä" ||
      letras == "j" ||
      letras == "s"
    ) {
      contadorLetras["uno"] = habitanteUno++;
      hasUno = true;
    } else if (letras == "b" || letras == "k" || letras == "t") {
      contadorLetras["dos"] = habitanteDos++;
      hasDos = true;
    } else if (
      letras == "c" ||
      letras == "l" ||
      letras == "u" ||
      letras == "ú" ||
      letras == "ù" ||
      letras == "ü"
    ) {
      contadorLetras["tres"] = habitanteTres++;
      hasTres = true;
    } else if (letras == "d" || letras == "m" || letras == "v") {
      contadorLetras["cuatro"] = habitanteCuatro++;
      hasCuatro = true;
    } else if (
      letras == "e" ||
      letras == "n" ||
      letras == "w" ||
      letras == "ñ" ||
      letras == "é" ||
      letras == "è" ||
      letras == "ë"
    ) {
      contadorLetras["cinco"] = habitanteCinco++;
      hasCinco = true;
    } else if (
      letras == "f" ||
      letras == "o" ||
      letras == "x" ||
      letras == "ó" ||
      letras == "ò" ||
      letras == "ö"
    ) {
      contadorLetras["seis"] = habitanteSeis++;
      hasSeis = true;
    } else if (letras == "g" || letras == "p" || letras == "y") {
      contadorLetras["siete"] = habitanteSiete++;
      hasSiete = true;
    } else if (letras == "h" || letras == "q" || letras == "z") {
      contadorLetras["ocho"] = habitanteOcho++;
      hasOcho = true;
    } else if (
      letras == "i" ||
      letras == "r" ||
      letras == "í" ||
      letras == "ì" ||
      letras == "ï"
    ) {
      contadorLetras["nueve"] = habitanteNueve++;
      hasNueve = true;
    }

    return dameLetras;
  });

  // Llamar funciones para completar y se devuelve un JSON con 
  // datos para posteriormente grabar en BBDD
  rellenar();
  var listPuentes = numPuente(contadorLetras);
  var listEvolucion = numEvolucion();
  var listInconsciente = numInconsciente();
  var dameDatos = {
    Habitantes: contadorLetras,
    Puente: listPuentes,
    Evolucion: listEvolucion,
    Inconsciente: listInconsciente,
  };
  return dameDatos;
};

 
const rellenar = () => {
  if (hasUno == false) contadorLetras["uno"] = 0;
  if (hasDos == false) contadorLetras["dos"] = 0;
  if (hasTres == false) contadorLetras["tres"] = 0;
  if (hasCuatro == false) contadorLetras["cuatro"] = 0;
  if (hasCinco == false) contadorLetras["cinco"] = 0;
  if (hasSeis == false) contadorLetras["seis"] = 0;
  if (hasSiete == false) contadorLetras["siete"] = 0;
  if (hasOcho == false) contadorLetras["ocho"] = 0;
  if (hasNueve == false) contadorLetras["nueve"] = 0;
};

const numPuente = (contadorLetras) => {
  var dataPuentes = {
    uno: 0,
    dos: 0,
    tres: 0,
    cuatro: 0,
    cinco: 0,
    seis: 0,
    siete: 0,
    ocho: 0,
    nueve: 0,
  };
  dataPuentes["uno"] = Math.abs(contadorLetras.uno - 1);
  dataPuentes["dos"] = Math.abs(contadorLetras.dos - 2);
  dataPuentes["tres"] = Math.abs(contadorLetras.tres - 3);
  dataPuentes["cuatro"] = Math.abs(contadorLetras.cuatro - 4);
  dataPuentes["cinco"] = Math.abs(contadorLetras.cinco - 5);
  dataPuentes["seis"] = Math.abs(contadorLetras.seis - 6);
  dataPuentes["siete"] = Math.abs(contadorLetras.siete - 7);
  dataPuentes["ocho"] = Math.abs(contadorLetras.ocho - 8);
  dataPuentes["nueve"] = Math.abs(contadorLetras.nueve - 9);

  return dataPuentes;
};

const numEvolucion = () => {
  var arrHabitantes = [
    habitanteUno - 1,
    habitanteDos - 1,
    habitanteTres - 1,
    habitanteCuatro - 1,
    habitanteCinco - 1,
    habitanteSeis - 1,
    habitanteSiete - 1,
    habitanteOcho - 1,
    habitanteNueve - 1,
  ];

  var dataEvolucion = {
    uno: 0,
    dos: 0,
    tres: 0,
    cuatro: 0,
    cinco: 0,
    seis: 0,
    siete: 0,
    ocho: 0,
    nueve: 0,
  };

  var repeticionUno = 0,
    repeticionDos = 0,
    repeticionTres = 0,
    repeticionCuatro = 0,
    repeticionCinco = 0,
    repeticionSeis = 0,
    repeticionSiete = 0,
    repeticionOcho = 0,
    repeticionNueve = 0;

  for (var y = 0; y < arrHabitantes.length; y++) {
    if (arrHabitantes[y] == 1) {
      repeticionUno++;
    } else if (arrHabitantes[y] == 2) {
      repeticionDos++;
    } else if (arrHabitantes[y] == 3) {
      repeticionTres++;
    } else if (arrHabitantes[y] == 4) {
      repeticionCuatro++;
    } else if (arrHabitantes[y] == 5) {
      repeticionCinco++;
    } else if (arrHabitantes[y] == 6) {
      repeticionSeis++;
    } else if (arrHabitantes[y] == 7) {
      repeticionSiete++;
    } else if (arrHabitantes[y] == 8) {
      repeticionOcho++;
    } else if (arrHabitantes[y] == 9) {
      repeticionNueve++;
    }
  }

  dataEvolucion["uno"] = contadorLetras.uno + repeticionUno;
  dataEvolucion["dos"] = contadorLetras.dos + repeticionDos;
  dataEvolucion["tres"] = contadorLetras.tres + repeticionTres;
  dataEvolucion["cuatro"] = contadorLetras.cuatro + repeticionCuatro;
  dataEvolucion["cinco"] = contadorLetras.cinco + repeticionCinco;
  dataEvolucion["seis"] = contadorLetras.seis + repeticionSeis;
  dataEvolucion["siete"] = contadorLetras.siete + repeticionSiete;
  dataEvolucion["ocho"] = contadorLetras.ocho + repeticionOcho;
  dataEvolucion["nueve"] = contadorLetras.nueve + repeticionNueve;

  return dataEvolucion;
};

const numInconsciente = () => {

  var dataInconsciente = {
    uno: 0,
    dos: 0,
    tres: 0,
    cuatro: 0,
    cinco: 0,
    seis: 0,
    siete: 0,
    ocho: 0,
    nueve: 0,
  };

   if ((habitanteUno-1) != 0) {
    dataInconsciente["uno"] = valorLetra(arrLetras[habitanteUno - 2]);
  } else dataInconsciente["uno"] = valorLetra(arrLetras[0]);
  if ((habitanteDos-1) != 0) {
    dataInconsciente["dos"] = valorLetra(arrLetras[habitanteDos - 2]);
  } else dataInconsciente["dos"] = valorLetra(arrLetras[1]);
  if ((habitanteTres-1) != 0) {
    dataInconsciente["tres"] = valorLetra(arrLetras[habitanteTres - 2]);
  } else dataInconsciente["tres"] = valorLetra(arrLetras[2]);
  if ((habitanteCuatro-1) != 0) {
    dataInconsciente["cuatro"] = valorLetra(arrLetras[habitanteCuatro - 2]);
  } else dataInconsciente["cuatro"] = valorLetra(arrLetras[3]);
  if ((habitanteCinco-1) != 0) {
    dataInconsciente["cinco"] = valorLetra(arrLetras[habitanteCinco - 2]);
  } else dataInconsciente["cinco"] = valorLetra(arrLetras[4]);
  if ((habitanteSeis-1) != 0) {
    dataInconsciente["seis"] = valorLetra(arrLetras[habitanteSeis - 2]);
  } else dataInconsciente["seis"] = valorLetra(arrLetras[5]);
  if ((habitanteSiete-1) != 0) {
    dataInconsciente["siete"] = valorLetra(arrLetras[habitanteSiete - 2]);
  } else dataInconsciente["siete"] = valorLetra(arrLetras[6]);
  if ((habitanteOcho-1) != 0) {
    dataInconsciente["ocho"] = valorLetra(arrLetras[habitanteOcho - 2]);
  } else dataInconsciente["ocho"] = valorLetra(arrLetras[7]);
  if ((habitanteNueve-1) != 0) {
    dataInconsciente["nueve"] = valorLetra(arrLetras[habitanteNueve - 2]);
  } else dataInconsciente["nueve"] = valorLetra(arrLetras[8]);

  return dataInconsciente;
};

// Según la letra se retorna un valor
const valorLetra = (letras) => {
  var valor = 0;
  if (
    letras == "a" ||
    letras == "á" ||
    letras == "à" ||
    letras == "ä" ||
    letras == "j" ||
    letras == "s"
  ) {
    valor = 1;
  } else if (letras == "b" || letras == "k" || letras == "t") {
    valor = 2;
  } else if (
    letras == "c" ||
    letras == "l" ||
    letras == "u" ||
    letras == "ú" ||
    letras == "ù" ||
    letras == "ü"
  ) {
    valor = 3;
  } else if (letras == "d" || letras == "m" || letras == "v") {
    valor = 4;
  } else if (
    letras == "e" ||
    letras == "n" ||
    letras == "w" ||
    letras == "ñ" ||
    letras == "é" ||
    letras == "è" ||
    letras == "ë"
  ) {
    valor = 5;
  } else if (
    letras == "f" ||
    letras == "o" ||
    letras == "x" ||
    letras == "ó" ||
    letras == "ò" ||
    letras == "ö"
  ) {
    valor = 6;
  } else if (letras == "g" || letras == "p" || letras == "y") {
    valor = 7;
  } else if (letras == "h" || letras == "q" || letras == "z") {
    valor = 8;
  } else if (
    letras == "i" ||
    letras == "r" ||
    letras == "í" ||
    letras == "ì" ||
    letras == "ï"
  ) {
    valor = 9;
  }

  return valor;
};

export default mapeo;

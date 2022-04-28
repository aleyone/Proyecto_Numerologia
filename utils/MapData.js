var dameDatos = {},
  dataPuentes = {},
  listPuentes = {};

var arrIniciales = []

const mapeo = (letters, iniciales) => {
  arrIniciales = iniciales;
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
  var hasUno = false,
    hasDos = false,
    hasTres = false,
    hasCuatro = false,
    hasCinco = false,
    hasSeis = false,
    hasSiete = false,
    hasOcho = false,
    hasNueve = false;
  console.log("he entrado en mapeo");
  console.log("Estas son las letras que recibo: " + letters);
  var letra = letters.split("");
  console.log("Estas son las letras para hacer el map: " + letra);

  const rellenar = () => {
    console.log("estoy dentro del rellenar");
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

  const resultado = letra.map(function (letras) {
    if (letras == "a" || letras == "j" || letras == "s") {
      contadorLetras["uno"] = habitanteUno++;
      hasUno = true;
    } else if (letras == "b" || letras == "k" || letras == "t") {
      contadorLetras["dos"] = habitanteDos++;
      hasDos = true;
    } else if (letras == "c" || letras == "l" || letras == "u") {
      contadorLetras["tres"] = habitanteTres++;
      hasTres = true;
    } else if (letras == "d" || letras == "m" || letras == "v") {
      contadorLetras["cuatro"] = habitanteCuatro++;
      hasCuatro = true;
    } else if (
      letras == "e" ||
      letras == "n" ||
      letras == "w" ||
      letras == "ñ"
    ) {
      contadorLetras["cinco"] = habitanteCinco++;
      hasCinco = true;
    } else if (letras == "f" || letras == "o" || letras == "x") {
      contadorLetras["seis"] = habitanteSeis++;
      hasSeis = true;
    } else if (letras == "g" || letras == "p" || letras == "y") {
      contadorLetras["siete"] = habitanteSiete++;
      hasSiete = true;
    } else if (letras == "h" || letras == "q" || letras == "z") {
      contadorLetras["ocho"] = habitanteOcho++;
      hasOcho = true;
    } else if (letras == "i" || letras == "r") {
      contadorLetras["nueve"] = habitanteNueve++;
      hasNueve = true;
    }

    return resultado;
  });

  // Llamar funciones tras sacar habitantes
  dameDatos = { Habitantes: contadorLetras, "Número puente": listPuentes };

  rellenar();
  listPuentes = numPuente(dameDatos);
  console.log("Puentes desde dameDatos", listPuentes);

  /* setTimeout (function rellenar(){
        console.log("estoy dentro del rellenar");
        if (hasUno==false) contadorLetras['uno'] = 0;
        if (hasDos==false) contadorLetras['dos'] = 0;
        if (hasTres==false) contadorLetras['tres'] = 0;
        if (hasCuatro==false) contadorLetras['cuatro'] = 0;
        if (hasCinco==false) contadorLetras['cinco'] = 0;
        if (hasSeis==false) contadorLetras['seis'] = 0;
        if (hasSiete==false) contadorLetras['siete'] = 0;
        if (hasOcho==false) contadorLetras['ocho'] = 0;
        if (hasNueve==false) contadorLetras['nueve'] = 0;
    }, 5000);*/
  console.log("Esto es dameDatos:=========\n", dameDatos);
  return dameDatos;
};

export default mapeo;

// Calcular número puente

const numPuente = (dameDatos) => {
  console.log("Hemos entrado a los puentes");
  const puente = { dataPuentes };
  dataPuentes = {
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
  dataPuentes["uno"] = Math.abs(dameDatos.Habitantes.uno - 1);
  dataPuentes["dos"] = Math.abs(dameDatos.Habitantes.dos - 2);
  dataPuentes["tres"] = Math.abs(dameDatos.Habitantes.tres - 3);
  dataPuentes["cuatro"] = Math.abs(dameDatos.Habitantes.cuatro - 4);
  dataPuentes["cinco"] = Math.abs(dameDatos.Habitantes.cinco - 5);
  dataPuentes["seis"] = Math.abs(dameDatos.Habitantes.seis - 6);
  dataPuentes["siete"] = Math.abs(dameDatos.Habitantes.siete - 7);
  dataPuentes["ocho"] = Math.abs(dameDatos.Habitantes.ocho - 8);
  dataPuentes["nueve"] = Math.abs(dameDatos.Habitantes.nueve - 9);

  console.log(puente);

  return puente;
};

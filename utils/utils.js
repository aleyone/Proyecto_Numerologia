var hijo=0;
var pareja=0;
var hermano=0;
var padre = 0;
var madre=0;
var abuelopaterno=0;
var abuelomaterno=0;
var abuelapaterna=0;
var abuelamaterna=0;

export function validarEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function getFecha() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10 && day < 10) {
    date = `0${day}-0${month}-${year}`;
  } else if (day < 10) {
    date = `0${day}-${month}-${year}`;
  } else if (month < 10) {
    date = `${day}-0${month}-${year}`;
  } else {
    date = `${day}-${month}-${year}`;
  }
  return date;
}

export function contadorHijos() {
  hijo++;
  return hijo;  
}

export function contadorParejas() {
  pareja++;
  return pareja;  
}

export function contadorHermanos() {
  hermano++;
  return hermano;  
}

export function setPadres(padres){
  var contador=0;
  contador+=padres
  padre=contador;
  console.log("hay "+padre+" padres")
}

export function contadorPadres() {
  return padre;
}

export function setMadres(madres){
  var contador=0;
  contador+=madres
  madre=contador
  console.log("hay "+madre+" madres")
}

export function contadorMadres() {
  return madre;
}

export function setAbueloPaterno(abopat){
  var contador=0;
  contador+=abopat;
  abuelopaterno=contador
  console.log("hay "+abuelopaterno+" abuelo paterno")
}

export function contadorAbueloPaterno() {
  abuelopaterno++;
  return abuelopaterno;
}

export function setAbuelaPaterna(abapat){
  var contador=0;
  contador+=abapat
  abuelapaterna=contador
  console.log("hay "+abuelapaterna+" abuela paterna")
}

export function contadorAbuelaPaterna() {
  abuelapaterna++;
  return abuelapaterna;
}

export function setAbueloMaterno(abomat){
  var contador=0;
  contador+=abomat;
  abuelomaterno=contador
  console.log("hay "+abuelomaterno+" abuelo materno")
}

export function contadorAbueloMaterno() {
  abuelomaterno++;
  return abuelomaterno;
}

export function setAbuelaMaterna(abamat){
  var contador=0;
  contador+=abamat;
  abuelamaterna=contador
  console.log("hay "+abuelamaterna+" abuelamaterna")
}

export function contadorAbuelaMaterna() {
  abuelamaterna++;
  return abuelamaterna;
}


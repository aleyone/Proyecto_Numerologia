import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { deleteField } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkqd3l6kSE98oxepyzyWoqy1s3BYStkCI",
  authDomain: "login-807cb.firebaseapp.com",
  projectId: "login-807cb",
  storageBucket: "login-807cb.appspot.com",
  messagingSenderId: "263532341312",
  appId: "1:263532341312:web:e4e4601a19e05bc97017a5",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore(firebaseApp);

export const añadirEstudio = async (collection, data) => {
  try {
    const response = await db.collection(collection).add(data);
  } catch {
    console.log("Error al guardar.");
  }
};

export const obtenerEstudios = async (collection, user) => {
  const response = await db.collection(collection).get();
  const arrayData = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return arrayData;
};

export const obtenerFamiliar = async (collection, id) => {
  const response = db.collection(collection).doc(id);
  const detalle = await response.get();
  const documento = detalle.data();
  const arrayData = [];
  const familiares = documento.Datos_familiares;

  Object.keys(familiares).forEach(function (key) {
    var val = familiares[key];
    arrayData.push(val);
  });
  return arrayData;
};

export const deleteFamiliar = async (collection, id, rol) => {
  console.log("¿¿Llegamos??");
  const rol2 = "Datos_familiares." + rol;
  //const doc =
  db.collection(collection)
    .doc(id)
    .update({ [rol2]: deleteField() });
  console.log(rol, "actualizado en bbdd");
};

export const unEstudio = async (collection, id) => {
  const response = db.collection(collection).doc(id);
  const detalle = await response.get();
  const documento = detalle.data();
  return documento;
};

export const deleteEstudio = async (collection, id) => {
  const doc = db.collection(collection).doc(id);
  await doc.delete();
};

export const updateData = async (collection, id, rol, datos) => {
  const rol2 = "Datos_familiares." + rol;
  //const doc =
  db.collection(collection)
    .doc(id)
    .update({ [rol2]: datos });
  console.log(rol, "añadido en bbdd");
};

export const obtenerFechas = async (collection, id) => {
  const response = db.collection(collection).doc(id);
  const detalle = await response.get();
  const documento = detalle.data();
  const arrayFamiliares=[]
  const arrayData = [];
  const arrayGuay=[]
  const familiares = documento.Datos_familiares;
  
  arrayData.push({Rol:"Consultante", Nombre: documento.Datos_personales.Nombre_consultante.Nombre, Dia: documento.Datos_personales.Fecha_de_nacimiento.Dia, Mes: documento.Datos_personales.Fecha_de_nacimiento.Mes, Anyo: documento.Datos_personales.Fecha_de_nacimiento.Anyo})
  console.log("Este es el arrayData después del arrayUser", arrayData)
  //Primero hacemos push de la fecha del usuario para la posición [0]
  // Luego recorremos los familiares para ver si hay datos y añadimos a continuación
  if (familiares != null) {
    Object.keys(familiares).forEach(function (key) {
      var val = familiares[key];
      arrayData.push({Rol: val.rol, Nombre: val.name, Dia: val.day, Mes: val.month, Anyo: val.year});
    });
  }
  
  console.log("Esto es el arrayData después de arrayFamiliares", arrayData)
  
  for (var x=0; x<(arrayFamiliares.length); x++) {
    arrayGuay.push(arrayFamiliares[x]);
  }

  console.log("Esto es el arrayGuay: ", arrayGuay)
  arrayData.push(arrayGuay)
  console.log(
    "Esto sería la fecha del usuario, posición 0 del array: ",
    arrayData[0]
  );
  console.log("Esto sería todo el arrayData entero ", arrayData);

  return arrayData;
};

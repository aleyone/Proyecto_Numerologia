import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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
  const arrayData=[]
  const familiares = documento.Datos_familiares;
 
  Object.keys(familiares).forEach(function (key) {
    var val = familiares[key];
    arrayData.push(val)
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    console.log(val)
    // use val
})

  console.log("Probando nuevo array a ver qué pasa: ", arrayData);
  // arrayData.push(documento.Datos_familiares.Padre);
  /*for (var clave in documento) {
    if (documento.hasOwnProperty(clave)) {
      if (clave == "Datos_familiares") {
        arrayData.push(documento[clave]);
      }
    }
  }*/

  return arrayData;
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
  /*console.log("rol recibido en update: ",rol)
  console.log("Estos son los datos: ", datos)
  console.log("Vamos a acceder a detalle de los datos")
  console.log(datos.name)
  console.log(datos.day)
  console.log(datos.month)
  console.log(datos.year)*/
  const doc = db
    .collection(collection)
    .doc(id)
    .update({ [rol2]: datos });
};

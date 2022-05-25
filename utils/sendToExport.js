import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Button } from "react-native-elements";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
//import { basemap } from "../screens/NumerologiaEvolutiva";

export const sendToExport = (tipo, basemap) => {
  //const base = basemap;
  //const [impresora, setImpresora] = useState()
  console.log("He llegado a utils-sendToExport y esta es la base: ", basemap);
  console.log("Sigo aqui y esto es base0 ", basemap[0]);
  let html = `<html style="border: 5px solid #3b2870;">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  
    </head>
  <body bgcolor="#d8d0ee">
  <div style="margin-top: 20px; margin-bottom: 50px;">
  <span style="padding: 20px; color: #6f0e8a; font-size: 20px; font-weight: bold; margin-bottom: 25px"}}> Numerología Evolutiva </span>
  </div>
    
  

    <div>`;
  if (tipo == "evolutiva") {
    html += `<table align="left" border="1" bordercolor="#3b2870">

<thead>
<tr>
<div style="border: 1px solid black; background-color: #EDEAF4; margin-bottom: 20px;">

<th>Casa</th>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
<th>5</th>
<th>6</th>
<th>7</th>
<th>8</th>
<th>9</th>
</div>
</tr>
</thead>
<tbody>
<tr>
<td>Base<br></td>`;
    if (basemap.length != 0) {
      console.log("Estoy en el if base");
      basemap[0].map((registro) => {
        html += `<td>` + registro + `</td>`;
      });
    }

    html += `</tr><tr>
  <td>Puente<br></td>`;

    if (basemap.length != 0) {
      console.log("Estoy en el if puente");
      basemap[1].map((registro) => {
        html += `<td>` + registro + `</td>`;
      });
    }

    html += `</tr><tr>
  <td>Evolución<br></td>`;

    if (basemap.length != 0) {
      console.log("Estoy en el if evolución");
      basemap[2].map((registro) => {
        html += `<td>` + registro + `</td>`;
      });
    }

    html += `</tr><tr>
  <td>Inconsciente<br></td>`;

    if (basemap.length != 0) {
      console.log("Estoy en el if inconsciente");
      basemap[3].map((registro) => {
        html += `<td>` + registro + `</td>`;
      });
    }

    html += `</tr>
  
  </tbody>
  </table>`;
  } else if (tipo == "familiar") {
    basemap.map((registro, index) => {
      console.log("hola, soy familiar en export", basemap[index]);

      html +=
        `<br><p align="center" border="1" bordercolor="red">` +
        registro.Rol +
        `: ` +
        registro.Nombre +
        `</p><br><table align="left" border="1" bordercolor="#3b2870">
      <tbody>
      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>` +
        registro.Maestro +
        `</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      <td>` +
        registro.Ancestro1 +
        `</td>
      <td>&nbsp;</td>
      <td>` +
        registro.Ancestro2 +
        `</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td>` +
        registro.Mes +
        `</td>
      <td>&nbsp;</td>
      <td>` +
        registro.Dia +
        `</td>
      <td>&nbsp;</td>
      <td>` +
        registro.Anyo +
        `</td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      <td>` +
        registro.Emocional1 +
        `</td>
      <td>&nbsp;</td>
      <td>` +
        registro.Emocional2 +
        `</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>` +
        registro.Anclaje +
        `</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      </tr>
      </tbody>
      </table>
      `;
    });
  } else if (tipo == "ciclo") {
    console.log("hola, soy ciclos en export");
  }

  html += `     
  </body>
</html>
`;

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: impresora?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  /*const selectPrinter = async () => {
      const printer = await Print.selectPrinterAsync(); // iOS only
      setImpresora(printer);
    }*/

  return (
    <View>
      <Button title="Print" onPress={print} />

      <Button title="Print to PDF file" onPress={printToFile()} />
    </View>
  );
};

const styles = StyleSheet.create({});

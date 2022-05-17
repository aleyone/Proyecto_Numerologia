import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Button } from "react-native-elements";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
//import { basemap } from "../screens/NumerologiaEvolutiva";

export const sendToExport = (basemap) =>{
  //const base = basemap;
  //const [impresora, setImpresora] = useState()
  console.log("He llegado a utils-sendToExport y esta es la base: ", basemap);
  let html = `<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body>
    <div id="cuerpo">
    <style>
.demo {
border:1px sólido #C0C0C0;
border-collapse:colapso;
padding:5px;
}
.demo th {
border:1px sólido #C0C0C0;
padding:5px;
background:#F0F0F0;
}
.demo td {
border:1px sólido #C0C0C0;
padding:5px;
}
</style>
<table class="demo">
<caption>Numerología Evolutiva</caption>
<thead>
<tr>
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
</tr>
</thead>
<tbody>
<tr>
<td>Base<br></td>`;
  if (basemap.length != 0) {
    console.log("Estoy en el if base")
    basemap[0].map((registro) => {
      html += `<td>` + registro + `</td>`;
    });
  }

  html+= `</tr><tr>
  <td>Puente<br></td>`;

  if (basemap.length != 0) {
    console.log("Estoy en el if puente")
    basemap[1].map((registro) => {
      html += `<td>` + registro + `</td>`;
    });
  }

  html+= `</tr><tr>
  <td>Evolución<br></td>`;

  if (basemap.length != 0) {
    console.log("Estoy en el if evolución")
    basemap[2].map((registro) => {
      html += `<td>` + registro + `</td>`;
    });
  }

  html+= `</tr><tr>
  <td>Inconsciente<br></td>`;

  if (basemap.length != 0) {
    console.log("Estoy en el if inconsciente")
    basemap[3].map((registro) => {
      html += `<td>` + registro + `</td>`;
    });
  }

  html += `</tr>
  
  </tbody>
  </table>`;
  /*<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Evolución<br></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>Inconsciente</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>*/

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
}

const styles = StyleSheet.create({});

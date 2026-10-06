import fs from "fs";
import Papa from "papaparse";
import MLR from "ml-regression-multivariate-linear";

// Opetetaan malli ja palautetaan se, jotta sitä voidaan käyttää ennustamiseen
export function opetaMalli() {

  // Lue CSV-tiedosto tekstinä
const csvData = fs.readFileSync("./asunnot_suomi_10000_numeric_v2.csv", "utf8");
console.log("CSV-tiedosto luettu: ", csvData.length, " merkkiä");

// jäsennetään opetusdata CSV-muodosta JavaScript-objekteiksi
const parsed = Papa.parse(csvData, {
  header: true,         // Käytetään ensimmäistä riviä otsikoina
  dynamicTyping: true,  // Muuntaa numeromerkkijonot automaattisesti luvuiksi (number)
  skipEmptyLines: true  // Ohitetaan tyhjät rivit
});
console.log("CSV-tiedosto jäsennelty. Rivit: ", parsed.data.length);

// Erotellaan X (syötteet) ja Y (syötteen tulokset (hinta))
const x = [];
const y = [];

parsed.data.forEach((row) => {
  // Valitaan X-sarakkeet (ominaisuudet)
  x.push([row.pinta_ala, row.huoneita, row.rakennusvuosi,
    row.asunnon_tyyppi, row.kaupunki, row.postinumero, 
    row.kerros, row.hissi, row.parveke, 
    row.sauna, row.autopaikka, row.kunto,
    row.tontti]);

  // Valitaan Y-sarakkeet (ennustettavat arvot)
  y.push([row.hinta]);
});
console.log("Data luettu ja jäsennelty. Syötteitä: ", x.length, " Ennustettavia arvoja: ", y.length);

// Luodaan ja opetetaan MLR-malli
const mlr = new MLR(x, y);
console.log("MLR-malli opetettu");
return mlr;
}


// Ennusteen lasku funktio, joka ottaa opetetun MLR-mallin ja arvioitavan talon ominaisuudet
export function teeEnnuste(OpetettuMLR, arvioitavaTalo) {
  const ennuste = OpetettuMLR.predict(arvioitavaTalo);
  console.log("Ennuste tehty: ", Math.round(ennuste));
  return Math.round(ennuste);
}


// *** TESTITAPAUS ***
/* const arvioitavaTalo = [
  52,    // pinta_ala (m²)
  3,     // huoneita
  1958,  // rakennusvuosi
  1,     // asunnon_tyyppi 
  1,     // kaupunki 
  100, // postinumero (ilman etu nollia)
  4,     // kerros
  1,     // hissi
  1,     // parveke
  0,     // sauna
  1,     // autopaikka
  3,     // kunto
  0    // tontti
]; */

// Testi ennustus
/* const testiEnnuste = teeEnnuste(opetaMalli(), arvioitavaTalo);
 console.log("Testi ennuste: ", testiEnnuste); */
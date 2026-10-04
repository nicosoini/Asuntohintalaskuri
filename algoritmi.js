import fs from "fs";
import Papa from "papaparse";
import MLR from "ml-regression-multivariate-linear";

// Lue CSV-tiedosto tekstinä
const csvData = fs.readFileSync("./asunnot_suomi_10000_numeric_v2.csv", "utf8");

// Jäsennä CSV taulukoksi
const parsed = Papa.parse(csvData, {
  header: true,         // Käytetään ensimmäistä riviä otsikoina
  dynamicTyping: true,  // Muuntaa numeromerkkijonot automaattisesti luvuiksi (number)
  skipEmptyLines: true  // Ohitetaan tyhjät rivit
});

// Erotellaan X (syötteet) ja Y (tulokset)
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

// Luodaan ja opetetaan MLR-malli
const mlr = new MLR(x, y);

// Tehdään ennuste     *** TESTITAPAUS ***
const arvioitavaTalo = [
  52,    // pinta_ala (m²)
  3,     // huoneita
  1958,  // rakennusvuosi
  1,     // asunnon_tyyppi (esim. 1 = kerrostalo)
  1,     // kaupunki (esim. 1 = Helsinki)
  100, // postinumero (tai poistettu nolla: 100)
  4,     // kerros
  1,     // hissi
  1,     // parveke
  0,     // sauna
  1,     // autopaikka
  3,     // kunto
  1    // tontti (m²)
];
const ennuste = mlr.predict(arvioitavaTalo);

console.log("Ennustettu myyntihinta: ", ennuste);
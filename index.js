
// Tuodaan Koneoppimismallin opetus ja ennustus funktiot
import { opetaMalli, teeEnnuste } from "./algoritmi.js";

const opetettuMLR = opetaMalli();

// *** TESTITAPAUS ***
 const arvioitavaTalo = [
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
];

const hintaArvio = teeEnnuste(opetettuMLR, arvioitavaTalo);
console.log("Index.js Testi ennuste: ", hintaArvio);
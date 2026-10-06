# Asuntohintalaskuri
Sovellus on osa Laurea-ammattikorkeakoulun kurssi Sovelluskehitysprojektia. Projektin ensisijaisena tavoitteena on rakentaa vakaa ja joustava ohjelmistosovellus, joka pystyy mukautumaan muuttuviin vaatimuksiin. Kehitysprosessissa noudatetaan ketterää (agile) menetelmää, mikä mahdollistaa iteratiiviset parannukset, jatkuvan palautteen ja toiminnallisten komponenttien nopean toimituksen. Projekti kattaa ohjelmistokehityksen elinkaaren (SDLC) kaikki vaiheet, mukaan lukien vaatimusmäärittelyn, suunnittelun, kehityksen, testauksen, käyttöönoton ja ylläpidon.

Sovelluksemme on Asuntohintalaskuri, joka tarjoaa käyttäjälle selvän ja helpon tavan selvittää oman asuntonsa arvo.

### Tekijät

Jiro Pärnänen (ParnanenJ)

Nico Soini (nicosoini)

Miku Honkanen (Miku-laurea)

Saara Orvas (Saara-o)

Martin Smerling (MartinSmerling)

### Käyttöiittymä

Käyttöliittymä on suunniteltu käyttäen Figman työkaluja ja toteutettu html, css ja JavaScript -toiminnoilla. Käyttöliittymä tarjoaa selkeän etusivun, joka vie formsiin, johon käyttäjä täyttää seuraavat tiedot:
- Sijainti
- Neliömäärä
- Postinumero
- Huonemäärän
- Hinta
- Rakennusvuosi
- Kerros
- Muut lisäominaisuudet (Hissi, Sauna, Parveke)

### Sovellus löytyy osoitteesta: ....

### Sovelluksen toiminnallisuus:
#### Opetusdata

Opetusdatasetti on luotu Google Gemini -tekoälyllä, koska myytyjen asuntojen tietoja ei ole saatavilla maksuttomalla API:lla.  
Opetusdatasetissä on yhteensä 10 000 rivin opetusjoukko.  
Ensimmäinen rivi sisältää otsikot.  
Otsikointi:
- hinta (asunnon myyntihinta euroina (€))
- pinta_ala (neliömetreinä (m²))
- huoneita (huoneiden lukumäärä)
- rakennusvuosi (Valmistumisvuosi)
- asunnon_tyyppi (1 = Kerrostalo, 2 = Rivi-talo, 3 = Omakotitalo)
- kaupunki (1 = Helsinki, 2 = Espoo, 3 = Tampere, 4 = Turku, 5 = Oulu, 6 = Jyväskylä)
- postinumero (Kokonaisluku (esim. 100, 2230, 33100, 90100))
- kerros (Kerrosnumero)
- hissi (1 = Kyllä, 0 = Ei)
- parveke (1 = Kyllä, 0 = Ei)
- sauna (1 = Kyllä, 0 = Ei)
- autopaikka (1 = Kyllä, 0 = Ei)
- kunto (1 = Huono, 2 = Tyydyttävä, 3 = Hyvä, 4 = Erinomainen)
- tontti (1 = Omistus, 0 = Vuokra)

#### Koneoppimismalli

Koneoppimismalli on toteutettu [multivariate linear regression](https://www.npmjs.com/package/ml-regression-multivariate-linear?activeTab=readme) -kirjastoa hyödyntäen.  
Malli löytyy tiedostosta [algoritmi.js](https://github.com/nicosoini/Asuntohintalaskuri/blob/main/algoritmi.js). Malli on jaettu kahteen funktioon (opetaMalli() sekä teeEnnuste(OpetettuMLR, arvioitavaTalo)).  
- opetaMalli(): Hakee opetusdatasetin --> jäsennetään opetusdatan CSV-muodosta JavaScript-objekteiksi --> erottelee opetusdatasetistä X (asuntojenominausuudet) ja Y (ominaisuuksien tulokset (hinta)) --> opettaa mallin --> palattaa opetetun mallin.
- teeEnnuste(OpetettuMLR, arvioitavaTalo): Ottaa parametrina opetetun mallin, joka on opetettu opetaMalli() funktiolla sekä käyttäjän asunnonominaisuudet taulukkona. --> tekee hintaennustuksen käyttäen opetettua mallia sekä käyttäjän asunnonominaisuuksia --> palauttaa hinta-arvion kokonaislukuna.

Molemmat funktiot ovat importattu ja käytössä [index.js](https://github.com/nicosoini/Asuntohintalaskuri/blob/main/index.js) tiedostossa.  

Koneoppimismallin luomisessa on hyödynnetty Google Gemini -tekoälyä. Tekoälyä on hyödynnetty kirjaston käytön ymmärtämisessä sekä käyttötilanteen yhteensovittamisessa (x ja y matriisien käyttö asuntohintalaskuri käyttötilanteessa)

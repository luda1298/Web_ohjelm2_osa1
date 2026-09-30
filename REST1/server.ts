//const express = require("express");
import express from "express";
import fs from "fs";
import type { Request, Response, NextFunction } from "express";
//const fs = require("fs");

const app = express();

const port = 3000;

const sanakirja: { fin: string; eng: string }[] = [];

const data = fs.readFileSync("./sanakirja.txt", {
  encoding: "utf8",
  flag: "r",
});

const splitLines = data.split(/\r?\n/); //jaetaan merkkijono rivin vaihtojen perusteella

splitLines.forEach((line) => {
  const sanat = line.split(" "); //jaetaan yhden rivin merkkijono kahteen osaan

  const sana = {
    fin: sanat[0],
    eng: sanat[1],
  };

  sanakirja.push(sana);
});

console.log(sanakirja);

app.use(express.json()); //käytetään json -muotoista dataa

app.use(express.urlencoded({ extended: true })); //käytetään tiedonsiirrossa laajennettua muotoa

//CORS -määrittely
app.use(function (req: Request, res: Response, next: NextFunction) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token",
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-type", "application/json");

  next();
});

app.get("/sanakirja", (req, res) => {
  res.json(sanakirja);
});

//yhden sanan haku
// Haetaan suomenkielinen sana URL-parametrista
app.get("/sanakirja/:word", (req, res) => {
  const searchWord = req.params.word;

  // Etsitään sana sanakirja-taulukosta
  const foundWord = sanakirja.find((word) => word.fin === searchWord);

  // Jos sana löytyy, palautetaan englanninkielinen vastine
  if (foundWord) {
    res.json({ eng: foundWord.eng });
  } else {
    // Jos sanaa ei löydy, palautetaan 404-virhe
    res.status(404).json({ message: "Sanaa ei löytynyt" });
  }
});

// Uuden sanaparin lisääminen sanakirjaan
app.post("/sanakirja", (req, res) => {
  // Luetaan uusi sana JSON-muotoisesta request bodysta
  const newWord = req.body;
  console.log(newWord);

  // Lisätään uusi sana sanakirja-taulukkoon
  sanakirja.push(newWord);

  // tiedostoon tallennettava rivi
  const newLine = `${newWord.fin} ${newWord.eng}\n`;

  // Lisätään uusi sanapari sanakirja.txt-tiedoston loppuun
  fs.writeFileSync("./sanakirja.txt", newLine, {
    flag: "a",
  });

  res.status(201).json({ message: "Sana lisätty sanakirjaan" });
});

app.listen(port, () => {
  console.log(`Kuunnellaan portissa ${port}`);
});

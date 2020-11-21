import express from "express";
import fs from "fs";

const CODES_FILE_PATH = "codes.txt";
const codes = fs
  .readFileSync(CODES_FILE_PATH)
  .toString()
  .split("\n")
  .map((line) => line.toLowerCase());
console.log(`Loaded ${codes.length} codes from ${CODES_FILE_PATH}.`);

const app = express();
const port = process.env.PORT || 3000;

app.get("/code/:code", (request, response) => {
  const { code } = request.params;
  const exists = codes.includes(code?.toLowerCase());
  console.log(
    `Request: code ${code} - ${exists ? "EXISTS" : "DOES NOT EXIST"}`
  );
  exists
    ? response.status(200).send(`${code} OK`)
    : response.status(404).send(`${code} not found`);
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

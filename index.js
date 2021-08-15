import express from "express";
import path from "path";
import { simulate } from "./simulation.js";
const app = express();

const server = app.listen(8088, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/", (request, response) => {
  response.sendFile(path.resolve("./index.html"));
});

app.get("/simulation", async (request, response) => {
  const simulation = await simulate();

  response.send(simulation);
});

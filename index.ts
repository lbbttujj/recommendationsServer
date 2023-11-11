import express from "express";
import bodyParser from "body-parser";
import https from "https";
import http from 'http';
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs'
import cors from "cors";
import { root } from "./graphql/resolvers";

const PORT = process.env.PORT;

console.log("PORT: ", PORT);

const app = express();
app.use(bodyParser.json({ limit: "3mb" }));
app.use(cors({ origin: '*' }))

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: root,
  })
);




app.use('/', ((req, res) => {
  if (!req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
}))

const options = {
  key: fs.readFileSync("certs/server.key"),
  cert: fs.readFileSync("certs/certificate.crt"),
  ca: fs.readFileSync('certs/intermediate.crt'),
};

app.use(express.json());
async function start() {
  try {
    http.createServer(app).listen(80)
    https.createServer(options, app).listen(PORT, () => {
      console.log("server work");
    })
  } catch (e) {
    console.log(e);
  }
}

start();

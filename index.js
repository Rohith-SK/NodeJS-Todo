require("dotenv").config();
const express = require("express");
const app = express();
const routerPage = require("./router/index.router");
const { dbConnection } = require("./services/db.services");

app.use(express.json());

app.use("/", routerPage);

const port = process.env.PORT || 5000;

dbConnection()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`🚀 server running on port: ${port} 🚀 `);
});

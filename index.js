const express = require("express");
const expressConfig = require("./config/expressConfig");

start();

async function start() {
  const app = express();

  expressConfig(app);

  app.get("/", (req, res) => res.render("home", { layout: false }));

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

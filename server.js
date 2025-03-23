const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("./data/database");
const port = process.env.PORT || 3100;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, 2-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/", require("./routes"));

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`running on port ${port}, database connected`);
    });
  }
});

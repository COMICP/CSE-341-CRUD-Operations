const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['testMessage']
  res.send("is this thing on");
});

router.use("/contacts", require("./users"));
module.exports = router;

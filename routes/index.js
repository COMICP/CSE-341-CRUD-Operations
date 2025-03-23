const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['testMessage']
  res.send("is this thing on");
});

router.use("/clients", require("./clients"));
router.use("/jobs", require("./jobs"));
module.exports = router;

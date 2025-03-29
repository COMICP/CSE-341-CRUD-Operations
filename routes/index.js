const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['testMessage']
  res.send("is this thing on");
});

router.use("/clients", require("./clients"));
router.use("/jobs", require("./jobs"));

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if(err){ return next(err);}
    res.redirect('/')
  })
})
module.exports = router;

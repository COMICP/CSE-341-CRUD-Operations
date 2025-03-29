const express = require("express");
const router = require("express").Router();
const contactsController = require("../controllers/clients");
const validator = require("../validation/client.js");
const checkUser = require('../validation/checkuser.js');

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/",checkUser.isAuthenticated, validator,  contactsController.createCont);

router.put("/:id",checkUser.isAuthenticated, validator, contactsController.updateCont);

router.delete("/:id", contactsController.deleteCont);

module.exports = router;

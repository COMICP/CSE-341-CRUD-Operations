const express = require("express");
const router = require("express").Router();
const contactsController = require("../controllers/clients");
const validator = require("../validation/client.js");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/",validator,  contactsController.createCont);

router.put("/:id", validator, contactsController.updateCont);

router.delete("/:id", contactsController.deleteCont);

module.exports = router;

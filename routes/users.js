const express = require("express");
const router = require("express").Router();
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", contactsController.createCont);

router.put("/:id", contactsController.updateCont);

router.delete("/:id", contactsController.deleteCont);

module.exports = router;

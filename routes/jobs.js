const express = require("express");
const router = require("express").Router();
const contactsController = require("../controllers/jobs.js");

router.get("/", contactsController.getAllJobs);

router.get("/:id", contactsController.getSingleJob);

router.post("/", contactsController.createJob);

router.put("/:id", contactsController.updateJob);

router.delete("/:id", contactsController.deleteJob);

module.exports = router;

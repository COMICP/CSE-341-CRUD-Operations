const express = require("express");
const router = require("express").Router();
const jobValidatoin = require("../validation/job.js");
const contactsController = require("../controllers/jobs.js");

router.get("/", contactsController.getAllJobs);

router.get("/:id", contactsController.getSingleJob);

router.post("/", jobValidatoin, contactsController.createJob);

router.put("/:id", jobValidatoin, contactsController.updateJob);

router.delete("/:id", contactsController.deleteJob);

module.exports = router;

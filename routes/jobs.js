const express = require("express");
const router = require("express").Router();
const jobValidatoin = require("../validation/job.js");
const contactsController = require("../controllers/jobs.js");
const checkUser = require('../validation/checkuser.js');


router.get("/", contactsController.getAllJobs);

router.get("/:id", contactsController.getSingleJob);

router.post("/",checkUser.isAuthenticated, jobValidatoin, contactsController.createJob);

router.put("/:id",checkUser.isAuthenticated, jobValidatoin, contactsController.updateJob);

router.delete("/:id", contactsController.deleteJob);

module.exports = router;

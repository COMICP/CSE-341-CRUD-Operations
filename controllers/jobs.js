const mongodb = require("../data/database");
const { get } = require("../routes");
const objectId = require("mongodb").ObjectId;

const getAllJobs = async (req, res) => {
  //#swagger.tags=['jobs']
  const result = await mongodb.getDatabase().db().collection("Jobs").find();
  result.toArray().then((users) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json(users);
    console.log(users);
  });
};

const getSingleJob = async (req, res) => {
  //#swagger.tags=['Jobs']
  const jobID = new objectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("Jobs")
    .find({ _id: jobID });
  result.toArray().then((users) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json(users);
  });
};

const createJob = async (req, res) => {
  //#swagger.tags=['Jobs']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Jobs")
    .insertOne(contact);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    console.log(response);
    res
      .status(500)
      .json(response.error || "some error occured updating the contact.");
  }
};

const updateJob = async (req, res) => {
  //#swagger.tags=['Jobs']
  const jobID = new objectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Jobs")
    .replaceOne({ _id: jobID }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "some error occured updating the contact.");
  }
};

const deleteJob = async (req, res) => {
  //#swagger.tags=['Jobs']
  const jobID = new objectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("jobs")
    .deleteOne({ _id: jobID });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "some error occured updating the contact.");
  }
};
module.exports = {
  getAllJobs,
  getSingleJob,
  updateJob,
  createJob,
  deleteJob,
};

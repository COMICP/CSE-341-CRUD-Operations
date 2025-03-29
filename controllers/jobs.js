const mongodb = require("../data/database");
const { get } = require("../routes");
const objectId = require("mongodb").ObjectId;

const getAllJobs = async (req, res) => {
  try {
    //#swagger.tags=['Jobs']
    const jobs = await mongodb
      .getDatabase()
      .db()
      .collection("Jobs")
      .find()
      .toArray();

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.setHeader("content-type", "application/json");
    res.status(200).json(jobs);
    console.log(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleJob = async (req, res) => {
  try {
    //#swagger.tags=['Jobs']
    const jobID = new objectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Jobs")
      .findOne({ _id: jobID });

    if (!result) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.setHeader("content-type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createJob = async (req, res) => {
  try {
    //#swagger.tags=['Jobs']
    const contact = {
      ownerID: req.body.ownerID,
      title: req.body.title,
      address: req.body.address,
      date: req.body.date,
      price: req.body.price,
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
        .json(response.error || "Some error occurred while creating the job.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    //#swagger.tags=['Jobs']
    const jobID = new objectId(req.params.id);
    const contact = {
      ownerID: req.body.ownerID,
      title: req.body.title,
      address: req.body.address,
      date: req.body.date,
      price: req.body.price,
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
        .json(response.error || "Some error occurred while updating the job.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    //#swagger.tags=['Jobs']
    const jobID = new objectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Jobs")
      .deleteOne({ _id: jobID });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the job.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};

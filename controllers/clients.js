const mongodb = require("../data/database");
const { get } = require("../routes");
const objectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    //#swagger.tags=['Clients']
    const lists = await mongodb
      .getDatabase()
      .db()
      .collection("Clients")
      .find()
      .toArray();

    res.setHeader("content-type", "application/json");
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Clients']
  const clientID = new objectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Clients")
      .findOne({ _id: clientID });

    if (!result) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.setHeader("content-type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const createCont = async (req, res) => {
  //#swagger.tags=['Clients']
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Clients")
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

const updateCont = async (req, res) => {
  //#swagger.tags=['Clients']
  const clientID = new objectId(req.params.id);
  const contact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Clients")
    .replaceOne({ _id: clientID }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "some error occured updating the contact.");
  }
};

const deleteCont = async (req, res) => {
  //#swagger.tags=['Clients']
  const clientID = new objectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Clients")
    .deleteOne({ _id: clientID });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "some error occured updating the contact.");
  }
};
module.exports = {
  getAll,
  getSingle,
  updateCont,
  createCont,
  deleteCont,
};

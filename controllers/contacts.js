const mongodb = require("../data/database");
const { get } = require("../routes");
const objectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((users) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json(users);
    console.log(users);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userID = new objectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: userID });
  result.toArray().then((users) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json(users);
  });
};

const createCont = async (req, res) => {
  //#swagger.tags=['Contacts']
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
    .collection("contacts")
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
  //#swagger.tags=['Contacts']
  const userID = new objectId(req.params.id);
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
    .collection("contacts")
    .replaceOne({ _id: userID }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "some error occured updating the contact.");
  }
};

const deleteCont = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userID = new objectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: userID });

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

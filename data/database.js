const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;
const initDB = (callback) => {
  if (database) {
    console.log("db already connected");
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error("database not initialized ");
  }
  return database;
};

module.exports = {
  initDB,
  getDatabase,
};

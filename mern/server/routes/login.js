const express = require ('express');

// This will help us connect to the database
const db = require ('../db/connection.js');

// This help convert the id from string to ObjectId for the _id.
const { ObjectId } = require ('mongodb');
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("Users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

module.exports =  router;
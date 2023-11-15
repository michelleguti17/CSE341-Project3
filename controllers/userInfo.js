const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('userInfo')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find a user.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('userInfo')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createUser = async (req, res) => {
  const user = {
    name: req.body.name,
    username: req.body.username,
    phone: req.body.phone,
    
  };
  const response = await mongodb.getDb().db().collection('userInfo').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to update a user.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const user = {
    name: req.body.name,
    username: req.body.username,
    phone: req.body.phone,
    
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('userInfo')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to delete a user.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('userInfo').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
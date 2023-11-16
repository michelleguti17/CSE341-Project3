const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDatabase()
    .db()
    .collection('userinfo')
    .find()
    .toArray((err, userinfo) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(userinfo);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid userinfo id to find a userinfo.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection('userinfo')
    .find({ _id: userId })
    .toArray((err, userinfo) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(userinfo[0]);
    });
};

const createUser = async (req, res) => {
  const userinfo = {
    name: req.body.name,
    username: req.body.username,
    phone: req.body.phone,
    
  };
  const response = await mongodb.getDatabase().db().collection('userinfo').insertOne(userinfo);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the userinfo.');
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid userinfo id to update a userinfo.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const userinfo = {
    name: req.body.name,
    username: req.body.username,
    phone: req.body.phone,
    
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('userinfo')
    .replaceOne({ _id: userId }, userinfo);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the userinfo.');
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid userinfo id to delete a userinfo.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('userinfo').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the userinfo.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = (req, res) => {
    mongodb
      .getDatabase()
      .db()
      .collection('userinfo')
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
      res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDatabase()
      .db()
      .collection('userinfo')
      .find({ _id: userId })
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  };

/* const getAll = async (req, res) => {
    //#swagger.tags=['Userinfo']
    const result = await mongodb.getDatabase().db().collection('userinfo').find();
    result.toArray().then((err, userinfo) => {
        if (err) {
            res.status(400).json({ message: err });
          }
           res.setHeader('Content-Type', 'application/json');
           res.status(200).json(userinfo);
        });
};

const getSingle = async (req, res) => {
        //#swagger.tags=['Userinfo']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('userinfo').find((userId));
    result.toArray().then((err, userinfo) => {
        if (err) {
            res.status(400).json({ message: err });
          }
           res.setHeader('Content-Type', 'application/json');
           res.status(200).json(userinfo[0]);
        });
}; */

const createUser = async (req, res) => {
        //#swagger.tags=['Userinfo']
    const user ={
         name: req.body.name,
         username: req.body.username,
         phone: req.body.phone,
    };
    const response = await mongodb.getDatabase().db().collection('userinfo').insertOne(user);
    if(response.acknowledged > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while creating the user.");
    }
};

const updateUser = async (req, res) => {
        //#swagger.tags=['Userinfo']
    if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid userinfo id to update a userinfo.');
    }
    const userId = new ObjectId(req.params.id);
    const user ={
         name: req.body.name,
         username: req.body.username,
         phone: req.body.phone,
    };
    const response = await mongodb.getDatabase().db().collection('userinfo').replaceOne({_id: userId}, user);
    if(response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the user.");
    }
};
const deleteUser = async (req, res) => {
        //#swagger.tags=['Userinfo']
     if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid userinfo id to delete a userinfo.');
          }    
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('userinfo').deleteOne({_id: userId}, true);
    console.log(response);
    if(response.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while deleting the user.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
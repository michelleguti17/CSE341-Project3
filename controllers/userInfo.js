const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('userInfo').find();
    result.toArray().then((userInfo) => {
           res.setHeader('Content-Type', 'application/json');
           res.status(200).json(userInfo);
        });
};

const getSingle = async (req, res) => {
        //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('userInfo').find((userId));
    result.toArray().then((userInfo) => {
           res.setHeader('Content-Type', 'application/json');
           res.status(200).json(userInfo[0]);
        });
};

const createUser = async (req, res) => {
        //#swagger.tags=['Users']
    const user ={
         name: req.body.name,
         username: req.body.username,
         phone: req.body.phone,
    };
    const response = await mongodb.getDatabase().db().collection('userInfo').insertOne(user);
    if(response.acknowledged > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while creating the user.");
    }
};

const updateUser = async (req, res) => {
        //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user ={
         name: req.body.name,
         username: req.body.username,
         phone: req.body.phone,
    };
    const response = await mongodb.getDatabase().db().collection('userInfo').replaceOne({_id: userId}, user);
    if(response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the user.");
    }
};
const deleteUser = async (req, res) => {
        //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('userInfo').deleteOne({_id: userId}, true);
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
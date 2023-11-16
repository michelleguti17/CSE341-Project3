const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Userinfo']
    const result = await mongodb.getDatabase().db().collection('userinfo').find();
    result.toArray().then((userinfo) => {
           res.setHeader('Content-Type', 'application/json');
           res.status(200).json(userinfo);
        });
};

const getSingle = async (req, res) => {
        //#swagger.tags=['Userinfo']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('userinfo').find((userId));
    result.toArray().then((userinfo) => {
           res.setHeader('Content-Type', 'application/json');
           res.status(200).json(userinfo[0]);
        });
};

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
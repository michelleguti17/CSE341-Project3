const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let db;

const initDb = (callback) => {
    if(db){
        console.log('Db is already initialized');
        return callback(null,db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
    .then((client)=>{
        db = client
        callback(null, db);

        })
        .catch((err) => {
            callback(err);
        });

};


const getDatabase =() => {
    if(!db){
        throw Error('Db is not initialized');
        
    }
    return db;



};
module.exports = {
    initDb,
    getDatabase
};

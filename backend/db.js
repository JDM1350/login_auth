const mongoose = require("mongoose");
 //const mongoURl="mongodb://localhost:27017"
// const mongoURl="mongodb://localhost:27017/"

// const connectTOMongo=()=>{
  //   mongoose.connect(mongoURl,()=>{
    //     console.log("connected to mongo ")
    // })
 //}
//module.exports = connectTOMongo;

const server ="127.0.0.1:27017";
const database ="inotebook";

const connectDB =async()=>{
    try{
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("mongo connected")

    }catch(err){
        console.log("failed",err)
    }

 
};
module.exports=connectDB;

//const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

//const url = 'mongodb://localhost:27017';

//const dbName = 'jdm';

//const client = new MongoClient(url);
//const connectToMongo=() => {client.connect(function(err){
  //  assert.equal(null, err);
  //console.log("Connected successfully to server");

  //const db = client.db(dbName);

  //client.close();
//})};
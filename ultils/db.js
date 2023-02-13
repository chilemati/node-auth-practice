// const { MongoClient } = require('mongodb');


// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'nuth-auth';
// let reply;
// async function main(cb) {
//  // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//    reply = client.db(dbName);
//   //  collection = db.collection('mydb');
//   cb();
//   // the following code examples can be pasted here...
  
// }

// module.exports = {
//   main,
//   getDb: () => {
//     return reply;
//   },
//   }

const mongoose = require('mongoose');


const  conn= async(cb) => {
  let con = await mongoose.connect('mongodb://localhost:27017/nuth-auth');
  console.log('connection to db was ok!');
  cb();
  return con;
  
}

module.exports = {
  conn,
};
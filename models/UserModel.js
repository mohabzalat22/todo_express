const { MongoClient , ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

require('dotenv').config()

// Connection URL
const url = `${process.env.MONGO_ATLAS}`;
const client = new MongoClient(url);

// Database Name
const dbName = 'user';

async function connect() {
  await client.connect();
  console.log('Connected successfully to server');
}

const register_user = async(data) =>{
    connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const findUser = await collection.findOne({user:data.user});
    if(findUser){
        return "user already exists !";
    }
    else {
        const insertResult = await collection.insertOne(data);
        return insertResult;
    }
}

const login_user = async(data) =>{
    connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const {user, password} = data;
    try {
        const database_login_Result = await collection.findOne({user:user}); //hash
        console.log(password, database_login_Result.password)
        const validation_status = await bcrypt.compare(password, database_login_Result.password);
        return validation_status
    } catch (error) {
        console.error(`error during login ${ error}`)
    } 
}


module.exports = {
    register_user, 
    login_user,
}
const { MongoClient , ObjectId } = require('mongodb');
require('dotenv').config()

// Connection URL
const url = `${process.env.MONGO_ATLAS}`;
const client = new MongoClient(url);

// Database Name
const dbName = 'todo';

async function connect() {
  await client.connect();
  console.log('Connected successfully to server');
}

const create = async(data) =>{
    connect();
    const db = client.db(dbName);
    const collection = db.collection('todos');
    const insertResult = await collection.insertOne(data);
    return insertResult;
}

const readAll = async() =>{
    const db = client.db(dbName);
    const collection = db.collection('todos');
    const findResult = await collection.find({}).toArray();
    return findResult;
}

const read_by_id = async(id) =>{
    connect();
    const db = client.db(dbName);
    const collection = db.collection('todos');
    const findResult = await collection.find(new ObjectId(id)).toArray();
    return findResult;
}

const update = async(id, todo) =>{
    connect();
    const db = client.db(dbName);
    const collection = db.collection('todos');
    const updateResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { todo: todo } });
    return updateResult;
}

const remove = async(id) =>{
    connect();
    const db = client.db(dbName);
    const collection = db.collection('todos');
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
    return deleteResult;
}

module.exports = {
    connect,
    readAll,
    read_by_id,
    create,
    update,
    remove
}
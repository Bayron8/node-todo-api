// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';


// let user = {name: 'Bayron Villanueva', age: 30};
// let {name} = user;

MongoClient.connect(url, (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB Server')
    }

    console.log('Connected to MongoDB Server');

    // const col = client.db(dbName).collection('Todos');
    //
    // col.insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    // const col = client.db(dbName).collection('Users');
    //
    // col.insertOne({
    //     name: 'Bayron Villanueva',
    //     age: 30,
    //     location: 'Bogotá D.C'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }
    //
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    client.close()
});
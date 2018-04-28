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

    const db = client.db(dbName);

    // db.collection('Todos')
    //     .findOneAndUpdate(
    //         {_id: new ObjectID('5adf546622fddd6128f84851')},
    //         {$set: { completed: true }},
    //         {returnOriginal: false})
    //     .then((res) => {
    //         console.log(res);
    //     });

    db.collection('Users')
        .findOneAndUpdate(
            { _id: new ObjectID('5add4d3fefb7bd0ad0ede7a2') },
            { $set: { name: 'Bayron' }, $inc: { age: -1} },
            { returnOriginal: false })
        .then((res) => {
            console.log(res);
        });


    client.close()
});
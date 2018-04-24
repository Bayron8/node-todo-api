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

    // db.collection('Todos').find({
    //     _id: new ObjectID('5adf3cf022fddd6128f84324')
    // }).toArray()
    //     .then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }, (err) => {
    //         if (err) {
    //             console.log('Unable to fetch todos', err);
    //         }
    //     });

    // db.collection('Todos').find().count()
    //     .then((count) => {
    //         console.log('Todos count: ', count);
    //     }, (err) => {
    //         if (err) {
    //             console.log('Unable to fetch todos', err);
    //         }
    //     });

    db.collection('Users').find({
        name: 'Bayron'
    }).toArray()
        .then((docs) => {
            console.log('Users');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            if (err) {
                console.log('Unable to fetch Users', err);
            }
        });

    db.collection('Users').find().count()
        .then((count) => {
            console.log('USers count: ', count);
        }, (err) => {
            if (err) {
                console.log('Unable to fetch Users', err);
            }
        });

    // client.close()
});
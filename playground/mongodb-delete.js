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

    //deleteMany
    db.collection('Users').deleteMany({name: 'Bayron'})
        .then((res) => {
            console.log(res);
        });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Go to lunch'})
    //     .then((res) => {
    //         console.log(res);
    //     })

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'Go to lunch'})
    //     .then((res) => {
    //         console.log(res);
    //     })

    // client.close()
});
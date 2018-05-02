const express = require('express');
const {ObjectId} = require('mongodb');
const  mongooseOr = require('mongoose');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    let todo = new Todo({
        text : req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        console.log('Error');
        res.status(400).send(err);
    })

});

app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({ todos });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    } else {
        Todo.findById(id)
            .then((todo) => {
                if (todo) {
                    res.send({ todo });
                } else {
                    res.status(404).send();
                }
            })
            .catch((err) => {
                res.status(400).send();
            })
    }

});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    } else {
        Todo.findByIdAndRemove(id)
            .then((todo) => {
                if (todo) {
                    res.send({ todo });
                } else {
                    res.status(404).send();
                }
            })
            .catch((err) => {
                res.status(400).send();
            })
    }

});

app.listen(port, () => {
    console.log(`Started at port ${port}`);
});

module.exports = {
    app
};

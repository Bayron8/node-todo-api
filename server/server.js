let express = require('express');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

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

app.listen(3000, () => {
    console.log('Started at port 3000');
});

module.exports = {
    app
};

const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos =[
    { _id: new ObjectId(), text: 'First test todo' },
    { _id: new ObjectId(), text: 'Second test todo' },
    { _id: new ObjectId(), text: 'third test todo' },
];

beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => {
            done();
        })
});

describe('POST /todos', () => {
    it('should create a new todo', function (done) {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                     done(err);
                })
            });
    });

    it('should not create todo with invalid data', function (done) {
        let text = '     ';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done()
                }). catch((err) => {
                    done(err);
                })
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', function (done) {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', function (done) {

        request(app)
            .get(`/todos/${todos[0]._id.toString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(todos[0]._id.toString());
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', function (done) {

        let validID = new ObjectId();

        request(app)
            .get(`/todos/${validID.toString()}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non object ids', function (done) {

        let invalidID = '123';

        request(app)
            .get(`/todos/${invalidID.toString()}`)
            .expect(404)
            .end(done);
    });
});
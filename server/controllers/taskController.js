const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const dataRepo = require("../repos/dal")


exports.welcome = async (req, res) => {
    res.send("Welcome to your Wix Enter exam!");
};

exports.user_ID = async (req, res) => {
    const userId = req.cookies?.userId || uuidv4();
    res.cookie("userId", userId).send({id: userId});
};

exports.returnTodos = async (req, res) => {
    try {
        res.send(dataRepo.getAllData());
    } catch (error) {
        console.log('Error returning todos file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addTodo = async (req, res) => {
    const userId = req.cookies?.userId;
    if (!userId) {
        res.status(403).end();
        return;
    }

    const {todo} = req.body;
    if (!todo) {
        res.status(400).json({message: 'Todo is missing'}).end();
        return;
    }

    const {title} = todo;
    if (!(title)) {
        res.status(400).json({message: 'Bad request'}).end();
        return;
    }

    const newTodo = {
        title,
        id: uuidv4(),
        done: false
    }

    dataRepo.updateData(newTodo)
    res.send({todo: newTodo}).status(200).end()
};

exports.changeStatus = async (req, res) => {
    const todo_id = req.body.todo;
    try {
        const todo = dataRepo.getAllData().find(todo => todo.id === todo_id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.done = !todo.done;

        // Update the data repository
        dataRepo.updateAllData(dataRepo.getAllData());

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        return res.status(200).json({ message: 'Todo status changed successfully', todo });
    } catch (error) {
        console.log('Error changing todo status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



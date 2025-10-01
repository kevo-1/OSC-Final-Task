const users = require('../Models/user.models');
const todos = require('./../Models/todo.model');

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await todos.findById(id);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllTodo = async (req, res) => {
    try {
        const todo = await todos.find();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const insertTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const id = req.userId;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required!" });
        }
        const user = await users.findById(id);
        if(!user) {
            return res.status(400).send({
                status: 400,
                message: "No user is signed in!"
            })
        }
        const todo = new todos({
            title,
            description,
            status: status ?? false,
            user: user._id
        });
        user.todos.push(todo._id);
        await user.save();
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await todos.findById(id);
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }
        todo.status = !todo.status;
        await todo.save();
        res.status(200).json({ success: true, message: "Todo status toggled successfully", todo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        await todos.findByIdAndDelete(id);
        res.status(201).json({success: true, message: "Todo deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    insertTodo,
    changeStatus,
    getAllTodo,
    deleteTodo,
    getById
};

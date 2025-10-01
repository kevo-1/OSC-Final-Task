const users = require("./../Models/user.models");
const todos = require("./../Models/todo.model");

const getTodos = async (req, res) => {
    try {
        const id = req.userId;
        const user = await users.findById(id).populate("todos", "-__v");
        if (!user) {
            return res.status(400).send({
                status: 400,
                message: "User not found"
            });
        }
        res.status(200).send({
            status: 200,
            data: user.todos
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        });
    }
};

const getRemainingTodos = async (req, res) => {
    try {
        const id = req.userId;
        const user = await users.findById(id).populate("todos", "-__v");
        if (!user) {
            return res.status(400).send({
                status: 400,
                message: "User not found"
            });
        }
        res.status(200).send({
            status: 200,
            data: user.todos.filter(x => x.status == false)
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        });
    }
};

module.exports = {
    getTodos,
    getRemainingTodos
};

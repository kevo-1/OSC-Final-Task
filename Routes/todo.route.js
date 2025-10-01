const express = require('express');
const todoRouter = express.Router();

const { checkUser } = require('../Middlewares/auth.middleware');
const errorMiddleware = require('../Middlewares/errorWrapper.middleware');
const todoController = require('../Controllers/todo.controller');

todoRouter.route("/")
    .post(checkUser, errorMiddleware(todoController.insertTodo))
    .get(checkUser, errorMiddleware(todoController.getAllTodo));

todoRouter.route("/change-status/:id")
    .put(checkUser, errorMiddleware(todoController.changeStatus));

todoRouter.route("/delete-todo/:id")
    .delete(checkUser, errorMiddleware(todoController.deleteTodo));

todoRouter.route("/getById/:id")
    .get(checkUser, errorMiddleware(todoController.getById));

module.exports = todoRouter;

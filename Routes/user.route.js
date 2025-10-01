const express = require('express');
const userRouter = express.Router();
const errorMiddleware = require('./../Middlewares/errorWrapper.middleware');
const userController = require('./../Controllers/user.controller');
const {checkUser} = require('./../Middlewares/auth.middleware');

userRouter.route("/get-todos").get(checkUser, errorMiddleware(userController.getTodos));
userRouter.route("/get-remain-todo").get(checkUser, errorMiddleware(userController.getRemainingTodos));

module.exports = userRouter
const express = require('express');
const authRouter = express.Router();
const errorMiddleware = require('./../Middlewares/errorWrapper.middleware');
const authController = require('./../Controllers/auth.controller');

authRouter.route("/signup").post(errorMiddleware(authController.signUp));
authRouter.route("/signin").post(errorMiddleware(authController.signIn));
authRouter.route("/signout").post(errorMiddleware(authController.signOut));

module.exports = authRouter
const express = require('express');
const app = express();
const db = require('./db.js');
const cookie_parser = require("cookie-parser");
const todoRouter = require("./Routes/todo.route.js");
const authRouter = require("./Routes/auth.route.js");
const userRouter = require("./Routes/user.route.js");
const globalErrorMiddleware = require('./Middlewares/globalError.middleware.js');

const port = 3000;
app.use(express.json());
app.use(cookie_parser());
try {
    db.connectDb();
    app.listen(port, () => {
        console.log(`Server running on port http://localhost:${port}`);
    })
} catch(error) {
    console.error(error);
}

app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/auth", authRouter);
app.use(globalErrorMiddleware);
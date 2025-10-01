require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const users = require('./../Models/user.models');
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_TOKEN, {expiresIn: maxAge});
}

const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await users.findOne({email});
        if(!user) {
            return res.status(400).send({
                status: 400,
                message: "Invalid email or password"
            })
        }
        const auth = bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(400).send({
                status: 400,
                message: "Wrong password"
            });
        }
        const token = createToken(user._id);
        res.cookie("token", token, {httpOnly: true, maxAge: maxAge*1000});
        return res.status(201).send({
            status: 201,
            data: user
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            err: error
        })
    }
}

const signUp = async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const exist = await users.findOne({email});
        if (exist) {
            return res.status(400).json({message: "User already exists"});
        }
        const user = new users({
            name: username,
            email: email,
            password: password
        })
        await user.save();
        res.status(201).json({success: true, message: "User registered successfully"});
    } catch(error) {
        res.status(500).json({message: error});
    }
}

const signOut = async (req, res) => {
    try {
        res.cookie("token", "", {httpOnly: true, maxAge: maxAge*1});
        res.status(201).send({
            status: 201,
            message: "User logged out successfully"
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            err: error
        })
    }
}

module.exports = {
    signIn,
    signOut,
    signUp
}

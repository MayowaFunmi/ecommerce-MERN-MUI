const generateTokens = require('../utils/generateTokens')
const express = require("express");
const bcrypt = require("bcrypt");
const { signUpBodyValidation, loginBodyValidation } = require("../utils/validationSchema");
const User = require("../models/Users");
const Role = require("../models/Roles");
const { request } = require('express');
const router = express.Router();

// signup route
router.post("/signup", async(req, res) => {
    try {
        const { error, value } = signUpBodyValidation(req.body);
        if (error) {
            console.log(error.details[0].message)
            return res.status(400).send({ error: true, message: error.details[0].message })
        } else {
            console.log('value = ', value)
        }
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ error: true, message: "User with email already exists" })
        }
        // add roles
        const roles = req.body.roles.map(async(roleName) => {
            const newRole = new Role({ name: roleName })
            return
        })
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new User({...req.body, password: hashPassword })
        newUser.save()
        res.status(200).send({ error: false, new_user: newUser, message: "User Account created successfully" })
        console.log("new user = ", newUser)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "There is internal server error" })
    }
});

// login
router.post("/login", async(req, res) => {
    try {
        const { error } = loginBodyValidation(req.body);
        if (error) {
            return res.status(400).send({ error: true, message: error.details[0].message })
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ error: true, message: "Invalid! User with email does not exist" })
        }

        const verifiedPassword = await bcrypt.compare(req.body.password, user.password);
        if (!verifiedPassword) {
            return res.status(400).send({ error: true, message: "Invalid password!!" })
        }

        // generate access and refresh tokens
        const { accessToken, refreshToken } = await generateTokens(user);

        res.status(200).send({
            error: false,
            id: user._id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: "Logged in successfully",
            role: user.roles
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "There is internal server error" })
    }
})
module.exports = router;
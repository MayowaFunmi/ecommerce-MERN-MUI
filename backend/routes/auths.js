const generateTokens = require('../utils/generateTokens')
const express = require("express");
const bcrypt = require("bcrypt");
const { signUpBodyValidation, loginBodyValidation } = require("../utils/validationSchema");
const User = require("../models/Users");

const router = express.Router();

// signup route
router.post("/signup", async(req, res) => {
    try {
        const { error } = signUpBodyValidation(req.body);
        if (error) {
            return res.status(400).send({ error: true, message: error.details[0].message })
        }
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ error: true, message: "User with email already exists" })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({...req.body, password: hashPassword }).save();
        res.status(200).send({ error: false, message: "User Account created successfully" })
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
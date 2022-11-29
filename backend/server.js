const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auths');
const roleRoutes = require('./routes/roles');
const Role = require('./models/Roles');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/roles", roleRoutes);

app.get("/", (req, res) => {
    try {
        res.status(200).send("Welcome to nodejs ecommerce project")
    } catch (error) {
        console.log("error = ", error.message)
        res.status(404).send(error.message)
    }
})
app.get("/roles", async(req, res) => {
    try {
        const allRoles = await Role.find()
            //res.send({ error: false, all_roles: allRoles.map((role) => role._id) })
        res.send({ error: false, all_roles: allRoles })
    } catch (error) {
        console.log("error = ", error.message)
        res.status(404).send(error.message)
    }

})

app.delete("/delete_user", async(req, res) => {

})
const uri = process.env.DB_URI;
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.log(error.message))
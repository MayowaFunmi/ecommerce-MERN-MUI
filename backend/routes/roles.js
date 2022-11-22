const roleModel = require('../models/Roles');
const router = require('express').Router();

// create roles
router.post("/create_roles", async(req, res) => {
    try {
        const newRole = await new roleModel(req.body);
        newRole.save()
        res.send({ error: false, message: 'New Role created successfully', details: newRole })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "There is internal server error" })
    }
})

module.exports = router;
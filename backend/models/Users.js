const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 5, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, minlength: 10, maxlength: 200, unique: true },
    password: { type: String, required: true, minlength: 6 },
    roles: {
        type: [String],
        enum: ["guest", "user", "admin"],
        default: ["guest"]
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

module.exports = User;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, "Plese Enter username of 4 letters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "Plese Enter password of 4 letters"]
    },
    country: {
        type: String,
        required: true,
    }

});
const User = mongoose.model("User", userSchema);
module.exports = User;
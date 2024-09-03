const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date, // Should be of type Date, not String
        default: Date.now // Use Date.now as a function
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;

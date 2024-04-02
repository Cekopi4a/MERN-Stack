const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role:{
        type: String,
        default: 'user',
    },
    password: {
        type : String,
        required: true,
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;
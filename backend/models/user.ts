// const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    // password: {type: String},
    // name: {type: String},
    // email: {type: String, unique: true},
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)


exports.User = User
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const messageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    username: { type: String },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
});
messageSchema.plugin(passportLocalMongoose);
const Message = mongoose.model('Message', messageSchema);
exports.Message = Message;
exports.Message = Message;

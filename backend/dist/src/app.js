"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = exports.express = void 0;
const express = require("express");
exports.express = express;
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
exports.passport = passport;
const dotenv = require('dotenv');
const MongoStore = require("connect-mongo");
dotenv.config();
const authRouter = require('./auth').router;
const pageRouter = require('./page').router;
const secretKey = process.env.secretKey;
const app = express();
const PORT = process.env.PORT || 8080;
const mongoUrl = 'mongodb://localhost/ts-chat-app';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl })
}));
app.use(passport.authenticate('session'));
app.use('/auth', authRouter);
app.use('/page', pageRouter);
mongoose.connect(mongoUrl);
app.listen(PORT, () => {
    console.log(`Started Express server on port ${PORT}`);
});

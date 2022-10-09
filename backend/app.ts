const express = require("express")
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const { ensureLoggedIn } = require('connect-ensure-login')
const MongoStore = require("connect-mongo");
const path = require('path')
dotenv.config()

const authRouter = require('./auth').router
const pageRouter = require('./page').router

const secretKey = process.env.secretKey
const app = express()
const PORT = process.env.PORT || 8080;
const mongoUrl = 'mongodb://localhost/ts-chat-app'

app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl})
}))

app.use(passport.authenticate('session'))

app.use('/auth', authRouter)
app.use('/page', pageRouter)

mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})
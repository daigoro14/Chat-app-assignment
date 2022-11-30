const express = require("express")
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const MongoStore = require("connect-mongo");
const cors = require('cors')
dotenv.config()

const pageRouter = require('./page').router

const app = express()

const PORT = process.env.PORT || 8080;
const mongoUrl: string = process.env.MONGODB_URL || 'mongodb://localhost:27017/ts-chat-app'
const secret = process.env.SESSION_SECRET || 'secret'


app.use(cors())


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl}),
}))

var sess: any;

app.post('/login',(req: any,res: any) => {
  sess = req.session;
  sess.user = req.body.username;
  res.redirect('/page/data');
});

app.get('/logout',(req: any, res: any) => {
  req.session.destroy((err: any) => {
        if(err) {
            return console.log(err);
        }
    sess = undefined;
    res.redirect('/page/data');
    });

});


app.use('/page', pageRouter)

mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})

export {express, passport, sess};
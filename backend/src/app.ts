const express = require("express")
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const MongoStore = require("connect-mongo");
const cors = require('cors')
dotenv.config()

const authRouter = require('./auth').router
const pageRouter = require('./page').router

//NEW IDEA
const nameRouter = require('./name').router

const app = express()

const PORT = process.env.PORT || 8080;
const mongoUrl: string = process.env.MONGODB_URL || 'mongodb://localhost:27017/ts-chat-app'

app.use(cors())


app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({mongoUrl}),
// }))

//NEW IDEA STARTS
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl}),
}))

var sess: any;

app.get('/',(req: any,res: any) => {
  sess = req.session;
  if(sess.email) {
      return res.redirect('/admin');
  }
  res.sendFile('index.html');
});

app.post('/login',(req: any,res: any) => {
  sess = req.session;
  sess.username = req.body.username;
  res.redirect('/name/username');
});


//NEW IDEA ENDS


// app.use(passport.authenticate('session'))

app.use('/auth', authRouter)
app.use('/page', pageRouter)
app.use('/name', nameRouter)

mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`)
})

export {express, passport, sess};
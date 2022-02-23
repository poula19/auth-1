const express = require('express');
const  Mongoose  = require('mongoose');
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/notesdb3',
    collection: 'mySessions'
  });
const app = express()
const port = 4000
const path=require('path')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))

app.use(express.urlencoded({ extended:false }))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs');

app.use(require('./routes/signup.routes'))
app.use(require('./routes/signin.routes'))
app.use(require('./routes/home.routes'))


Mongoose.connect('mongodb://localhost:27017/notesdb3')
app.listen(port, () =>  console.log(`Server started on port`));



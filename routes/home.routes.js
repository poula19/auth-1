const app=require('express').Router()
const userModel=require('../models/users.model')
const bcrypt = require('bcrypt')
app.get('/', (req, res) => {
    res.render('signup');
});
 
app.get('/home', (req, res) => {
  console.log(req.session.myID)
  console.log(req.session.myName)
  if(req.session.myID){
      res.render('home',{name:req.session.myName})
  }else{
      res.redirect('/signin')
  }
     
  
});

module.exports=app
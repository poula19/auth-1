const app=require('express').Router()
  const userModel = require('../models/users.model')
const bcrypt = require('bcrypt')
app.get('/signin', (req, res) => {
      res.render('signin');
});
app.post('/handleSignin',async (req, res) => {
   const{email,password} = req.body
let data=await userModel.findOne ({email})
console.log(data);
if(data!=null){
    const match = await bcrypt.compare(password,data.password)
    if(match){
        var hour = 3600000
        //req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour
        req.session.myID=data._id
        req.session.myName=data.fname
        res.redirect('/home')
    
    }else{
        console.log('password incorrect');
    }

}else {
    console.log('email doesn`t exist');
}

   res.redirect('/signin')
});
app.get('/Logout', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/signin')
    })
});
module.exports=app
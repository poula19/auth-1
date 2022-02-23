const app=require('express').Router()
const userModel=require('../models/users.model')
const bcrypt = require('bcrypt')
app.get('/signup', (req, res) => {
    res.render('signup');
});
 

app.post('/handleSignUp',async (req, res) => {
   const{fname,lname,email,password}=req.body
   let data=await userModel.findOne({email})
   if(data){
console.log('email exists');
res.redirect('/')
   }else{
bcrypt.hash(password,7,async (err,hash)=>{
    await userModel.insertMany({
        fname,
        lname,
        email,
        password : hash
    })

})
  

    res.redirect('/signin')
}
  
   
});
module.exports=app
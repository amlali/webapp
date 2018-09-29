const {ObjectID}=require('mongodb');
var User =require('./users');
var Validation=require('./validation');
var express = require('express')
var validator = require('validator');
var bodyParser = require('body-parser');
var passwordValidator = require('password-validator');

var app = express();

app.use(bodyParser.json());
var port=process.env.PORT||3000;

var schema = new passwordValidator();
schema
.is().min(8)                                    
.is().max(50)                                 
.has().uppercase()                              
.has().lowercase()                             
.has().digits()                                 
.has().not().spaces(); 


var user = new User();
app.post('/user',(req,res)=>{
console.log('inside user posting route ');

//var name=req.body.username;
//var email=req.body.email;
var age=parseInt(req.body.age);
//var password=req.body.password;
console.log(Validation.validateUserName(req.body.username));
console.log(Validation.validateAge(req.body.age));
console.log(Validation.validatePassword(req.body.password));

  if(Validation.validateUserName(req.body.username)===true&&Validation.validateAge(age)&&Validation.validatePassword(req.body.password)&&validator.isEmail(email)){
    console.log('should return valid');
    
    user.addNewUser({
        username:req.body.username,
        email:req.body.email,
        age:req.body.age,
        password:req.body.password
   
    });

   var token= user.generatetoken();
   res.setHeader('auth',token);
    user.save().then((doc)=>{
        res.status(200).send(doc);
    });
}
else{
res.status(400).send('change your data please');}
});


app.get('/user/:id',(req,res)=>{


User.find({_id: req.params.id}).exec((err, user)=>{
    if(err) {console.log(err);} 
    if(user){
        res.status(200).send({user:user})
    } 
    else {
        res.status(404).send({message: "user not found"})
    }
});

});

app.get('/access',(req,res)=>{
    var token=req.headers['auth'];
    console.log(token);
    
    if(!token){
    res.status(401).send();
}
 var valid= user.getbytoken(token);
 if(valid){
    res.status(200).send();
}
else{
    res.status(400).send();
}
});



app.listen(port,()=>{
    console.log('listen to port',port);
    
});

module.exports={app};
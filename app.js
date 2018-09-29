const {ObjectID}=require('mongodb');
var User =require('./users');
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
.is().max(100)                                 
.has().uppercase()                              
.has().lowercase()                             
.has().digits()                                 
.has().not().spaces(); 



var user = new User();
app.post('/user',(req,res)=>{
console.log('inside user posting route ');

var name=req.body.username;
var email=req.body.email;
var age=req.body.age;
var password=req.body.password;
  if(validator.isAlphanumeric(name)&&name.length<20&&validator.isNumeric(age)&&age<150,schema.validate(password)&&validator.isEmail(email)){
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
res.status(404).send('change your data please');}
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
    //user.getbytoken(token).then((res)=>{
       
    //    res.status(200).send(res);
   // }).catch((e)=>{
   //     res.status(401).send();

  //  });
 var valid= user.getbytoken(token);
 if(valid){
    res.status(200).send();
}
else{
    res.status(401).send();
}
});



app.listen(port,()=>{
    console.log('listen to port',port);
    
});
const {ObjectID}=require('mongodb');
var User =require('./users');
var express = require('express')
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json());
var port=process.env.PORT||3000;
app.post('/user',(req,res)=>{
console.log('inside user posting route ');

    var user = new User();
    user.addNewUser({
        username:req.body.username,
        email:req.body.email,
        age:req.body.age,
        password:req.body.password
   
    })
    user.save().then((doc)=>{
        res.send(doc);
    });
});
app.get('/user/:id',(req,res)=>{


User.find({_id: req.params.id}).exec((err, user)=>{
    if(err) {console.log(err);} 
    if(user){
        res.status(200).send({user:user})
    } else {
        res.status(404).send({message: "user not found"})
    }
});

});



app.listen(port,()=>{
    console.log('listen to port',port);
    
});
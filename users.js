
 

const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/todo');

//var {mongoose}=require('./db');
var validator = require('validator');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var User=new Schema(
{
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validator:validator.isEmail
    },
    age:{
        type:Number
    },
    password:{
       type:String
    },


});


//adding user
User.methods.addNewUser = function (userObj)
{
    console.log('inside user creation methods.. trying to add obj = >  ' , JSON.stringify(userObj));
    this.username = userObj.username;
    this.email = userObj.email;
    this.age = userObj.age;
    this.password = userObj.password;

}
User.pre('save',(next)=>{
    var user=this;
    bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(user.password, salt, function(err, hash) {
    this.password=hash;
    next();
});
});
});



module.exports= mongoose.model('User', User)

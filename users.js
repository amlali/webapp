var jwt = require('jsonwebtoken');
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

    token:{
        type: String
    }


});


//User.methods.genHash = function(cb){
  //  var user=this;
    // bcrypt.genSalt(10,cb);
//}

//User.methods.validatePassword = function( newPasswor){
  //  if(this.password)
    //retun true

//}
User.methods.generatetoken=function(){
    var user=this;
    var access={
        username:user.username,
        id:user.password,
        expireDate:5
    };
var token=jwt.sign(access,'amal1234');
user.token=token;
return token;
}

User.methods.getbytoken=function(token){
    var user=this;
    var decoded;
    try{
        decoded = jwt.verify(token,'amal1234');
        return user.findOne({
            username:decoded.username,
            password:decoded.password});
    }
    catch(e){
        new Promise.reject();
    }
    
    
}


//adding user
User.methods.addNewUser = function (userObj)
{
    console.log('inside user creation methods.. trying to add obj = >  ' , JSON.stringify(userObj));
    this.username = userObj.username;
    this.email = userObj.email;
    this.age = userObj.age;
    let user = this;
    genHash((err,salt)=>{
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password=hash;
            user.save(); 
        });
    })
   

}



module.exports= mongoose.model('User', User)

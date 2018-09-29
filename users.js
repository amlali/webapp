var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.Promise=global.Promise;

var options={
useNewUrlPerson
};
mongoose.connect('mongodb://localhost:27017/todo',options);
var moment=require('moment')
var date=require('./date');
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



User.methods.generatetoken=function(){
    var user=this;
    var access={
        username:user.username,
        issueDate:date.getDate(),
        expireDate:moment(date.getDate(),'DD-MM-YYYY').add(5, 'days').format('DD-MM-YYYY'),
        randnumber:12345
    };

var token=jwt.sign(access,'amal1234');

return token;
}

User.methods.getbytoken=function(token){
    var user=this;
    var decoded;
    try{
        decoded = jwt.verify(token,'amal1234');
        console.log(moment(decoded.expireDate,'DD-MM-YYYY'));
        if(decoded.expireDate<date.getDate())
        {
            console.log('data true ');
            
       return true;
    }
    else {
        return false;
    }
        //return user.findOne({username:decoded.username});
    }
    catch(e){
        console.log('not token');

       return  false
    }
    
    
}


//adding user
User.methods.addNewUser = function (userObj)
{
    console.log('inside user creation methods.. trying to add obj = >  ' , JSON.stringify(userObj));
    this.username = userObj.username;
    this.email = userObj.email;
    this.age = userObj.age;
    console.log('before hashing');
    this.password=hashing(userObj.password);

}


var hashing=function(password){
    var salt=bcrypt.genSaltSync(10);
    var hashpass=bcrypt.hashSync(password,salt);
    console.log(hashpass)
    return hashpass;

}

module.exports= mongoose.model('User', User)

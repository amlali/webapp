var validator = require('validator');
var passwordValidator = require('password-validator');
var validateUserName=function (userName) {
    userName=userName.trim();
    console.log(userName);
    
    if(userName.length>5&&userName.length<20&&validator.isAlphanumeric(userName)){
        console.log('should return true');
return true;
    }
    else{
        console.log('should return false');
    return false;
   }
}
var validateAge=function (age) {

if(age!=='NaN',age>10&&age<150)
{
    return true;
}
else{
    return false;
}
}
var validatePassword=function (password) {
    var schema = new passwordValidator();
    schema
    .is().min(8)                                    
    .is().max(50)                                 
    .has().uppercase()                              
    .has().lowercase()                             
    .has().digits()                                 
    .has().not().spaces(); 
if(schema.validate(password)  ) {
    return true;} 

    else{
        return false;
    }
}



module.exports={
    validateUserName,validateAge,validatePassword
}


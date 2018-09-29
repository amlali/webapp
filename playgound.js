var moment=require('moment')
var validator = require('validator');
var date=require('./date');
//const {MongoClient}=require('mongodb');
//MongoClient.connect('mongodb://localhost:27017/todo',(err,db)=>{
  //  if(err){
   //     console.log('unable to connect');
        
  //  }
  //  if(!err){
  //  console.log(db);
//}
   // db.collection('user').find().toArray((err,docs)=>{
      //  console.log(doc);

//});
//});
//var current_date=moment().toString();
//var new_date = moment().add(5, 'days').toString();
//console.log(current_date);

console.log(validator.isNumeric(12));


console.log(date.getDate());
var new_date = moment(date.getDate(),'DD-MM-YYYY').add(5, 'days').format('DD-MM-YYYY');

console.log(new_date);
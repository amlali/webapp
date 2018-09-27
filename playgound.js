const {MongoClient}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todo',(err,db)=>{
    if(err){
        console.log('unable to connect');
        
    }
    if(!err){
    console.log(db);
}
    db.collection('user').find().toArray((err,docs)=>{
        console.log(doc);

});
});

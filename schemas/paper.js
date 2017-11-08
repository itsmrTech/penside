var mongoose=require('mongoose');

var paperSchema=mongoose.Schema({
   title:String,
   text:String,
   
    
});

module.exports=mongoose.model('Paper',paperSchema);
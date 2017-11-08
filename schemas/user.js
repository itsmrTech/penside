var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
   first_name:String,
   last_name:String,
   sign:String,
   picture:String,
    
});

module.exports=mongoose.model('User',userSchema);
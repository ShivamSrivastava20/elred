const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const tokenSchema=new Schema({
    Token : String
});

const tokken=mongoose.model(
"tokken",
tokenSchema 
);

module.exports=tokken;
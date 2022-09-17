const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const taskSchema=new Schema({
    date: Date,
    task : String,
    status : String
});


const task=mongoose.model(
    "task",
    taskSchema
    );
    
    module.exports=task;


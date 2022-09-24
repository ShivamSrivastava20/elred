
const express = require('express');
const router = express.Router();
const taskRoute= require('../Models(userSchema)/taskSchema');

router.post('/',async (req,res)=>
{
    let [first, second] = Object.keys(req.body);
if(Object.keys(req.body).length>2 || first!='task' || second!='status'){
    res.json({success:"False" , message : "Please donot add Extra/Invalid fields in the Request Body"});
}
 else { if(!req.body.task)
    {
        res.json({success : "False" , message : " Please add a Task"});
    }
    else{
        if(!req.body.status)
        {
            res.json({success : "False" , message : "Please provide the state of status : Complete/Incomplete"});
        }
    
    else{
        const taskCreat =new taskRoute(
            {
                task : req.body.task,
                status : req.body.status,
                date : Date.now(),
            }
        );
       // console.log(taskCreat);
       await taskCreat.save();
        res.json({success : "True" , message : "Task Created !!" ,id : taskCreat._id});

    }}
}})

router.patch('/:id' , async (req,res)=>
{

    if(Object.keys(req.body).length>2){
        res.json({success:"False" , message : "Please donot add extra fields in the Request Body"});
    }
    else{
       const updateTask=await taskRoute.findByIdAndUpdate(req.params.id,
            {
                task : req.body.task,
                status : req.body.status
            });
            if(!updateTask)
            {
            res.status(500).json({
                message : `The Task with given ${req.params.id} ID is Not Updated !!`
            });
            }
            else {
                res.status(200).json({
                    message : `The Task with given ${req.params.id} ID is Updated !!`
                })
            }
}
    
})

router.delete('/:id' , async (req,res)=>
{
    const updateTask=await taskRoute.findByIdAndRemove(req.params.id);


    if(!updateTask)
    {
    res.status(500).json({
        message : `The Task with given ${req.params.id} ID is Not Deleted !!`
    });
    }
    else {
        res.status(200).json({
            message : `The Task with given ${req.params.id} ID is Deleted !!`
        })
    }
})


module.exports = router;

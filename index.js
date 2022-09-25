const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv/config');
const URI =process.env.URI;
app.use(express.json());
//console.log("URI",URI);
const { expressjwt: jwt } = require('express-jwt');

const userRoutes=require('./API_Routes/Routes');
const loginRoutes=require('./API_Routes/Loginroutes');
const taskRoutes=require('./API_Routes/taskroutes');



app.use(jwt({ 
    secret : process.env.secret ,
    algorithms : ['HS256']

   }).unless({
    path : ['/register','/user/login']
   }));


 app.use((err,req,res,next)=>
   {
if(err)
{
    res.json({message : err.name});
}
   })
app.use('/register',userRoutes);
app.use('/user',loginRoutes);
app.use('/createtask',taskRoutes);


mongoose.connect(URI , (err)=>
{
    if(err)
    {
        console.log("Error !!" , err);
    }
    else{
        console.log("Connected to Database : " , URI);
    }
})
app.listen(8080 , (err)=>
{
    if(err)
    {
        console.log("Issue in the server !! Please check");
    }
    else 
    {
        console.log("Server started !!");
    }
})



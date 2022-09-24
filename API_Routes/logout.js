const express = require('express');
const router = express.Router();

var {token} = require('./Loginroutes');
router.post('/' , (req,res)=>
{
    console.log(token);
})

module.exports = router;
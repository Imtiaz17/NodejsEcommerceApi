const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {addCupon,cuponLists}= require ('../controller/cupon')


router.post('/cupon/add',requireSignin,addCupon);
router.get('/cupons',requireSignin,cuponLists);
module.exports=router
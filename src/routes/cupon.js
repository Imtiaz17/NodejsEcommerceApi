const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {addCupon,cuponLists,addCuponToCart}= require ('../controller/cupon')


router.post('/cupon/add',requireSignin,addCupon);
router.get('/cupons',requireSignin,cuponLists);
router.post('/cupon/:cart',requireSignin,addCuponToCart);
module.exports=router
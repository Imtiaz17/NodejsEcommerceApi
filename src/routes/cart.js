const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {addItemToCart}= require ('../controller/cart')

router.post('/addtocart',requireSignin,addItemToCart);
module.exports=router
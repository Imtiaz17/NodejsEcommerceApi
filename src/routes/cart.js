const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {addItemToCart}= require ('../controller/cart')

router.post('/addtocart',addItemToCart);
module.exports=router
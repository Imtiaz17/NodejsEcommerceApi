const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {addItemToCart,getCart}= require ('../controller/cart')

router.post('/addtocart',addItemToCart);
router.get('/cart/:id',getCart);
module.exports=router
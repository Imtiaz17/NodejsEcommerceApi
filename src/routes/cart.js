const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {addItemToCart,getCart,deleteCartItem}= require ('../controller/cart')

router.post('/addtocart',addItemToCart);
router.get('/cart/:id',getCart);
router.post('/delete-cart-item',deleteCartItem);
module.exports=router
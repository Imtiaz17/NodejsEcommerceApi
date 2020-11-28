const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {addCupon,cuponLists,addCuponToCart}= require ('../controller/cupon')


router.post('/cupon/add',requireSignin,onlyaccess('admin'),addCupon);
router.get('/cupons',requireSignin,cuponLists);
router.post('/cupon/:cart',requireSignin,addCuponToCart);
module.exports=router
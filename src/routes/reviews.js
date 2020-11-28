const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {reviewList}= require ('../controller/reviews')



router.get('/reviews',requireSignin,reviewList);
module.exports=router
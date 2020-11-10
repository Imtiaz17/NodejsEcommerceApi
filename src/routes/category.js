const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {categoryCreate,getCategories}= require ('../controller/category')

router.post('/category/create',categoryCreate);
router.get('/categories',getCategories);
module.exports=router
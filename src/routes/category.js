const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {categoryCreate,getCategories,deleteCategoryById,getCategoryWiseProduct}= require ('../controller/category')
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+'-'+ file.originalname)
    }
  })
   
const  upload = multer({ storage });
router.post('/category/add',upload.single('image'),categoryCreate);
router.get('/categories',getCategories);
router.get('/category-wise-product/:slug',getCategoryWiseProduct);
router.put('/category/:id',updateCategory);
router.delete('/category/delete/:id',requireSignin,deleteCategoryById);
module.exports=router
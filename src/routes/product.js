const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {productValidation,isValid} = require ('../middleware/validators/product')
const {addProduct,addReview,showProduct,allProducts}= require ('../controller/product')
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

router.post('/product/add',upload.array('productPic'),productValidation,isValid,
requireSignin,onlyaccess('admin'),addProduct);
router.get('/product/:id',showProduct);
router.get('/products/',allProducts);
router.post('/review',requireSignin,addReview);


module.exports=router
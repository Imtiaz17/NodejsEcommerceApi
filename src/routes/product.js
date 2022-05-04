const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {productValidation,isValid} = require ('../middleware/validators/product')
const {addProduct,addReview,showProduct,allProducts,newProducts,featuredProducts,deleteProductById,relatedProducts}= require ('../controller/product')
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
requireSignin,onlyaccess('user'),addProduct);
router.get('/product/:slug',showProduct);
router.get('/allproducts/',allProducts);
router.get('/newproducts/',newProducts);
router.get('/featuredproducts/',featuredProducts);
router.post('/related-products/',relatedProducts);
router.post('/review',requireSignin,addReview);
router.delete('/product/delete/:id',requireSignin,deleteProductById);


module.exports=router
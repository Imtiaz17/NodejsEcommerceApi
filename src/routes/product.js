const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {productValidation,isValid} = require ('../middleware/validators/product')
const {addProduct}= require ('../controller/product')
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

router.post('/product/add',upload.array('productPic'),productValidation,isValid,addProduct);


module.exports=router
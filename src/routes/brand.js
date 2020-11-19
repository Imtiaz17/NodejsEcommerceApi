const express = require('express');
const router = express.Router();
const {requireSignin} = require ('../middleware/auth')
const {addBrand,getBrands}= require ('../controller/brand')
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
router.post('/brand/add',upload.single('image'),addBrand);
router.get('/brands',getBrands);
module.exports=router
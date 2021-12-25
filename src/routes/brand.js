const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {addBrand,getBrands,deleteBrandById}= require ('../controller/brand')
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
router.post('/brand/add',upload.single('image'),requireSignin,addBrand);
router.get('/brands',getBrands);
router.delete('/brand/delete/:id',requireSignin,deleteBrandById);
module.exports=router
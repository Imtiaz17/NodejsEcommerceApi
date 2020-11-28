const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {categoryCreate,getCategories}= require ('../controller/category')
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
router.post('/category/create',upload.single('image'),requireSignin,onlyaccess('admin'),categoryCreate);
router.get('/categories',getCategories);
module.exports=router
const express = require('express');
const router = express.Router();
const {signup, signin,authUser} = require ('../controller/user')
const {signupValidation,signInValidation,isValid} = require ('../middleware/validators/auth')


router.post('/signup',signupValidation,isValid,signup);
router.post('/signin',signInValidation,isValid,signin);
router.post('/auth/profile',authUser);


module.exports=router
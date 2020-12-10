const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {addAddress,getAddress}= require ('../controller/address')


router.post('/address/add', requireSignin, addAddress);
router.get('/user/getaddress', requireSignin, getAddress);

module.exports = router;
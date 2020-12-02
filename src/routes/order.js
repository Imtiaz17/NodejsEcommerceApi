const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {addOrder,getOrders}= require ('../controller/order')


router.post("/addOrder", requireSignin, addOrder);
router.get("/getOrders", requireSignin, getOrders);

module.exports = router;
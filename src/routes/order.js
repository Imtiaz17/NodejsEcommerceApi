const express = require('express');
const router = express.Router();
const {requireSignin,onlyaccess} = require ('../middleware/auth')
const {addOrder,getOrders,updateOrderStatus}= require ('../controller/order')


router.post("/addOrder", requireSignin, addOrder);
router.get("/getOrders", requireSignin, getOrders);
router.post("/update_order_status", requireSignin, updateOrderStatus);

module.exports = router;
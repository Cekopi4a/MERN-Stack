const express = require('express')
const {requireAuth,userMiddleware} = require('../middleware/requireAuth')
const { addOrder, getOrders, getOrder, getNewOrders,approveOrder,getApprovedOrders,putReadyOrders,getReadyOrders, finnishOrder} = require('../controllers/orderController');

const router = express.Router()

router.use(requireAuth);
//User
router.post("/addOrder",  addOrder);
router.get("/getOrders",  getOrders);

//Waiter
router.post("/getOrder", userMiddleware, getOrder);
router.get("/getNewOrder", getNewOrders)
router.put("/approveOrder/:id", approveOrder)
router.get("/getReadyOrders", getReadyOrders)
router.put("/finnishOrder/:id", finnishOrder)

//Cook
router.get("/getApprovedOrders", getApprovedOrders)
router.put("/putReadyOrder/:id", putReadyOrders)


module.exports = router;
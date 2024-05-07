const express = require('express')
const {requireAuth,userMiddleware} = require('../middleware/requireAuth')
const { addOrder, getOrders, getOrder } = require('../controllers/orderController');

const router = express.Router()

router.use(requireAuth);

router.post("/addOrder",  addOrder);
router.get("/getOrders",  getOrders);
router.post("/getOrder", userMiddleware, getOrder);

module.exports = router;
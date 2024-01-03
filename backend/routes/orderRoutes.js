import express from "express";
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

import * as orderController from '../controller/orderController.js'
import * as cartController from '../controller/cartController.js'

router.post('/cart',protect,cartController.addCartItems)
router.post('/order',protect,orderController.addOrderItems)
router.get('/order/:id',protect,orderController.getOrderById)
router.put('/order/:id/pay',protect,orderController.updateOrderToPaid)
router.get('/myorder',protect,orderController.getMyOrders)
router.delete('/cart/:id',protect,cartController.removeProductFromCart)

export default router
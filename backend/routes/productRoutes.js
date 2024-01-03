import express from "express";
const router = express.Router();
import * as productController from '../controller/productController.js'
import { protect,admin } from '../middleware/authMiddleware.js';

router.get('/product',productController.getProduct)
router.post('/product',protect, admin, productController.createProduct)
router.get('/product/:id',productController.getProductId)
router
  .route('/product/:id')
  .delete(protect, admin, productController.deleteProduct)
  .put(protect, admin, productController.updateProduct)

export default router
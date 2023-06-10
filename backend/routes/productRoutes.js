import express from "express";
const router = express.Router();
import * as productController from '../controller/productController.js'

router.get('/product',productController.getProduct)
router.get('/product/:id',productController.getProductId)


export default router
import express from 'express'
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as ProductsController from '../controllers/Products'
const router = ExpressPromiseRouter();
router.route('/')
.get(ProductsController.getAllProducts)
.get(ProductsController.getProduct)
.post(protect,ProductsController.createProducts,restrictRole('admin' || 'vendor'))

router.route('/:prodid')
.patch(protect,ProductsController.editProduct,restrictRole('admin' || 'vendor'))
.delete(protect,ProductsController.deleteProduct)

export default router;
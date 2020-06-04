import express from 'express'
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as UserController from '../controllers/Authentication'
const router = ExpressPromiseRouter();
//Routes For Normal Things
router.route('/')
.post(UserController.login)
.put(UserController.signUp)
.get(UserController.getAllUsers,protect)


/// Routes For Updatings
router.route('/userUpdatings')
.patch(UserController.upadteUser,protect,restrictRole('admin' || 'vendor'))
.post(UserController.logOut,protect,restrictRole('admin' || 'vendor'))
.delete(UserController.deletAccount,protect,restrictRole('admin' || 'vendor'))

export default router;
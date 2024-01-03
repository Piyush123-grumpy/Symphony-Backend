
import express from 'express'
const router = express.Router();
import * as authController from '../controller/authController.js'
import { protect,admin } from '../middleware/authMiddleware.js';
// var bouncer = require ("express-bouncer")(500, 900000);
import bouncer from 'express-bouncer';

var bouncerVar=bouncer(500,900000,3)

bouncerVar.blocked = function (req, res, next, remaining)
{   
    res.status(429)
    throw new Error("Too many login attempts please wait for a few minute")
	// res.send (429, "Too many login attempts please wait for a few minute");
};

// router.route('/').post(registerUser).get(protect, admin, getUsers);
router.get('/users',[protect, admin], authController.getUsers);
router.post('/signup', authController.signup_post);
router.post('/login',bouncerVar.block,authController.authUser);
router.route('/profile').get(protect, authController.getUserProfile).put(protect, authController.updateUserProfile)
router
  .route('/users/:id')
  .delete(protect, admin, authController.deleteUser)
  .get(protect, admin, authController.getUserById)
  .put(protect, admin, authController.updateUser)


  
export default router
import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
//   updateUserProfile,
//   getUsers,
//   deleteUser,
//   getUserById,
//   updateUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

 //router.route('/').post(registerUser).get(protect, admin, getUsers)
 router.route('/').post(registerUser)
// router.post('/login', authUser)
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
// router
//   .route('/:id')
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser)


router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default router

import express from 'express'
const router = express.Router()
import {getProducts,getProductById} from '../controllers/productController.js' 

//@desc    Fetch all product
//@route   GET/api/products
//@acess  public
router.route('/').get(getProducts)


//@desc    Fetch single product
//@route   GET/api/products/:id
//@acess  public

router.route('/:id').get(getProductById)


export default router

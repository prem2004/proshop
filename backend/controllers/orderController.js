import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @desc    create new order
// @route   POST /api/order
// @access  private
const addOrderItems = asyncHandler(async (req, res) => {
   const {orderItems, shippingAddress,
       paymentMethod,itemPrice,taxPrice,
    shippingPrice,totalPrice}=req.body
 
   if(orderItems && orderItems===0)
   {
        res.status(400);
        throw new Error("No order items");
        return
   }else{
       const order=new Order({
        orderItems,
        user:req.user._id, 
        shippingAddress,
        paymentMethod,
        itemPrice,taxPrice,
        shippingPrice,
        totalPrice
       });

     const createdOrder = await order.save();
     res.status(201).json({createdOrder}) 

   } 

    })



    
// @desc    GET order by id 
// @route   GET /api/order/:id
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
 
   const order = await Order.findById(req.params.id).populate('user','name email')

   if(order)
   {
     res.json(order)
   }else{
     res.status(404)
    throw new Error("prem Order Not found")
   }

   })


      
// @desc    Update order to paid 
// @route   get /api/order/:id/pay
// @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
 
  const order = await Order.findById(req.params.id)

  if(order)
  {
    order.isPaid=true;
    order.paidAt=Date.now();
    order.paymentResult={
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.payer.email_address
    }
    const updatedOrder=await order.save();
    res.json(updatedOrder)

  }else{
    res.status(404)
   throw new Error("Order Not found")
  }

  })



export{getOrderById,addOrderItems,updateOrderToPaid}
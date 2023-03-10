import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import orderRoutes from './routes/orderRoutes.js'
import { protect } from './middleware/authMiddleware.js'


dotenv.config()

connectDB()

const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("API IS Running...")
})

app.use('/api/products',productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal',(req,res)=>
res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)

app.use(errorHandler)



const PORT =process.env.PORT || 5000;

app.listen(PORT,console.log(`server running in  on port ${PORT}`))
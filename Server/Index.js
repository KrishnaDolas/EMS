import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRouter from './Routes/Auth.js'
import connectToDatabase from './db/db.js'

connectToDatabase()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on PORT ${process.env.PORT}`);
    
})
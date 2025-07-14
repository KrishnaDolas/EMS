import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://kdolas99:cH4bhh1QNStIqUMv@cluster0.owggq.mongodb.net/')


app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on PORT ${process.env.PORT}`);
    
})
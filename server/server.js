import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./contollers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";

//initialize express
const app = express();

//connect database
await connectDB()
await connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//routes
app.get('/', (req, res) => res.send("API is running..."))
app.post('/clerk', clerkWebhooks)
app.use('/educator', educatorRouter)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
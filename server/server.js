import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks } from "./contollers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";

//initialize express
const app = express();

//connect database
await connectDB()
await connectCloudinary()

// Stripe raw body middleware for this route ONLY
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

//middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//routes
app.get('/', (req, res) => res.send("API is running..."))
app.post('/clerk', clerkWebhooks)
app.use('/educator', educatorRouter)
app.use('/course', courseRouter)
app.use('/user', userRouter)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
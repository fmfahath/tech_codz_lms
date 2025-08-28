import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./contollers/webhooks.js";

//initialize express
const app = express();

//connect database
connectDB()

//middleware
app.use(express.json())
app.use(cors())

//routes
app.get('/', (req, res) => res.send("API is running..."))
app.post('/clerk', clerkWebhooks)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
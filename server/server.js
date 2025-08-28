import express from "express";
import "dotenv/config";
import cors from "cors";

//initialize express
const app = express();

//middleware
app.use(cors())

//routes
app.get('/', (req, res) => res.send("API is running..."))

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
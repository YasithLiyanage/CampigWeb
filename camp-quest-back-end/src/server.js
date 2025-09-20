import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const port = 5001

connectDB();
//middleware
app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
  res.send("API is running...");
})

app.listen(port,()=> {
  console.log('Server is running on http://localhost:${port}');
});


import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/authRoutes";
import quizzRouter from "./routes/quizzRoutes";
import cityRouter from "./routes/cityRoutes";

const app=express();

app.use(express.json())
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
await mongoose.connect(process.env.REACT_APP_MONGO_URL!);
console.log("started")
app.use(quizzRouter);
app.use(cityRouter);
app.listen(5555);

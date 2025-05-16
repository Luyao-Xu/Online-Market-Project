import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import productRouter from './routers/product.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';
import sellerRouter from './routers/seller.router';
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/sellers",sellerRouter);

const port = 5000;
app.listen( port, () => {
    console.log("Website served on http://localhost:" + port);
})
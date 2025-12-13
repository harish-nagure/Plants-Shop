import express from "express";
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder,placeCODOrder,updateStatus,userOrders,verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

//endpoints
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post('/place-cod',authMiddleware, placeCODOrder);



export default orderRouter;
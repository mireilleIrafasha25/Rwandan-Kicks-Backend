
import userRoute from "./userRoute.js";
import contactRoute from "./contactRoute.js";
import ProductRoute from "./productRoute.js"
import express from "express";
import Order from "./orderRoute.js"
import Cart from "./cartRoute.js";
import Payment from "./paymentRoute.js";
const route = express.Router();
route.use("/user", userRoute);
route.use("/contact", contactRoute);
route.use("/product", ProductRoute);
route.use("/order", Order);
route.use("/cart", Cart);
route.use("/payment", Payment);
export default route;
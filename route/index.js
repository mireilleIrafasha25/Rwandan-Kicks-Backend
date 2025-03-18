
import userRoute from "./userRoute.js";
import contactRoute from "./contactRoute.js";
import ProductRoute from "./productRoute.js"
import express from "express";
import Order from "./orderRoute.js"
const route = express.Router();
route.use("/user", userRoute);
route.use("/contact", contactRoute);
route.use("/product", ProductRoute);
route.use("/order", Order);
export default route;
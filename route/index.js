
import userRoute from "./userRoute.js";
import contactRoute from "./contactRoute.js";
import ProductRoute from "./productRoute.js"
import express from "express";
const route = express.Router();
route.use("/user", userRoute);
route.use("/contact", contactRoute);
route.use("/product", ProductRoute);
export default route;
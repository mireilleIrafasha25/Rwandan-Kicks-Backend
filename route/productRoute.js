import { TestProduct,AddProduct,GetProducts,UpdateProduct,GetProductById,GetProductsByCategory,DeleteProduct} from "../controller/productController.js";
import express from "express";
import upload from "../middleware/multer.js";
import {authenticateToken,authorize} from "../middleware/authethicateToken.js"
const route=express.Router();

route.get("/test",TestProduct);
route.post("/addProduct",upload.single('image'),authenticateToken,authorize("seller"),AddProduct);
route.get("/getProducts",GetProducts);
route.put("/updateProduct/:productId",authenticateToken,authorize("seller"),UpdateProduct);
route.get("/getProductById/:productId",GetProductById);
route.get("/getProductsByCategory/:category",GetProductsByCategory);
route.delete("/deleteProduct/:id",authenticateToken,authorize("seller"),DeleteProduct);
export default route;
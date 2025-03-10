import ProductModel from "../model/productModel.js";
import asyncWrapper from "../middleware/async.js";
import { validationResult } from "express-validator";
import { NotFoundError } from "../error/notfoundError.js";
import dotenv from "dotenv"
import cloudinary from "../utils/cloudinary.js"
import path from "path";
dotenv.config();
export const TestProduct=(req,res,next)=>
{
    res.status(200).json({message:'Hello Product Owner!'});
}

export const AddProduct = asyncWrapper(async (req, res, next) => {
    try {
    
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }
  
      const filePath = path.resolve(req.file.path); // Convert to absolute path
  
      const result = await cloudinary.uploader.upload(filePath, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
  
  
      if (!result || !result.url) {
        throw new Error("Failed to upload image to Cloudinary");
      }
    const seller=req.user.id
      const product = new ProductModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        stock:req.body.stock,
        seller,
        image: {
          url: result.url,
        },
      });
  
      const savedProduct = await product.save();
  
      return res.status(201).json({
        message: "Product created successfully",
        product: savedProduct,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export const GetProducts=asyncWrapper(async(req,res,next)=>
{
    const products=await ProductModel.find();
    if(!products)
    {
        return next(new NotFoundError('No products found'));
    }
    else
    {
        res.status(200).json({
            size: products.length,
            products});
    }
  
})

export const UpdateProduct=asyncWrapper(async(req, res, next)=>
{
    const {id}=req.params;
    const updatedData=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.array());
        return next(new BadRequestError(errors.array()[0].msg));
    }
   const updatedProduct=await ProductModel.findOneAndUpdate(
    {id: id},
     updatedData, 
    {new:true,runValidators:true}
   );
   if(!updatedProduct)
   {
    return res.status(404).json({
        message:'Product not found'
    });
   }
   res.status(200).json({
    message:'Product updated successfully',
    product:updatedProduct
   })
})

export const DeleteProduct=asyncWrapper(async(req,res,next)=>
{
    const id=req.params.id;
    const deletedProduct=await ProductModel.findByIdAndDelete(id);
    if(!deletedProduct)
    {
        return res.status(404).json({
            message:'Product not found'
        });
    }
    res.status(200).json({
        message:'Product deleted successfully',
        product:deletedProduct
    })
})

export const GetProductById=asyncWrapper(async(req,res,next)=>
{
    const id = req.params.id; 
    

    const product = await ProductModel.findById({ id });
    if(!product)
    {
        return next(new NotFoundError('Product not found'));
    }
    else
    {
        res.status(200).json({
            product
        })
    }
})

export const GetProductsByCategory=asyncWrapper(async(req,res,next)=>
{
    const category=req.params.category;
    const products=await ProductModel.find({category:category});
    if(!products)
    {
        return next(new NotFoundError('No products found in this category'));
    }
    else
    {
        res.status(200).json({
            size: products.length,
            products
        })
    }
})
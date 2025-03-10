import mongoose from "mongoose";

const schema = mongoose.Schema;
const ProductSchema = new schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: {url:{ type: String }},
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Seller reference
  ratings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
//Product model and entity name called Product
const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;

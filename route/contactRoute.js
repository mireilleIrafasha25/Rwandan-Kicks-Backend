import {addNewContact,ListContact,findbyUser,updateContact,deleteContact} from "../controller/ContactController.js";
import {addnewMessageValidation} from "../utils/validation.js"
import express from "express";
import { authorize,authenticateToken } from "../middleware/authethicateToken.js";
const route = express.Router();
route.post("/add",addNewContact);
route.get("/list", authenticateToken, authorize("admin"), ListContact);
route.get("/findbyUser/:id", findbyUser);
route.put("/update/:id", updateContact);
route.delete("/delete/:id", deleteContact);

export default route;

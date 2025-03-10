
import {SignIn,SignUp,ResetPassword,ForgotPassword,Validateopt,test, getAllusers,updateUser,findUserByName,deleteUser} from '../controller/usercontroller.js';
import express from 'express';
import { signUpValidation,signInValidation,otpValidation,resetPasswordValidation,forgotpasswordValidation, } from '../utils/validation.js';
import {authenticateToken,authorize} from "../middleware/authethicateToken.js"
const route= express.Router();
route.get("/Test",test)
route.post('/signup',signUpValidation,SignUp)
route.post('/signin',signInValidation,SignIn)
route.get('/listAll',getAllusers)
route.post('/resetpassword',resetPasswordValidation,ResetPassword)
route.post('/forgotpassword',forgotpasswordValidation,ForgotPassword)
route.post('/verify',Validateopt)
route.put('/updateByEmail',updateUser)
route.delete('/deleteUser/:id',deleteUser)
route.get('/search/:id',findUserByName)
export default route;

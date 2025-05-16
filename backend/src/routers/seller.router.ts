import {Router} from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';
import { Seller, SellerModel } from '../models/seller.model';

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
     const sellersCount = await SellerModel.countDocuments();
     if(sellersCount> 0){
       res.send("Seed is already done!");
       return;
     }
 }
 ))

 router.post("/login", asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
    const seller = await SellerModel.findOne({email});
  
     if(seller && (await bcrypt.compare(password,seller.password))) {
      res.send(generateTokenReponse(seller));
     }
     else{
       res.status(HTTP_BAD_REQUEST).send("Sellername or password is invalid!");
     }
    }
))

router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address,type} = req.body;
    const seller = await SellerModel.findOne({email});
    if(seller){
      res.status(HTTP_BAD_REQUEST)
      .send('Seller is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newSeller:Seller = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
      type
    }

    const dbSeller = await SellerModel.create(newSeller);
    res.send(generateTokenReponse(dbSeller));
  }
))


  const generateTokenReponse = (seller : Seller) => {
    const token = jwt.sign({
      id: seller.id,email:seller.email, isAdmin: seller.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });

    return {
      id: seller.id,
      email: seller.email,
      name: seller.name,
      address: seller.address,
      isAdmin: seller.isAdmin,
      token: token,
      type:seller.type
    };
  }
  export default router;
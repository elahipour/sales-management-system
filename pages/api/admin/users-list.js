import User from "@/models/User";
import connectToDB from "@/utils/DBconnection";
import { verification } from "@/utils/auth";
import { verify } from "jsonwebtoken";

export default async function handler(req,res){
try {
    connectToDB();
} catch (error) {
    res.status(500).json({status:'500',message:'connection error'});
    return;
}

if(req.method==='GET'){
res.status(500).json({status:'500',message:'you have no premmision'})

    return;
}
const secretKey=process.env.SECRET_KEY;
const {token}=req.cookies;
const user=verification(token,secretKey)
const isValidUser=await User.findOne({email:user.email});
if(!isValidUser){
res.status(401).json({status:'401',message:'user not found'})
return;
}
if(isValidUser.role!=="admin"){
res.status(401).json({status:'401',message:'you have no premmision'})
    return;
}
const users=await User.find({role:'user'});
res.status(200).json({status:'200',users})
return;

}


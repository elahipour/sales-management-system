import User from "@/models/User";
import connectToDB from "@/utils/DBconnection";
import { verification } from "@/utils/auth";

export default async function handler(req,res){
try {
    connectToDB();
} catch (error) {
    res.status(500).json({status:'500',message:'connection error.'})
}
if(req.method!=="POST")return;
const userid=req.body;
const {token}=req.cookies;

if(!token){
    res.status(500).json({status:'401',message:'unauthorized error.'});
    return;
}

const secretKey=process.env.SECRET_KEY;
const data=verification(token,secretKey);

if(!data){
    res.status(500).json({status:'401',message:'unauthorized error'});
    return;
}

const user=await User.findById({_id:userid});
user.isApprovedByAdmin=!user.isApprovedByAdmin;
await user.save();
res.status(200).json({status:'200',message:'saved', checked:user.isApprovedByAdmin})

}
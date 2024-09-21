import Customer from "@/models/Customer";
import User from "@/models/User";
import connectToDB from "@/utils/DBconnection";
import { verification } from "@/utils/auth";


export default async function handler(req,res){
    try {
        await connectToDB();

    } catch (error) {
        res.status(500).json({
            status:'500',message:'error in connection.'
        });
        return;
    }

    if(req.method==='DELETE'){
        const secretKey=process.env.SECRET_KEY;
const {token}=req.cookies;
const user=verification(token,secretKey)
const isValidUser=await User.findOne({email:user.email});
if(!isValidUser){
res.status(401).json({status:'401',message:'user not found'})
return;
}
if(user._id===isValidUser._id){
res.status(401).json({status:'401',message:'you have no premmision'})
    return;
}
       try{
        const id=req.query.userID;
        await User.deleteOne({_id:id});
        res.status(200).json({status:'200',message:'User was deleted.'});
       }catch(error){
        res.status(500).json({status:'500',message:'failed'});
        return;
       }
    }
}
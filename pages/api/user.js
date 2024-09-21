import connectToDB from "@/utils/DBconnection";
import { verification } from "@/utils/auth";

async function handler(req,res){
if(req.method!=='GET')return;
try {
    await connectToDB();
  } catch (error) {
    res.status(500).json({ status: "500", message: "connection error" });
    return;
  }
const {token}=req.cookies;
if(!token){
    res.status(401).json({status:'401',message:'unauthorized error!'});
    return;
}
const secretKey=process.env.SECRET_KEY;
const user=verification(token,secretKey);
if(user){
    res.status(200).json({status:'200',message:'authorized success',role:user.role});
    return;  
}
else{
    res.status(401).json({status:'401',message:'unathurized error!'})
    return;
}
}

export default handler;
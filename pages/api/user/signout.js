import connectToDB from "@/utils/DBconnection";
import { serialize } from "cookie";

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
        res.status(200).json({message:'You are already out'});       
        return;}
        const serialized=serialize('token','',{path:'/',maxAge:'0'});
        res.status(200).setHeader('Set-Cookie',serialized).json({status:'200',message:'logout successfull'});

}
export default handler;
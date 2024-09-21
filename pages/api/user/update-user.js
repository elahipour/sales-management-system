import User from "@/models/User";
import connectToDB from "@/utils/DBconnection";
import { verification, verifyPassword } from "@/utils/auth";

async function handler(req,res){
if(req.method!=='POST')return;

try {
    await connectToDB();
} catch (error) {
    res.status(500).json({status:'500',message:'connection error.'})
    return;

}
const {token}=req.cookies;
const {firstname,lastname,email,password}=req.body;
if(!firstname || !lastname){
    res.status(400).json({status:'400',message:'Do not leave the fields empty'});
    return;}

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
if(email!==data.email){
    res.status(500).json({status:'401',message:'unauthorized error.'});
    return;
}
const user=await User.findOne({email:data.email});
if(!user){
    res.status(500).json({status:'401',message:'unauthorized error.'});
    return;
}
const passwordVerification=await verifyPassword(password,user.password)
if(!passwordVerification){
    res.status(500).json({status:'401',message:'unauthorized error.'});
    return;
}

user.firstname=firstname;
user.lastname=lastname;
user.save();
res.status(201).json({status:'201',message:'updated!'})

}
export default handler;
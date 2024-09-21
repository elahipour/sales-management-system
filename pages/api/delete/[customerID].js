import Customer from "@/models/Customer";
import connectToDB from "@/utils/DBconnection";


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
       try{
        const id=req.query.customerID;
        await Customer.deleteOne({_id:id});
        res.status(200).json({status:'200',message:'customer was deleted.'});
       }catch(error){
        res.status(500).json({status:'500',message:'failed'});
        return;
       }
    }
}
import { useState } from "react"
import Form from "../modules/Form"
import { useRouter } from "next/router";

function CustomerEditPage({data,setData,customerID}) {
    const router=useRouter();
const [form,setForm]=useState({
    firstname:data.firstname||"",
            lastname:data.lastname||"",
            email: data.email||"",
            phone: data.phone||"",
            address:data.address||"",
            postalCode: data.postalCode||"",
            date: data.date||"",
            products:data.products||"",
}) 
function handleCancel() {
    setForm({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        date: "",
        postalCode:'',
        products: [{name:"",price:"",qty:""}],
      });
      router.push('/');
  }
  async function handleUpdate(){
   try {
    const res=await fetch(`/api/edit/${customerID}`,{
        method:'PATCH',
        body:JSON.stringify({data:form}),
        headers:{'Content-Type':'application/json'}
    });
    const data=await res.json();
    console.log(data)
 router.push('/')    
} catch (error) {
    console.error(error);
   }
    
  }
return (
    <div className="customer-page w-[700px] mt-4  p-4 rounded-md shadow-xl max-h-[70vh] overflow-y-scroll shadow-xl bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5]">
      <h1 className="font-[700] text-[1.2rem] my-6 text-[#3d3d3d] [text-shadow:1px_1px_3px_rgba(100,100,100,.5)]">Edit Customer</h1>

        <Form form={form} setForm={setForm}/>
        <div className="customer-page__buttons  font-[600] text-[1.1rem] flex gap-4 mt-4">
        <button className="first text-[#1b3f1d] bg-[#ffffff]  border-2 p-2 rounded-md glass" onClick={handleCancel}>
          Cancel
        </button>
        <button className="second text-[#ffffff] bg-[#1b3f1d]  border-2 p-2 rounded-md glass" onClick={handleUpdate}>
          update
        </button>
      </div>
    </div>
  )
}

export default CustomerEditPage
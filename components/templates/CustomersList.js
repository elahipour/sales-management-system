import connectToDB from "@/utils/DBconnection";
import Customers from "./Customers";
import Customer from "@/models/Customer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CustomersList() {
  const router=useRouter();
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    async function checkRole(){
      const res = await fetch("/api/user");
      const user = await res.json();
    
      if(user.role==='admin'){
        router.push('/admin/dashboard')
      }
    }
checkRole();
    async function fetchCustomers() {
      const res = await fetch("/api/customers");
      const customers = await res.json();
      setCustomers(customers?.data?.userCustomers);
    }
    fetchCustomers();
  }, []);

  return (
    <>
      {customers?.length ?
        <div className="w-fit mx-auto  p-4 rounded-md shadow-xl bg-gradient-to-r from-[#abeeae] to-[#CdDF9F]">
          <h1 className="font-[600] text-[1.3rem] text-[#3d3d3d]">Customers List</h1>
          <Customers customers={customers} />
        </div>
      :''}
    </>
  );
}

export default CustomersList;

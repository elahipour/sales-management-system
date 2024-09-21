import { getUsersRegisteredLastSevenDays } from "@/utils/getChart";
import Users from "./Users";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function AdminPanel() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsersList() {
      const res = await fetch("/api/admin/users-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!data?.users?.length) {
        router.push("/");
      }
      setUsers(data.users);
    }
    getUsersList();
  }, [users]);
  return (
    <div className="grid place-items-center">
      {users.length ?
        
        <div  className="w-fit mx-auto  p-4 rounded-md shadow-xl bg-gradient-to-r from-[#abeeae] to-[#CdDF9F]">
          <h1 className="font-[600] text-[1.3rem] ">Users List</h1>
          <Users users={users} />
        </div>
      :''}
    </div>
  );
}

export default AdminPanel;

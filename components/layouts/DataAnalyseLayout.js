import { useEffect, useState } from "react";
import CustomerDataAnalyseSidebar from "./CustomerDataAnalyseSidebar";
import hasValue from "@/utils/hasValue";
import UserDataAnalyseSidebar from "./UserDataAnalyseSidebar";
import UserDataAnalyseFooter from "./UserDataAnalyseFooter";
import { useRouter } from "next/router";

function DataAnalyseLayout({ children }) {
  const [customers, setCustomers] = useState({});
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [conectionTimeOut, setConnectionTimeOut] = useState(false);
  const [top3SellersByAmount, setTop3SellersByAmount] = useState([]);

  const [top3SellersByNumOfCustomers, setTop3SellersByNumOfCustomers] =
  useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/admin/users-list", {
        method: "POST",
      });
      const data = await res.json();
      setUsers(data.users);

      const timeout = setTimeout(() => {
        if (!data.users.length) {
          setConnectionTimeOut(true);
        } else {
          setConnectionTimeOut(false);
        }
      }, 5000);
    }
    async function fetchCustomers() {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomers(data.data);
      const timeout = setTimeout(() => {
        if (!hasValue(data.data)) {
          setConnectionTimeOut(true);
        } else {
          setConnectionTimeOut(false);
        }
      }, 5000);
    }

    async function isAdmin() {
      const res = await fetch("/api/user");
      const user = await res.json();
      if (user.role === "admin") {
        fetchUsers();
        fetchCustomers();
        setUserRole("admin");
      } else {
        setUserRole("user");
        fetchCustomers();
      }
    }
    isAdmin();
  }, []);

  return (
    <div
      className={`flex ${
        hasValue(customers) || users.length ? "flex-row" : "flex-col-reverse"
      } gap-4 mt-[100px] w-fit mx-auto p-4 rounded-md shadow-xl bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5]`}
    >
      <div className="flex flex-col gap-2 ">
        <div>{children}</div>
        <UserDataAnalyseFooter top3SellersByAmount={top3SellersByAmount} setTop3SellersByAmount={setTop3SellersByAmount} top3SellersByNumOfCustomers={top3SellersByNumOfCustomers} setTop3SellersByNumOfCustomers={setTop3SellersByNumOfCustomers} users={users} userRole={userRole}/>
      </div>
      {userRole === "user" ? (
        hasValue(customers) ? (
          <CustomerDataAnalyseSidebar customers={customers}/>
        ) : (
          ""
        )
      ) : (
        <UserDataAnalyseSidebar users={users}  customers={customers} top3SellersByNumOfCustomers={top3SellersByNumOfCustomers}/>
      )}
      {!hasValue(customers) && !users.length && (
        <i className="not-italic flex items-center font-bold text-[1.2rem] mt-[100px] text-[#393f20]">
          <span>Loading</span>
          <span className="loading loading-spinner loading-lg"></span>
        </i>
      )}
      {conectionTimeOut ? (
        <span className="text-center block w-full font-bold text-red-600">
          اینترنت را بررسی و صفحه را مجدد بارگزاری نمایید
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default DataAnalyseLayout;

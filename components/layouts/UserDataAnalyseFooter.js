import { getUsersRegisteredLastSevenDays } from "@/utils/getChart";
import { Chart } from "chart.js";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function UserDataAnalyseFooter({ users, userRole ,top3SellersByNumOfCustomers,setTop3SellersByNumOfCustomers,top3SellersByAmount, setTop3SellersByAmount }) {

  const [footerTab, setFooterTab] = useState(1);
  const router = useRouter();

  useEffect(() => {
    getTop3SellersByAmount();
    async function getTop3SellersByAmount() {
      const res = await fetch("/api/admin/sellersByAmount", {
        method: "POST",
      });
      const data= await res.json();
      setTop3SellersByAmount(data.sellers.top3Sellers);
    }

    getTop3SellersByNumOfCustomers();
    async function getTop3SellersByNumOfCustomers() {
      const res = await fetch("/api/admin/sellersByNumberOfCustomers", {
        method: "POST",
      });
      const data = await res.json();
      setTop3SellersByNumOfCustomers(data?.sellers?.top3Sellers);
    }
  }, [top3SellersByNumOfCustomers]);

  //  !users.length && router.push("/user/dashboard");

  return (
   userRole==='admin' && <div>
      <div className="flex gap-2">
        <button
          onClick={() => setFooterTab(1)}
          className={`${
            footerTab === 1
              ? "from-[#bdf6bd] to-[#7cbf5fa0]"
              : "from-[#7cbf5fa0] to-[#bdf6bd] text-[#83b188]"
          } bg-gradient-to-t rounded rounded-br-none rounded-bl-none px-2 py-1 font-[500]`}
        >
          Top-3 Sellers
        </button>
        <button
          onClick={() => setFooterTab(2)}
          className={`${
            footerTab === 2
              ? "from-[#bdf6bd] to-[#7cbf5fa0]"
              : "from-[#7cbf5fa0] to-[#bdf6bd] text-[#83b188]"
          } bg-gradient-to-t rounded rounded-br-none rounded-bl-none px-2 py-1 font-[500]`}
        >
          New Feature
        </button>
      </div>
      <div className="flex justify-start gap-6 p-4 rounded-md shadow-xl bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5]">
       
        {top3SellersByAmount.length && (
          <ul className="shadow-xl bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5] p-2 flex flex-col gap-3">
            <h5 className="text-[#779f94] font-bold">By Amount</h5>
            {top3SellersByAmount.map((seller,index) => {
              return (
                <li
                  className="px-2 rounded-md flex flex-col font-[500] bg-[#aedb9f] text-[#5e8177]"
                  key={index}
                  // key={ seller.user._id}

                >
                  <p className="text-[#174e17ca]">{seller.email}</p>
                  <p className="text-[#17591794]">
                    sales:{seller.totalPurchase}T
                  </p>
                </li>
              );
            })}
          </ul>
        )}
        {top3SellersByNumOfCustomers.length && (
          <ul className="shadow-xl bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5] p-2 flex flex-col gap-3">
            <h5 className="text-[#779f94] font-bold">By Customers</h5>
            {top3SellersByNumOfCustomers.map((seller,index) => {
              return (
                <li
                  className="px-2 rounded-md flex flex-col font-[500] bg-[#aedb9f] text-[#5e8177]"
                  key={index}
                >
                  <p className="text-[#174e17ca]">{seller.email}</p>
                  <p className="text-[#17591794]">
                    Customers:{seller.numberOfSales}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
          
  );
}

export default UserDataAnalyseFooter;

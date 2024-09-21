import calcUserSales from "@/utils/calcUserSales";
import BoronzImg from '@/public/images/boronz.png'
import silverImg from '@/public/images/silver.png'
import goldImg from '@/public/images/gold.png'
import {
  getCustomerRegistrationChart,
  getPurchaseLastSevenDays,
} from "@/utils/getChart";
import hasValue from "@/utils/hasValue";
import { Chart } from "chart.js";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Image from "next/image";

function CustomerDataAnalyseSidebar({ customers }) {
  const { userCustomers, allCustomers } = customers;
  const pieChartElem = useRef();

  const router = useRouter();
  useEffect(() => {
    const customerRegistrationChart = getCustomerRegistrationChart(
      pieChartElem,
      allCustomers,
      userCustomers
    );
    return () => customerRegistrationChart.destroy();
  }, []);

  !hasValue(userCustomers) && router.push("/user/dashboard");

  return (
    <div className="flex flex-col w-[250px] p-4 rounded-md shadow-xl bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5]">
      <ul className="mb-14 relative">
        {calcUserSales(userCustomers) === "boronz" && <li className="flex justify-center absolute top-0 right-0"><Image width={35} height={35} src={BoronzImg}/></li>}
        {calcUserSales(userCustomers) === "silver" && <li className="flex justify-center absolute top-0 right-0"><Image width={35} height={35} src={silverImg}/></li>}
        {calcUserSales(userCustomers) === "gold" && <li className="flex justify-center absolute top-0 right-0"><Image width={35} height={35} src={goldImg}/></li>}
      </ul>
      <canvas ref={pieChartElem}></canvas>
      {/* <canvas ref={linearChartElem}></canvas> */}
    </div>
  );
}

export default CustomerDataAnalyseSidebar;

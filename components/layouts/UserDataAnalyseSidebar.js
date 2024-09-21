import {
  getPurchaseLastSevenDays,
  getUsersRegisteredLastSevenDays,
} from "@/utils/getChart";
import { Chart } from "chart.js";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function UserDataAnalyseSidebar({
  users,
  customers,
  top3SellersByNumOfCustomers,
}) {
  const linearChartElem7Days = useRef();
  const linearChartElem7Users = useRef();
  const [last2Days, setLast2Days] = useState([]);
  const [theMostActiveSeller, setTheMostActiveSeller] = useState();
  const { userCustomers, allCustomers } = customers;

  useEffect(() => {
    function usersLastSevenDaysChart() {
      const usersLastSevenDays = getUsersRegisteredLastSevenDays(users);

      const chart = linearChartElem7Users.current?.getContext("2d");
      let userChart = new Chart(chart, {
        type: "line",
        data: {
          labels: ["-6", "-5", "-4", "-3", "-2", "دیروز", "امروز"],
          datasets: [
            {
              label: `کاربران ثبت شده 7 روز آخر`,
              data: usersLastSevenDays,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      return () => userChart.destroy();
    }
    return usersLastSevenDaysChart();
  }, [users]);

  function compareTop3Users(top3SellersByNumOfCustomers) {
    const user1 = top3SellersByNumOfCustomers[0];
    const user2 = top3SellersByNumOfCustomers[1];
    const user3 = top3SellersByNumOfCustomers[2];
    let topUser = user1;
    // console.log({u1:top3SellersByNumOfCustomers[0],u2:top3SellersByNumOfCustomers[1]})
    if (user1?.numberOfSales === user2?.numberOfSales) {
      if (user2?.totalPurchase > user1?.totalPurchase) {
        topUser = user2;
      } else {
        topUser = user1;
      }
      if (user1?.numberOfSales === user3?.numberOfSales) {
        if (user3?.totalPurchase > user1?.totalPurchase) {
          topUser = user3;
        } else {
          topUser = user1;
        }
      }
    }

    setTheMostActiveSeller(topUser);
  }

  useEffect(() => {
    const purchaseLastSevenDays = getPurchaseLastSevenDays(allCustomers);
    function purchaseLastSevenDaysChart() {
      const chart = linearChartElem7Days.current?.getContext("2d");
      const purchaseChart = new Chart(chart, {
        type: "line",
        data: {
          labels: ["-6", "-5", "-4", "-3", "-2", "دیروز", "امروز"],
          datasets: [
            {
              label: `خریدهای 7 روز آخر`,
              data: purchaseLastSevenDays,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      setLast2Days(purchaseLastSevenDays.slice(-2));
      return () => purchaseChart.destroy();
    }
    compareTop3Users(top3SellersByNumOfCustomers);

    return purchaseLastSevenDaysChart();
  }, [allCustomers]);
  console.log(last2Days);
  //  !users.length && router.push("/user/dashboard");

  return (
    <div className="flex flex-col w-[250px] p-4 rounded-md shadow-xl bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5]">
      {/* <canvas ref={pieChartElem}></canvas> */}
      <canvas ref={linearChartElem7Days}></canvas>
      <canvas ref={linearChartElem7Users}></canvas>
      <div>
        <span>
          {last2Days.length &&
            (last2Days[1] > last2Days[0]
              ? "Purchases compared to the previous day:🤩💹"
              : "Purchases compared to the previous day:🙃〽")}
        </span>
      </div>
      <div>
        <span>
        The most active seller:{theMostActiveSeller?.firstname ?  theMostActiveSeller?.firstname + ' ' + theMostActiveSeller?.lastname :theMostActiveSeller?.email}
        </span>
      </div>
    </div>
  );
}

export default UserDataAnalyseSidebar;

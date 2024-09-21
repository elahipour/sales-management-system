import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function getCustomerRegistrationChart(chartElem, allCustomers, userCustomers) {
  const chart = chartElem.current.getContext("2d");
  return new Chart(chart, {
    type: "pie",
    data: {
      labels: ["دیگران", "شما"],
      datasets: [
        {
          label: "مشتریان ثبت شده",
          data: [allCustomers?.length-userCustomers?.length, userCustomers?.length],
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
}
const getDay = (data) => data.createdAt.split("-")[2].substring(0, 2);

function getPurchaseLastSevenDays(allCustomers) {
  const lastDay = getDay({
    createdAt: new Date().toString().split(" ").join("-"),
  });
  const sevenDays = [];

  for (let i = 6; i >= 0; i--) {
    const day = lastDay - i < 1 ? 31 - (lastDay - i) * -1 : lastDay - i;
    sevenDays.push(day);
  }
  const customerPays = [];
  sevenDays.map((day) => {
    const customers = allCustomers?.filter(
      (customer) => +getDay(customer) === +day
    );
    if (customers?.length) {
      customerPays.push(customers);
    } else {
      customerPays.push([
        {
          products: [],
        },
      ]);
    }
  });
  // console.log(customerPays);
  const lastSevenPurchases = [];
  customerPays.map((customer) => {
    let sum = 0;
    customer.map((c) => {
      c.products.map((product) => {
        sum += ((+product.price)*(+product.qty));
      });
    });
    lastSevenPurchases.push(sum);
  });

  return lastSevenPurchases;
}


function getUsersRegisteredLastSevenDays(allUsers) {
  const lastDay = getDay({
    createdAt: new Date().toString().split(" ").join("-"),
  });
  const sevenDays = [];

  for (let i = 6; i >= 0; i--) {
    const day = lastDay - i < 1 ? 31 - (lastDay - i) * -1 : lastDay - i;
    sevenDays.push(day);
  }
  const registeredUsers = [];
  sevenDays.map((day) => {
    const users = allUsers?.filter(
      (user) => +getDay(user) === +day
    );
    if (users?.length) {
      registeredUsers.push(users);
    } else {
      registeredUsers.push([]);
    }
  });
  const UsersRegisteredLastSevenDays = [];
  registeredUsers.map((users) => {
    UsersRegisteredLastSevenDays.push(users.length);
  });

  return UsersRegisteredLastSevenDays;
}



//Top Ten Sellers , Number Of Sales



export { getCustomerRegistrationChart, getPurchaseLastSevenDays ,getUsersRegisteredLastSevenDays};

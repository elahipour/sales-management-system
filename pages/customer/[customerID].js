import DashboardLayout from "@/components/layouts/DashboardLayout";
import CustomerDetail from "@/components/templates/PersonDetails";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
function CustomerDetailsPage() {
  const router = useRouter();
  const { isReady, query } = router;
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    if (isReady) {
      const result = fetch(`/api/customers/${query.customerID}`)
        .then((res) => res.json())
        .then((data) => setCustomer(data.userData));
    }
  }, [isReady]);
  async function handleDelete() {
    const res = await fetch(`/api/delete/${customer._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "200") {
      router.reload();
    }
    console.log(data);
  }
  // function toPersian(customerDate) {
  //   let date = new Date(customerDate).toLocaleDateString("fa-IR");
  //   return date;
  // }

  return (
    <DashboardLayout>
      {!customer ? (
        <i className="not-italic flex items-center font-bold text-[1.2rem] mt-[100px] text-gray-50">
          <span>Loading</span>
          <span className="loading loading-spinner loading-lg"></span>
        </i>
      ) : (
        <CustomerDetail
          handleDelete={handleDelete}
          person_id={query.customerID}
          person={customer}
          role={"customer"}
        />
      )}
    </DashboardLayout>
  );
}

export default CustomerDetailsPage;


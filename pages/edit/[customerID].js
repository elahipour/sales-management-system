import DashboardLayout from "@/components/layouts/DashboardLayout";
import CustomerEditPage from "@/components/templates/CustomerEditPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Edit() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const { query, isReady } = router;
  useEffect(() => {
    if (isReady) {
      fetch(`/api/customers/${query.customerID}`)
        .then((res) => res.json())
        .then((data) => setData(data.userData));
    }
  }, [isReady]);
  
  if (data) {
    return (
      <DashboardLayout>
        <CustomerEditPage
          data={data}
          setData={setData}
          customerID={query.customerID}
        />
      </DashboardLayout>
    );
  }
}

export default Edit;

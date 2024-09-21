import DashboardLayout from "@/components/layouts/DashboardLayout";
import UserDetails from "@/components/templates/PersonDetails";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
function CustomerDetailsPage() {
  const router = useRouter();
  const { isReady, query } = router;
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (isReady) {
      fetch(`/api/admin/${query.userID}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.userData);
        });
    }
  }, [isReady]);

  async function handleDelete() {
    const res = await fetch(`/api/admin/delete/${user._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "200") {
      router.reload();
    }
    
  }


  return (
    <DashboardLayout>
      {!user ? (
        <i className="not-italic flex items-center font-bold text-[1.2rem] mt-[100px] text-gray-50">
          <span>Loading</span>
          <span className="loading loading-spinner loading-lg"></span>
        </i>
      ) : (
        <UserDetails
          handleDelete={handleDelete}
          person_id={query.userID}
          person={user}
          role="user"
        />
      )}
    </DashboardLayout>
  );
}

export default CustomerDetailsPage;



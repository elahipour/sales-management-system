import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddCustomerPage from "@/components/templates/AddCustomerPage";
import { verification } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
function Index({role}) {
  const router = useRouter();
  useEffect(() => {
  if (role === "admin") {
    router.push("/admin/dashboard");
  }
  }, [])
  

  return (
    <>
    {role==='user' && <DashboardLayout>
      <AddCustomerPage />
    </DashboardLayout>}
    </>
  );
}

export default Index;
export async function getServerSideProps(context) {
  const data = context.req.headers.cookie;
  const token = data.split("=")[1];
  const secretKey = process.env.SECRET_KEY;
  const user = verification(token, secretKey);

    return {
      props: {
        role: user.role,
      },
  }
}
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DataAnalyseLayout from "@/components/layouts/DataAnalyseLayout";
import CustomersList from "@/components/templates/CustomersList";

function Index() {
  return (
    <DashboardLayout>
      <DataAnalyseLayout>
        <CustomersList />
      </DataAnalyseLayout>
    </DashboardLayout>
  );
}

export default Index;

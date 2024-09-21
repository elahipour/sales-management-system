// import customers from "@/public/lotties/customers_btn";
import Link from "next/link";
import OpenSidebarBtn from "../elements/OpenSidebarBtn";

function DashboardLayout({ children }) {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="grid place-items-center min-h-[85vh]">{children}</div>
       <OpenSidebarBtn/>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu  bg-[#fefae086] backdrop-blur-sm flex flex-col gap-2 text-base-content min-h-full w-80 p-4">
          <li>
            <Link
              className="bg-[#CdDF9F] glass text-[#333] hover:bg-[#c4f3b1] hover:text-[#6F4E37] font-bold"
              href="/user/dashboard/update-profile"
            >
              
              <span>Update Profile</span>
            </Link>
          </li>
          <li>
          <Link
              className="bg-[#CdDF9F] glass text-[#333] hover:bg-[#c4f3b1] hover:text-[#6F4E37] font-bold"
              href="/user/dashboard/customers-list"
            >
              <span>Customers</span>
            </Link>
          </li>
          <li>
          <Link
              className="bg-[#CdDF9F] glass text-[#333] hover:bg-[#c4f3b1] hover:text-[#6F4E37] font-bold"
              href="/user/dashboard/add-customer"
            >
              <span>Add Customers</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardLayout;

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "../modules/Form";
import toast, { Toaster } from "react-hot-toast";

function AddCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    postalCode: "",
    products: [{ name: "", price: "", qty: "" }],
  });

  async function handleSave() {
    const res = await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify({
        data: form,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.message === "success") {
      toast.success("Successfull");
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        date: "",
        postalCode: "",
        products: [{ name: "", price: "", qty: "" }],
      });
      
    }
  }
  function handleCancel() {
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      date: "",
      postalCode: "",
      products: [{ name: "", price: "", qty: "" }],
    });
    router.push("/");
  }
  return (
    <div className='customer-page w-[700px] mt-4 p-4 rounded-md max-h-[70vh] overflow-y-scroll shadow-xl  bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5]'>
      <h1 className="font-[700] text-[1.2rem] my-6 text-[#3d3d3d]  [text-shadow:1px_1px_3px_rgba(100,100,100,.5)]">
        Add New Customer
      </h1>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons font-[600] text-[1.1rem]  flex gap-4 mt-4">
        <button
          className="text-[#f7640f]  border-2 p-2 rounded-md glass"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="text-[#f7640f]  border-2 p-2 rounded-md glass"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AddCustomerPage;

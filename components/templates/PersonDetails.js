import Link from "next/link";
import CustomerAvatar from "../icons/CustomerAvatar";
import { useRouter } from "next/router";
import React from "react";

function PersonDetails({ person, handleDelete, person_id ,role}) {

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-gradient-to-r from-[#bdf6bd] to-[#c6f3c5] rounded-tl-md rounded-tr-md w-fit mt-6">
          <CustomerAvatar avatar={false}/>
        </div>
        <div className="customer-detail__main  grid grid-cols-2 gap-x-2 gap-y-12 w-[700px]  p-4  rounded-tr-md shadow-xl max-h-[70vh]  bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5]">
          <div className="customer-detail__item flex">
            <span className="text-[#682100] font-[500]">FirstName :&nbsp;</span>
            <p>{person?.firstname}</p>
          </div>
          <div className="customer-detail__item flex gap-y-3 ">
            <span className="text-[#682100] font-[500]">Lastname :&nbsp;</span>
            <p>{person?.lastname}</p>
          </div>
          <div className="customer-detail__item gap-y-3 flex">
            <span className="text-[#682100] font-[500]">Email :&nbsp;</span>
            <p>{person?.email}</p>
          </div>
          {role!=='user' && <><div className="customer-detail__item flex gap-y-3">
            <span className="text-[#682100] font-[500]">Phone :&nbsp;</span>
            <p>{person?.phone}</p>
          </div>
          <div className="customer-detail__item flex gap-y-3">
            <span className="text-[#682100] font-[500]">Address :&nbsp;</span>
            <p>{person?.address}</p>
          </div>
          <div className="customer-detail__item flex gap-y-3">
            <span className="text-[#682100] font-[500]">
              Postal Code :&nbsp;
            </span>
            <p>{person?.postalCode}</p>
          </div>
          <div className="customer-detail__item flex gap-x-3">
            <span className="text-[#682100] font-[500]">Date :&nbsp;</span>
            <p>
              {person?.date &&
                new Date(person.date).toISOString().slice(0, 10)}
            </p>
          </div></>}
        </div>
      {role==='customer' &&  <div className="customer-detail__main  grid grid-cols-3 gap-x-2 gap-y-4 w-[700px] p-4 shadow-xl max-h-[70vh]  bg-gradient-to-r from-[#bdf6bd] to-[#a6daa5]">
          <p>Name</p>
          <p>Price</p>
          <p>Qty</p>
          {person?.products?.map((product, index) => {
            return (
              <React.Fragment key={index}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.qty}</p>
              </React.Fragment>
            );
          })}
        </div>} 
        <div className="customer-detail__main text-gray-200 flex justify-between gap-x-2 gap-y-12 w-[700px] bg-[#393f20] glass p-4  rounded-bl-md rounded-br-md shadow-xl max-h-[70vh] ">
        {role==='customer' && <p>Edit Or Delete?</p>}
          <button className=" border-b-yellow-800 border-b-2" onClick={handleDelete}>Delete</button>
          {role==='customer' && <Link className="border-b-red-800 border-b-2" href={`/edit/${person_id}`}>Edit</Link>}
        </div>
      </div>
    </>
  );
}

export default PersonDetails;

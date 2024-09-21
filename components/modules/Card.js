import Link from "next/link";
import { useRouter } from "next/router";

function Card({ customer }) {
  const router = useRouter();
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
  return (
    <div
      role="alert"
      className="bg-gradient-to-r from-[#abeeae] to-[#adc869] rounded-md alert text-orange-950 shadow-md  w-full flex gap-16 mt-4 max-w-[1000px]"
    >
      <div className="flex justify-between gap-14 w-full">
        <p className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {customer.firstname} {customer.lastname}
        </p>
        <p>{customer.email}</p>
      </div>
      <div className="flex gap-4">
        <Link href={""} className="deleteBtn bg-[#FED8B1] rounded px-2 py-1" onClick={handleDelete}>
          Delete
        </Link>
        <Link className=" bg-[#FED8B1] rounded px-2 py-1" href={`/customer/${customer._id}`}>Details</Link>
        <Link className=" bg-[#FED8B1] rounded px-2 py-1" href={`/edit/${customer._id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default Card;

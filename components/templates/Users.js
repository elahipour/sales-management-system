import Link from "next/link";


function Users({users}) {
  async function handleDelete(userid) {
    const res=await fetch(`/api/admin/delete/${userid}`,{
      method:'DELETE'
    });
    const data=await res.json();
  }

  async function handleCheck(e, userid) {
    const res = await fetch("/api/admin/userConfirmation", {
      method: "POST",
      body: JSON.stringify(userid),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    e.target.checked = data.checked;
  }
  
  return (
    <div>
      <ul>
        {users?.map((user) => {
          return (
           <li key={user._id} className="flex flex-col items-end">
            <div
              
              role="alert"
              className="bg-gradient-to-r from-[#abeeae] to-[#adc869] rounded-md alert text-orange-950 shadow-md  w-full flex gap-16 mt-4 max-w-[1000px]"
              >
              <div className="flex items-center justify-between gap-14 w-full">
                <div className="flex gap-2 items-center">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">{user.isApprovedByAdmin ? '😎online' : '😴offline' }&nbsp;&nbsp;</span>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e, user._id)}
                        checked={user.isApprovedByAdmin}
                        className="checkbox checkbox-success"
                      />
                    </label>
                  </div>
                  {user.firstname} {user.lastname}
                </div>
                <p>{user.email}</p>
              </div>
              <div className="flex gap-4">
                <Link
                  href={""}
                  className="deleteBtn bg-[#c8d996] rounded px-2 py-1"
                  onClick={()=>handleDelete(user._id)}
                >
                  Delete
                </Link>
                <Link
                  className="bg-[#c8d996] rounded px-2 py-1"
                  href={`/user/${user._id}`}
                >
                  Details
                </Link>
              </div>
            </div>
            <span className="shadow-sm bg-gradient-to-r from-[#d6ffc87a] to-[#ffffff00] rounded-sm rounded-tr-none rounded-tl-none px-2 mr-2">{user.totalPurchase===0 ? '😒No purchases registered':user.totalPurchase}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Users;

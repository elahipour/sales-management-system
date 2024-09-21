import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function handleSignout(e) {
    const res = await fetch("/api/user/signout");
    const data = await res.json();
    if (data.status === "200") {
      setIsLoggedIn(false)
      router.push("/");
    }
  }
  useEffect(() => {
    async function checkIsLoggedIn() {
      const res = await fetch("/api/user");
      const data = await res.json();
      if (data.status === "200") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    checkIsLoggedIn();
  }, [router.pathname]);
  return (
    <div className="flex justify-between bg-[#FEFAE0] shadow-lg p-3 relative">
      <div>
        <h1 className="font-bold absolute top-0 bottom-0 grid place-items-center left-0 bg-[#96a365] glass p-2 text-white shadow-md">
          <Link href={'/'}>Home</Link>
        </h1>
      </div>
      <div className="flex gap-4">
        {isLoggedIn && (
          <><button
            onClick={handleSignout}
            className="bg-[#922828] glass p-2 rounded-md text-white shadow-md"
            
          >
            Sign out
          </button>
           <Link
           className="bg-[#185b18] glass p-2 rounded-md text-white shadow-md"
           href="/user/dashboard"
         >
           Dashboard
         </Link>
         </>
        )}
        {!isLoggedIn && 
         <> <Link
            className="bg-[#3d7123] glass p-2 rounded-md text-white shadow-md"
            href={"/user/signin"}
          >
            Sign in
          </Link>
        
        
          <Link
            className="bg-[#1e4452] glass p-2 rounded-md text-white shadow-md"
            href={"/user/signup"}
          >
            Sign up
          </Link>
          
        </>}
      </div>
    </div>
  );
}

export default Header;

import ErrorBadge from "@/components/elements/ErrorBadge";
import FormInput from "@/components/elements/FormInput";
import SuccessBadge from "@/components/elements/SuccessBadge";
import EmailIcon from "@/components/icons/EmailIcon";
import UserIcon from "@/components/icons/UserIcon";
import lottiesOption from "@/utils/lottiesOptions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "react-lottie";
import lottiesSignup from "../../public/lotties/signup";
import PasswordIcon from "@/components/icons/PasswordIcon";
const defaultOptions = lottiesOption(lottiesSignup, false);

function Signup() {
  const notify = (status, message) => {
    return status === "201" ? toast.success(message) : toast.error(message);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, updateIsError] = useState({
    isFirstLoad: true,
    status: false,
    message: "",
  });

  const router = useRouter();
  async function handleSignup() {
    const res = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        isApprovedByAdmin: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "201") {
      router.push("/user/signin");
    } else {
      notify(data.status, data.message);
      updateIsError({
        isFirstLoad: false,
        status: true,
        message: data.message,
      });
    }
  }
  useEffect(() => {
    async function isLogin() {
      const res = await fetch("/api/user");
      const data = await res.json();
      if (data.status === "200") {
        if (data.role === "user") {
          router.push("/user/dashboard");
        } else if (data.role === "admin") {
          router.push("/admin/dashboard");

        }
      }
    }
    isLogin();
  }, []);
  return (
    <div className=" grid place-items-center h-[85vh]">
      <div className="glass shadow-lg w-fit h-fit bg-gradient-to-t from-[#d7e3ab] to-[#CEDF9F] p-4 rounded-md flex flex-col gap-4">
        <div className="opacity-50">
          <Lottie options={defaultOptions} height={80} width={80} />
        </div>
        <FormInput
          Icon={EmailIcon}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          type="text"
          placeholder="email"
        />
        <FormInput
          Icon={PasswordIcon}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
          type="password"
          placeholder="password"
        />
        {/* {!isError.isFirstLoad &&  (isError.status ? <ErrorBadge error={isError.message}/> : <SuccessBadge/>)} */}
        <div className="flex gap-3">
          <button
            onClick={handleSignup}
            className=" text-[#ffffff] bg-[#1b3f1d] font-bold px-2 py-1 rounded shadow-sm"
          >
            Signup
          </button>
        </div>
      </div>
      {<Toaster reverseOrder={false} position="bottom-right" />}
    </div>
  );
}

export default Signup;

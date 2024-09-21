import FormInput from "@/components/elements/FormInput";
import EmailIcon from "@/components/icons/EmailIcon";
import PasswordIcon from "@/components/icons/PasswordIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "react-lottie";
import lottieAuth from "../../public/lotties/auth";
import lottiesOption from "@/utils/lottiesOptions";

const defaultOptions = lottiesOption(lottieAuth, true);
function Signin() {
  const notify = (status, message) => {
    return status === "201" ? toast.success(message) : toast.error(message);
  };
  const [email, setEmail] = useState("");
  const [isError, updateIsError] = useState({
    isFirstLoad: true,
    status: false,
    message: "",
  });
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleSignin() {
    const res = await fetch("/api/user/signin", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const { status, role } = data;
    if (status === "200" && role === "user") {
      router.push("/user/dashboard");
    } else if (status === "200" && role === "admin") {
      router.push("/admin/dashboard");
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
        router.push("/user/dashboard");
      }
    }
    isLogin();
  }, []);
  return (
    <div className="grid place-items-center h-[85vh]">
      <div className="glass bg-gradient-to-t from-[#d7e3ab] to-[#CEDF9F] shadow-lg w-fit h-fit  p-4 rounded-md flex flex-col gap-4">
        <Lottie options={defaultOptions} height={100} width={100} />
        <FormInput
          Icon={EmailIcon}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="username"
          id="username"
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

        <div className="flex gap-3">
          <button
            className="text-[#1b3f1d] bg-[#ffffff] font-medium px-2 py-1 rounded shadow-sm"
            onClick={handleSignin}
          >
            Signin
          </button>
          <Link
            href={"/user/signup"}
            className=" text-[#ffffff] bg-[#1b3f1d] font-bold px-2 py-1 rounded shadow-sm"
          >
            Signup
          </Link>
        </div>
      </div>
      {<Toaster reverseOrder={false} position="bottom-right" />}
    </div>
  );
}

export default Signin;

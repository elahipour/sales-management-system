import FormInput from "@/components/elements/FormInput";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EmailIcon from "@/components/icons/EmailIcon";
import UserIcon from "@/components/icons/UserIcon";
import PasswordIcon from "@/components/icons/PasswordIcon";
import toast, { Toaster } from "react-hot-toast";
import lottiesOption from "@/utils/lottiesOptions";
import Lottie from "react-lottie";
import updateProfile from "@/public/lotties/update_profile_btn";

const updateProfile_option = lottiesOption(updateProfile, true);

function UpdateProfile() {
  const [counter, setCounter] = useState(0);

  const router = useRouter();

  const [isError, updateIsError] = useState({
    firstLoad: true,
    status: false,
    message: "",
  });
  const [user, updateUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const notify = (status, message) => {
    return status === "201" ? toast.success(message) : toast.error(message);
  };
  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    updateUser({ ...user, [name]: value });
  }
  async function handleUpdate() {
    const res = await fetch("/api/user/update-user", {
      method: "POST",
      body: JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.status === "201") {
      notify(data.status, data.message);
      updateIsError({ firstLoad: false, status: false, message: data.message });
      setCounter(30);
    } else {
      notify(data.status, data.message);
      updateIsError({ firstLoad: false, status: true, message: data.message });
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) setCounter((counter) => counter - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);

  useEffect(() => {
    async function isLogin() {
      const res = await fetch("/api/user");
      const data = await res.json();
      if (data.status !== "200") {
        router.push("/");
      }
    }
    isLogin();
  }, []);
  return (
    <>
      <div className="flex rounded-md glass flex-col gap-6 w-[350px] mt-24 bg-gradient-to-r from-[#abeeae] to-[#CdDF9F] p-4">
        <div className="absolute z-[-1] top-[-110px] right-[-40px] h-[150px] w-[150px]">
          <Lottie options={updateProfile_option} />
        </div>
        <h1 className="font-[600] text-[1.2rem]">Update Profile</h1>
        <FormInput
          Icon={UserIcon}
          value={user.firstname}
          onChange={handleChange}
          className="w-full px-3 py-1"
          name="firstname"
          id="firstname"
          type="text"
          placeholder="firstname"
        />
        <FormInput
          Icon={UserIcon}
          value={user.lastname}
          onChange={handleChange}
          className="w-full px-3 py-1"
          name="lastname"
          id="lastname"
          type="text"
          placeholder="lastname"
        />
        <FormInput
          Icon={EmailIcon}
          value={user.email}
          onChange={handleChange}
          name="email"
          id="email"
          type="text"
          placeholder="email"
        />
        <FormInput
          Icon={PasswordIcon}
          value={user.password}
          onChange={handleChange}
          className="w-full px-3 py-1"
          name="password"
          id="password"
          type="password"
          placeholder="password"
        />
        <button
          className={`bg-[#6F4E37] px-2 py-1 rounded text-white shadow-sm py-2 disabled:bg-[#ECB176]`}
          onClick={handleUpdate}
          disabled={counter > 0 ? true : ""}
        >
          {counter > 0 ? `wait ${counter}s` : "update"}
        </button>
      </div>
      {<Toaster reverseOrder={false} position="bottom-right" />}
    </>
  );
}

export default UpdateProfile;

"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignInPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const [isDisable, setIsDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/api/signin", user);
      console.log("Sign In succes", response.data);
      router.push("/home");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [user]);
  return (
    <div>
      <Link
        href="/"
        className="px-10 py-3 bg-slate-400 rounded-lg hover:bg-slate-300 block text-center"
      >
        Go Home
      </Link>

      <h1 className="my-10 text-4xl text-center">Sign In</h1>

      <form
        className="flex flex-col gap-6 [&>input]:py-4 [&>input]:px-4 [&>input]:rounded-md [&>input]:bg-slate-50"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-red-400 text-white font-semibold rounded-lg py-4
        disabled:bg-slate-200 disabled:cursor-not-allowed
          flex items-center justify-center gap-4 "
          placeholder="Submit"
          disabled={isDisable}
        >
          {isLoading && (
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid 
            border-current border-e-transparent align-[-0.125em] text-surface 
            motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            >
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap 
              !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              ></span>
            </div>
          )}
          {isLoading ? "Proccesing" : "Submit"}
        </button>
      </form>
    </div>
  );
}

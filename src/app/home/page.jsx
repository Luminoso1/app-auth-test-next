"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function HomePage() {
  const router = useRouter();
  const signOut = async () => {
    try {
      await axios.get("/api/signout");
      toast.success("Sign Out Successfully");
      router.push("/sign-in");
    } catch (error) {
      console.log(error.message);
      toast.error("Sign Out Error")
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center">Home</h1>
      <div>
        <h2>Username</h2>
        <button onClick={signOut} className="px-10 py-4 bg-red-200">
          Sign Out
        </button>
      </div>
    </div>
  );
}

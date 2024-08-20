"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import CustomForm from "../components/CustomForm";
import CustomButton from "../components/CustomButton";
import { SignInSchema } from "@/lib/forms";

export default function SignInPage() {
  const router = useRouter();

  const methods = useForm();

  // TODO: Enhamce the code repetition ➡️ to handle states sign-in and sign-up pages

  // TODO: diable button when there are errors

  const [isDisable, setIsDisable] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const [error, setError] = React.useState();

  const onSubmit = methods.handleSubmit(async (data) => {
    // console.log(data);
    try {
      setIsLoading(true);
      const response = await axios.post("/api/sign-in", data);
      console.log("Sign In succes", response.data);
      toast.success("Sign In Successfully");
      router.push("/home");
    } catch (error) {
      if (error.response) {
        console.error("Error Response: ", error.response.data);
        toast.error(error.response.data.error || "error response");
        setError(error.response.data.error);
      } else if (error.resquest) {
        console.error("Error Request: ", error.request.response);
        toast.error("No response received from the server");
      } else {
        console.error("Error: ", error.message);
        toast.error("Unexpected error has occurred");
      }
    } finally {
      setIsLoading(false);
    }
  });
  return (
    <div className="flex flex-col max-w-sm w-full gap-10">
      <Link
        href="/"
        className="px-10 py-3 bg-slate-400 rounded-lg hover:bg-slate-300 block text-center"
      >
        Go Home
      </Link>

      <h1 className="my-10 text-4xl text-center">Sign In</h1>

      <CustomForm methods={methods} onSubmit={onSubmit} schema={SignInSchema}>
        <CustomButton
          onSubmit={onSubmit}
          isLoading={isLoading}
          isDisable={isDisable}
        >
          Sign in
        </CustomButton>
      </CustomForm>
      <div className="min-h-14">
        {error && (
          <p className="bg-red-200 p-4 rounded-md font-medium text-slate-800">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

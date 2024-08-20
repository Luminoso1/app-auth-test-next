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

  const onSubmit = methods.handleSubmit(async (data) => {
    // console.log(data);
    try {
      setIsLoading(true);
      const response = await axios.post("/api/sign-in", data);
      console.log("Sign In succes", response.data);
      toast.success("Sign In Successfully");
      router.push("/home");
    } catch (error) {
      toast.error("Error");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  });
  return (
    <div>
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
    </div>
  );
}

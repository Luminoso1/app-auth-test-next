"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomForm from "../components/CustomForm";
import CustomButton from "../components/CustomButton";
import { SignUpSchema } from "@/lib/forms";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userSchema } from "@/lib/validations/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignupPage() {
  const router = useRouter();

  // TODO: Enhamce the code repetition ➡️ to handle states sign-in and sign-up pages

  // TODO: diable button when there are errors

  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const methods = useForm({ resolver: zodResolver(userSchema) });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/sign-up", data);
      console.log("Sign Up succes", response.data);
      toast.success("User created");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Error");
      console.log("Error Sign Up", error);
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

      <h1 className="my-10 text-4xl text-center">Sign Up</h1>

      <CustomForm methods={methods} onSubmit={onSubmit} schema={SignUpSchema}>
        <CustomButton
          onSubmit={onSubmit}
          isLoading={isLoading}
          isDisable={isDisable}
        >
          Sign up
        </CustomButton>
      </CustomForm>
    </div>
  );
}

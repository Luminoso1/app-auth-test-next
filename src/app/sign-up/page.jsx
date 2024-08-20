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
  const [error, setError] = React.useState();

  const methods = useForm({ resolver: zodResolver(userSchema) });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/sign-up", data);
      console.log("Sign Up succes", response.data);
      toast.success("User created");
      router.push("/sign-in");
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside of 2xx
        console.error("Error Response: ", error.response.data);
        toast.error(
          error.response.data.error || "An error occurred during sign-up"
        );
        setError(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request: ", error.request.response);
        toast.error("No response received from the server");
      } else {
        // Something else happened during the request setup
        console.error("Error: ", error.message);
        toast.error("An unexpected error occurred");
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

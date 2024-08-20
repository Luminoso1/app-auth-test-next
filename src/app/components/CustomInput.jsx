"use client";
import { findInputError, isFormInvalid } from "@/lib/validations/input-errors";
import { useFormContext } from "react-hook-form";

export default function CustomInput({ type, name, placeholder, validation }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        className="p-5 rounded-md w-full border border-slate-400 placeholder:opacity-70"
        {...register(name, validation)}
      />
      <div className="h-4 text-sm font-medium  text-red-500 text-right capitalize">
        {isInvalid && <p>{inputError.error.message}</p>}
      </div>
    </div>
  );
}

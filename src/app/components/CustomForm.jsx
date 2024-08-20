import React from "react";
import { FormProvider } from "react-hook-form";
import CustomInput from "./CustomInput";

export default function CustomForm({ children, methods, schema }) {

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 [&>input]:py-4 [&>input]:px-4 [&>input]:rounded-md [&>input]:bg-slate-50"
      >
        {schema?.map((item) => (
          <CustomInput key={item.name} {...item} />
        ))}

        {children}
      
      </form>
    </FormProvider>
  );
}

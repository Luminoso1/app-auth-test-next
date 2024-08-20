import React from "react";

export default function CustomButton({
  onSubmit,
  isDisable,
  isLoading,
  children,
}) {
  return (
    <button
      onClick={onSubmit}
      className="bg-red-400 text-white font-semibold rounded-lg py-4
            disabled:bg-slate-200 disabled:cursor-not-allowed
              flex items-center justify-center gap-4 "
      placeholder="Submit"
      disabled={isDisable}
    >
      {isLoading === true && (
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
      {isLoading ? "Proccesing" : children}
    </button>
  );
}

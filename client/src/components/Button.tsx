import type { ReactElement } from "react";
import { Spinner } from "./Spinner.tsx";

interface ButtonProps {
  variant: "primary" | "secondary" | "typeButton";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  classname?: string;
}

const variantClasses = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-indigo-700 text-white/90",
  typeButton: "text-white bg-opacity-0 border border-indigo-600",
};

const defaultStyles =
  "px-4 py-2 rounded-md font-light flex justify-center items-center relative";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
  classname,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${variantClasses[variant]} ${defaultStyles} ${
        fullWidth ? "w-full" : ""
      } ${classname || ""} ${loading ? "opacity-45" : ""}`}
    >
      
      <span className={`${loading ? "invisible" : "visible"} flex items-center`}>
        {startIcon && <span className="pr-2">{startIcon}</span>}
        {text}
      </span>

      
      {loading && (
        <span className="absolute inset-0 flex justify-center items-center">
          <Spinner className="w-4 h-4" />
        </span>
      )}
    </button>
  );
}

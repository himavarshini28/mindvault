import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "typeButton"; 
    text: string; 
    startIcon?: ReactElement; 
    onClick?: () => void;
    fullWidth?: boolean; 
    loading?: boolean; 
}

const variantClasses = {
    "primary": "bg-indigo-600 text-white",
    "secondary": "bg-indigo-700 text-white/90",
    "typeButton":"text-white bg-opacity-0 border border-indigo-600"
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
    return (
        <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}` } disabled={loading} >
           {startIcon ? <div className="pr-2">
                {startIcon}
            </div>:null}
            {text}
        </button>
    );
}
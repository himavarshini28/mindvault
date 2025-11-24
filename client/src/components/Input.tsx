import type { RefObject } from "react";

interface InputProps { 
    placeholder: string;
    reference?: RefObject<HTMLInputElement | null>
}

export function Input({placeholder, reference}: InputProps) {
    return (
        <div>
            <input 
                ref={reference}
                placeholder={placeholder}
                type={"text"}
                className="px-4 py-2 border border-gray-700 bg-[#071029] text-white rounded m-2 w-[400px]"
            />
        </div>
    );
}
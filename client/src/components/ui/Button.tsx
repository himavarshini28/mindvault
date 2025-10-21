import type { ReactElement } from "react";

interface ButtonProps{
    variant:"primary"|"secondary",
    size:"md"|"lg"|"sm",
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onClick?:()=>void;
}

const variantStyles={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
}

const defaultStyles="rounded-md";
const sizeStyles=
{
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-4 px-6"
}

export const Button=(props:ButtonProps)=>{
    return<button className={`flex items-center justify-center ${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}

    >{props.startIcon?<span className="pr-2">{props.startIcon}</span>:null}{props.text}{props.endIcon}</button>
}
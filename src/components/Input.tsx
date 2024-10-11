import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = "", ...props }: Props) => {
  return (
    <input
      {...props}
      className={`bg-white border border-gray-200 px-4 py-2 rounded-xl w-full outline-1 outline-primary ${className}`}
    />
  );
};

export default Input;

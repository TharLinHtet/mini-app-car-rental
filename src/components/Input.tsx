import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = "", ...props }: Props) => {
  return (
    <input
      {...props}
      className={`bg-transparent border border-gray-200 px-4 py-2 rounded-xl w-full outline-none ${className}`}
    />
  );
};

export default Input;

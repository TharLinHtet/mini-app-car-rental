import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
const Card = ({
  children,
  className = "",
  onClick,
  onBlur,
  onMouseLeave,
}: Props) => {
  return (
    <div
      className={`w-full bg-white p-4 rounded-2xl ${className}`}
      onClick={onClick}
      onBlur={onBlur}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default Card;

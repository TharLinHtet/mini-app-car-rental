interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ...props
}: Props) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
      className={`bg-primary rounded-3xl px-4 py-3 w-full text-black font-semibold ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

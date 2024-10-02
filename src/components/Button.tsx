interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, onClick, className = "" }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary rounded-3xl px-4 py-3 w-full text-black font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

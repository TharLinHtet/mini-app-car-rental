const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full bg-white p-5 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;

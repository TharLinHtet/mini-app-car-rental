import { Link, useNavigate } from "react-router-dom";
import { config } from "@/config";
import LeftArrowIcon from "@/icons/LeftArrowIcon";

const Header = ({
  title = config.app.title,
  hideIcon = false,
}: {
  title?: string;
  hideIcon?: boolean;
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between items-center">
      {hideIcon && <div></div>}
      {!hideIcon && (
        <button onClick={handleBackClick} aria-label="Go Back">
          <LeftArrowIcon />
        </button>
      )}
      <Link to="/home">
        <h3 className="font-medium">{title}</h3>
      </Link>
      <div></div>
    </div>
  );
};

export default Header;

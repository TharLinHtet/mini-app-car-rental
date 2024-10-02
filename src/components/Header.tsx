import { Link, useNavigate } from "react-router-dom";
import { config } from "@/config";
import LeftArrowIcon from "@/icons/LeftArrowIcon";

const Header = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between items-center">
      <button onClick={handleBackClick} aria-label="Go Back">
        <LeftArrowIcon />
      </button>
      <Link to="/home">
        <h3 className="font-medium">{config.app.title}</h3>
      </Link>
      <div></div>
    </div>
  );
};

export default Header;

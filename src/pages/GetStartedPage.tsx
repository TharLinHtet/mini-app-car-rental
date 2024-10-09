import Button from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { config } from "@/config";
import { useEffect, useState } from "react";

const GetStartedPage = () => {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/details");
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div
      className="h-dvh w-full bg-black text-white overflow-hidden"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="w-full h-full flex flex-col justify-between gap-7">
        <div>
          <h3 className="text-xl py-6 px-4 font-bold bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
            {config.app.title}
          </h3>
          <div
            className="w-full pt-56 pb-14 h-min"
            style={{
              backgroundImage: 'url("./images/get_started_car.png")',
              backgroundSize: "490px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
            }}
          ></div>
        </div>
        <div className="pb-7 flex flex-col gap-2 ">
          <div>
            <h3 className="text-3xl px-4 pb-1 font-normal">
              Find the ideal car
            </h3>
            <h3 className="text-3xl px-4 pb-1 font-normal">
              Rental for your trip!
            </h3>
            <p className="px-4 text-gray-300 text-sm pt-4 pb-9">
              Get access to the best deals from global car rental companies.
            </p>
          </div>

          <Link to={config.route.home} className="px-4">
            <Button>
              Get Started <span className="font-light">({countDown}s)</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;

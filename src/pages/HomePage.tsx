import Header from "@/components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Input from "@/components/Input";
import Card from "@/components/Card";
import { Link } from "react-router-dom";
import { config } from "@/config";
import StarIcon from "@/icons/StarIcon";

const HomePage = () => {
  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div className="text-dark h-dvh flex flex-col bg-white ">
      <div>
        <div className="p-4">
          <Header hideIcon />
        </div>
        <div className="">
          <h3 className="p-4 text-lg font-medium">Most Popular</h3>
          <Slider {...settings} initialSlide={1} swipeToSlide={true}>
            {Array.from({ length: 20 }).map((_, index) => (
              <Link
                to={config.route.details}
                className="py-3 px-4 min-h-56"
                key={index + 3}
              >
                <div className="w-full bg-grey pb-4 slider-item h-full flex flex-col items-center overflow-hidden rounded-xl">
                  <div className="self-start flex flex-col gap-1">
                    <h4 className="px-5 mt-4 text-sm font-medium">
                      Mercedes-Benz A-class
                    </h4>
                    <p className="text-sm px-5 font-thin">
                      <span className="font-semibold">200 /</span> day
                    </p>
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <img
                      src="./images/car.png"
                      className="h-[120px] object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        <div className="p-4 overflow-hidden">
          <Input placeholder="Search for the desired car" />
        </div>
      </div>
      <Link
        to={config.route.details}
        className="flex flex-col gap-2 p-4 flex-1 overflow-y-scroll mb-4"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <Card className="rounded-md border" key={index + 1}>
            <div className="min-h-36 flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-sm font-thin">
                  <span className="font-semibold">200 /</span> day
                </p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="./images/car.png"
                  className="h-[120px] object-cover"
                />
              </div>
              <div className="flex justify-between items-end">
                <h4 className="mt-4 text-sm font-medium">
                  Mercedes-Benz A-class
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">
                    <StarIcon />
                  </span>
                  <h4 className="font-normal text-sm">4.5</h4>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Link>
      <style>{`
        .slider-item {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          
        }

        .slick-center .slider-item {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default HomePage;

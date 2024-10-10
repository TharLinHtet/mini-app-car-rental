import Header from "@/components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Input from "@/components/Input";
import Card from "@/components/Card";
import { Link } from "react-router-dom";
import { config } from "@/config";
import StarIcon from "@/icons/StarIcon";
import cars from "@/config/car-data";

const HomePage = () => {
  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div className="text-dark h-dvh flex flex-col bg-white motion-preset-fade-lg ">
      <div>
        <div className="p-4">
          <Header hideIcon />
        </div>
        <div className="">
          <h3 className="p-4 text-lg font-medium">Most Popular</h3>
          <Slider {...settings} initialSlide={1} swipeToSlide={true}>
            {cars.slice(0, 3).map((car) => (
              <Link
                to={`${config.route.details}/${car.id}`}
                className="py-3 px-4 min-h-56"
                key={car.id}
              >
                <div className="w-full bg-grey pb-4 slider-item h-full flex flex-col items-center overflow-hidden">
                  <div className="self-start flex flex-col gap-1">
                    <h4 className="px-5 mt-4 text-sm font-medium">
                      {car.name}
                    </h4>
                    <p className="text-xs px-5 font-thin">
                      <span className="font-semibold">
                        {car.price_per_day} /
                      </span>{" "}
                      day
                    </p>
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <img
                      src={car.image_url}
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
      <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-scroll mb-4">
        {cars.map((car) => (
          <Link to={`${config.route.details}/${car.id}`} key={car.id}>
            <Card className="rounded-md border" key={car.id}>
              <div className="min-h-36 flex flex-col">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-thin">
                    <span className="font-semibold">{car.price_per_day} /</span>
                    day
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <img src={car.image_url} className="h-[120px] object-cover" />
                </div>
                <div className="flex justify-between items-end">
                  <h4 className="mt-4 text-sm font-medium">{car.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">
                      <StarIcon />
                    </span>
                    <h4 className="font-normal text-sm">{car.rating}</h4>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <style>{`
        .slider-item {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          
        }

        .slick-center .slider-item {
          transform: scale(1.19);
        }
      `}</style>
    </div>
  );
};

export default HomePage;

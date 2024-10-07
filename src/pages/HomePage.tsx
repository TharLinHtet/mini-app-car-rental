import Header from "@/components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Input from "@/components/Input";
import Card from "@/components/Card";

const HomePage = () => {
  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div className="text-dark h-dvh flex flex-col bg-white">
      <div>
        <div className="p-4">
          <Header hideIcon />
        </div>
        <div className="overflow-hidden">
          <h3 className="p-4 text-lg font-medium">Most Popular</h3>
          <Slider {...settings} initialSlide={1} swipeToSlide={true} autoplay>
            {Array.from({ length: 20 }).map((_, index) => (
              <div className="py-3 px-4 h-36" key={index + 3}>
                <h3 className="slider-item bg-grey text-white text-center h-full rounded-md">
                  {index++}
                </h3>
              </div>
            ))}
          </Slider>
        </div>
        <div className="p-4 flex flex-col gap-3 overflow-hidden">
          <Input placeholder="Search for the desired car" />

          {/* <Button className="h-min w-auto">Search</Button> */}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-scroll my-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <Card className="border rounded-md !bg-grey">
            <div className="h-24">{index++}</div>
          </Card>
        ))}
      </div>
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

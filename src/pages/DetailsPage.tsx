import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import StarIcon from "@/icons/StarIcon";
import { useState } from "react";

const DetailsPage = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(0);

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  const handleBlur = () => {
    setSelectedCard(null);
    console.log("helo");
  };
  return (
    <div className="p-4 w-full h-dvh bg-gradient-to-b from-white via-slate-100 to-slate-200 relative">
      <Header />
      <Card className="mb-4 border-b">
        <div className="flex flex-col justify-center items-center">
          <img src="/images/get_started_car.png" className="h-[150px]" />
          <div className="flex justify-between items-center w-full">
            <h3 className="font-medium">Mercedes-Benz A-class</h3>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">
                <StarIcon />
              </span>
              <h4 className="font-normal text-sm">4.5</h4>
            </div>
          </div>
        </div>
      </Card>
      <Card className="!p-0">
        <div className="grid grid-cols-2">
          <div className="border border-gray-100 rounded-sm py-3 border-b-0 flex flex-col justify-center items-center">
            <span className="text-sm mb-1 text-gray-400">Seats</span>
            <span className="text-xs font-medium">5</span>
          </div>
          <div className="border border-gray-100 rounded-sm py-3 border-b-0 flex flex-col justify-center items-center">
            <span className="text-sm mb-1 text-gray-400">Fuel Type</span>
            <span className="text-xs font-medium">Petrol</span>
          </div>
          <div className="border border-gray-100 rounded-sm py-3 flex flex-col justify-center items-center">
            <span className="text-sm mb-1 text-gray-400">Transmission</span>
            <span className="text-xs font-medium">Automatic</span>
          </div>
          <div className="border border-gray-100 rounded-sm py-3 flex flex-col justify-center items-center">
            <span className="text-sm mb-1 text-gray-400">Fuel Usage</span>
            <span className="text-xs font-medium">101/100 km</span>
          </div>
        </div>
      </Card>
      <div className="flex items-center gap-2 my-3">
        <Card
          onClick={() => handleCardClick(0)}
          tabIndex={0}
          className={`!p-3 text-center ${
            selectedCard === 0
              ? "border border-primary"
              : "border border-transparent"
          } font-thin shadow`}
        >
          <span className="font-semibold">300 /</span> day
        </Card>

        <Card
          onClick={() => handleCardClick(1)}
          tabIndex={1}
          className={`!p-3 text-center ${
            selectedCard === 1
              ? "border border-primary"
              : "border border-transparent"
          } font-thin shadow`}
        >
          <span className="font-semibold">500 /</span> 2day
        </Card>
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <input
          onFocus={handleBlur}
          type="number"
          min={1}
          defaultValue={1}
          className="p-3 w-full outline-1 outline-primary rounded-lg"
        />
        <div className="w-min h-full text-white bg-dark p-3 absolute top-0 right-0">
          day(s)
        </div>
      </div>

      <Button className=" mx-auto mt-4">
        <div className="flex justify-between items-center">
          <div className="bg-secondary p-1 px-3 rounded-3xl text-white">
            <span className="font-thin"> Total :</span> 300
          </div>
          Book now
        </div>
      </Button>
    </div>
  );
};

export default DetailsPage;

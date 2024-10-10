import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import StarIcon from "@/icons/StarIcon";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import cars from "@/config/car-data";
import { config } from "@/config";
import { usePayment } from "@/hooks/usePayment";
import { IStartPay } from "@/interfaces/nativeAPI";
import { ShowToast, StartPay } from "@/helpers/nativeAPI";

const DetailsPage = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const car = cars.find((car) => car.id === parseInt(id || "0"));
  const [selectedPrice, setSelectedPrice] = useState<number>(
    car?.pricing_options[0]?.amount || 0
  );

  const { createOrder } = usePayment();

  const handleCardClick = (index: number, amount: number) => {
    setSelectedCard(index);
    setSelectedPrice(amount);
  };

  const handleFocus = () => {
    setSelectedCard(null);
    if (selectedCard !== null) {
      const amount = car?.pricing_options?.[selectedCard]?.amount;
      const inputElement = document.querySelector(
        'input[type="number"]'
      ) as HTMLInputElement;
      const days = Number(inputElement?.value) || 1;
      setSelectedPrice(amount ? days * amount : 0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = car?.pricing_options?.[0]?.amount;
    const inputValue = Number(e.target.value) || 0;
    setSelectedPrice(amount ? inputValue * amount : 0);
  };

  const handleClickBook = async () => {
    setIsLoading(true);
    try {
      const { prepay_id, sign, signType, result, orderInfo } =
        await createOrder(String(selectedPrice));

      if (isLoading) {
        ShowToast({ title: "Loading", icon: "loading" });
      }

      console.log("Prepay ID:", prepay_id);
      setIsLoading(false);

      const payload: IStartPay = {
        prepayId: prepay_id!,
        orderInfo: orderInfo,
        sign: sign!,
        signType: signType!,
        disableNewCheckout: "true",
        tradeType: "MINIAPP",
      };

      if (result !== "FAIL") {
        StartPay(payload, () => {
          ShowToast({
            title: "Successfully booked",
            icon: "success",
          });
        });
      } else {
        ShowToast({
          title: "Payment fail",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!car) {
    return (
      <div className="h-dvh flex items-center flex-col justify-center px-9">
        <div className="text-xl">Car not found!</div>
        <Button className="mt-4">
          <Link to={config.route.home}>Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 w-full bg-gradient-to-b h-dvh from-white via-slate-100 to-slate-200 relative motion-preset-fade ">
      <Header />
      <Card className="mb-4 border-b">
        <div className="flex flex-col justify-center items-center">
          <img src={car.image_url} className="h-[150px]" alt={car.name} />
          <div className="flex justify-between items-center w-full">
            <h3 className="font-medium">{car.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">
                <StarIcon />
              </span>
              <h4 className="font-normal text-sm">{car.rating}</h4>
            </div>
          </div>
        </div>
      </Card>
      <Card className="!p-0">
        <div className="grid grid-cols-2">
          <div className="border border-gray-100 rounded-sm py-3 border-b-0 flex flex-col justify-center items-center">
            <span className="text-sm mb-1 text-gray-400">Seats</span>
            <span className="text-xs font-medium">{car.seats}</span>
          </div>
          <div className="border border-gray-100 rounded-sm py-3 border-b-0 flex flex-col justify-center items-center">
            <span className="text-sm mb-1 text-gray-400">Fuel Type</span>
            <span className="text-xs font-medium">{car.fuel_type}</span>
          </div>
          <div className="border border-gray-100 rounded-sm py-3 flex flex-col justify-center items-center">
            <span className="text-sm mb-1 text-gray-400">Transmission</span>
            <span className="text-xs font-medium">{car.transmission}</span>
          </div>
          <div className="border border-gray-100 rounded-sm py-3 flex flex-col justify-center items-center">
            <span className="text-sm mb-1 text-gray-400">Fuel Usage</span>
            <span className="text-xs font-medium">{car.fuel_usage}</span>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-2 my-3">
        {car.pricing_options.map((option, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(index, option.amount)}
            tabIndex={index}
            className={`!p-3 text-center ${
              selectedCard === index
                ? "border border-primary"
                : "border border-transparent"
            } font-thin shadow`}
          >
            <span className="font-semibold">{option.amount} /</span>{" "}
            {option.duration}
          </Card>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <input
          onFocus={handleFocus}
          type="number"
          min={1}
          defaultValue={1}
          onChange={handleChange}
          className="p-3 w-full outline-1 outline-primary rounded-lg"
        />
        <div className="w-min h-full text-white bg-dark p-3 absolute top-0 right-0">
          day(s)
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl mt-4">
        <input
          type="date"
          className="p-3 w-full outline-1 bg-white outline-primary rounded-lg"
        />
      </div>
      <Button
        className=" mx-auto mt-4"
        onClick={handleClickBook}
        disabled={isLoading}
      >
        <div className="flex justify-between items-center">
          <div className="bg-secondary p-1 px-3 rounded-3xl text-white">
            <span className="font-thin"> Total :</span> {selectedPrice}
          </div>
          {isLoading ? <span className="pe-4">Loading...</span> : "Book now"}
        </div>
      </Button>
    </div>
  );
};

export default DetailsPage;

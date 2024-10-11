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
import Input from "@/components/Input";
import { DateValue } from "@/interfaces/utils";
import DatePicker from "react-date-picker";
import ModalSheet from "@/components/ModalSheet";
import ClockIcon from "@/icons/ClockIcon";
import CalendarIcon from "@/icons/CalendarIcon";
import ScrewDriverIcon from "@/icons/ScrewDriverIcon";

const DetailsPage = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(0);
  const [days, setDays] = useState(1);
  const [selectedDate, setSelectedDate] = useState<DateValue>(new Date());
  const [isModalSheetOpen, setIsModalSheetOpen] = useState(false);
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
    setDays(inputValue);
    setSelectedPrice(amount ? inputValue * amount : 0);
  };

  const handleClickBook = () => {
    setIsModalSheetOpen(true);
  };

  const handleClickConfirmBook = async () => {
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
      setIsModalSheetOpen(false);
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
    <div className="p-4 w-full bg-gradient-to-b from-white via-slate-100 to-slate-200 relative motion-preset-fade min-h-dvh h-full">
      <Header />
      <ModalSheet isOpen={isModalSheetOpen} setOpen={setIsModalSheetOpen}>
        <div className="bg-opacity-50 flex justify-center items-center z-50 px-8">
          <div className="bg-white rounded-lg w-full">
            <h2 className="text-2xl font-bold text-secondary">
              Booking Details
            </h2>

            <div className="flex flex-col items-center">
              <img
                src={car.image_url}
                className="h-32 object-cover mb-4"
                alt={car.name}
              />
              <div className="flex justify-between items-center w-full">
                <h3 className="font-medium text-lg">{car.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">
                    <StarIcon />
                  </span>
                  <h4 className="font-normal text-sm">{car.rating}</h4>
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-4">
                <span>
                  <ClockIcon />
                </span>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Duration</p>
                  <p className="font-thin text-sm">{days} day(s)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span>
                  <CalendarIcon />
                </span>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Pickup Date
                  </p>
                  <p className="font-thin text-sm">
                    {selectedDate?.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span>
                  <ScrewDriverIcon />
                </span>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Car Details
                  </p>
                  <p className="font-thin text-sm">
                    {car.seats} Seats • {car.transmission}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-2">Price Breakdown</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Rental Fee ({days} days)</span>
                <span className="text-secondary">${selectedPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleClickConfirmBook}
              className="my-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="pe-4">Loading...</span>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </div>
      </ModalSheet>
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
            <span className="font-semibold">{option.amount} /</span>
            {option.duration}
          </Card>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <Input
          onFocus={handleFocus}
          type="number"
          min={1}
          defaultValue={1}
          onChange={handleChange}
          className="p-3 w-full  rounded-lg"
        />
        <div className="w-min h-full text-white bg-dark p-3 absolute top-0 right-0">
          <span className="relative bottom-1"> day(s)</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl mt-4">
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          className="p-3 w-full outline-1 bg-white outline-none border-none rounded-lg"
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
          Booking now
        </div>
      </Button>
    </div>
  );
};

export default DetailsPage;

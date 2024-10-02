import Card from "@/components/Card";
import Header from "@/components/Header";
import StarIcon from "@/icons/StarIcon";

const DetailsPage = () => {
  return (
    <div className="p-4 w-full h-dvh bg-gradient-to-b from-white via-slate-100 to-slate-200">
      <Header />
      <Card className="mb-4">
        <div className="flex flex-col justify-center items-center">
          <img
            src="/src/assets/images/get_started_car.png"
            className="h-[150px]"
          />
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
      <Card className="p-0">
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
    </div>
  );
};

export default DetailsPage;

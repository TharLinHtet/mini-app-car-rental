import { config } from "@/config";
import DetailsPage from "@/pages/DetailsPage";
import GetStartedPage from "@/pages/GetStartedPage";
import HomePage from "@/pages/HomePage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const Routers = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path={config.route.home} element={<HomePage />} />
        <Route path={`${config.route.details}/:id`} element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
};

export default Routers;

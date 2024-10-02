import DetailsPage from "@/pages/DetailsPage";
import GetStartedPage from "@/pages/GetStartedPage";
import HomePage from "@/pages/HomePage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const Routers = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
};

export default Routers;

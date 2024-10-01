import HomePage from "@/pages/HomePage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const Routers = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </MemoryRouter>
  );
};

export default Routers;

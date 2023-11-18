import NavBar from "./Navbar";
import Prueba from "./Prueba";
import MyRoute from "./Route";
import { Route, Routes } from "react-router-dom";

const Content = () => {
  return (
    <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/home" element={<Prueba />} />
        <Route path="/prueba" element={<MyRoute />} />
      </Routes>
  );
};

export default Content;

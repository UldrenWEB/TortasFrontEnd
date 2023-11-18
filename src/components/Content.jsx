import MyRoute from "./MyRoute";
import { Route, Routes } from "react-router-dom";

const Content = ({ darkMode }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={darkMode ? "darkMode" : "lightMode"}>Path</div>
        }
      />
      <Route
        path="/home"
        element={
          <div className={darkMode ? "darkMode" : "lightMode"}>Home</div>
        }
      />
      <Route
        path="/prueba"
        element={<MyRoute className={darkMode ? "darkMode" : "lightMode"} />}
      />
    </Routes>
  );
};

export default Content;

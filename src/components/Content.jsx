import Home from './Home'
import MyRoute from "./MyRoute";
import { Route, Routes } from "react-router-dom";

const Content = ({ darkMode, setLogger, setDataNav }) => {
  return (
    //TODO: MODIFICAR AQUI ESTO QUE LOS ELEMENTOS USAN
    //TODO: ADEMAS RECORDAR QUE TODOS LOS COMPONENTES QUE CARGUEN DEBERAN USAR SU WITDH 100%
    <Routes className={"main-layout"}>
      <Route
        path="/"
        element={
          <Home
            className={darkMode ? "darkMode" : "lightMode"}
            style={{ width: "100%" }}
          >
            Path
          </Home>
        }
      />
      <Route
        path="/login"
        element={
          <div
            className={darkMode ? "darkMode" : "lightMode"}
            style={{ width: "100%" }}
          >
            Home
          </div>
        }
      />
      <Route
        path="/prueba"
        element={
          <MyRoute
            className={darkMode ? "darkMode" : "lightMode"}
            style={{ width: "100%" }}
          />
        }
      />
    </Routes>
  );
};

export default Content;

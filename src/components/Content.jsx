import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import { Route, Routes } from "react-router-dom";
import CreatePerson from "../BO/CreatePerson";
import { useEffect } from "react";
import CreateProduct from "../BO/CreateProduct";
import { verifyLoginCookie } from "../service/verifyLogin";
// import Reports from "./Reports";
import MyRoute from "./MyRoute";

const Content = ({ darkMode, setLogger, setDataNav, navigate, isLogged }) => {
  useEffect(() => {
    verifyLoginCookie({ setLogger, navigate, isLogged });

  }, []);

  
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
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            className={darkMode ? "darkMode" : "lightMode"}
            style={{ width: "100%" }}
            setLogger={setLogger}
            setDataNav={setDataNav}
            navigate={navigate}
            isLogged={isLogged}
          />
        }
      />
      <Route
        path="/logout"
        element={
          <Logout
            className={darkMode ? "darkMode" : "lightMode"}
            setLogger={setLogger}
            isLogged={isLogged}
            style={{ width: "100%" }}
          />
        }
      />

      {isLogged ? <Route path="/home" element={<div>Inicio</div>} /> : null}

      {/* Estas se pueden hacer dinamicas */}
      <Route path="/person/control/createPerson" element={<CreatePerson />} />

      <Route path="/sales/products/createProduct" element={<CreateProduct />} />
      <Route path="/reports"
        element={
          <MyRoute
            className={darkMode ? "darkMode" : "lightMode"}
          />
        }
      />
    </Routes>

  );
};

export default Content;

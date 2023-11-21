import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import MyRoute from "./MyRoute";
import { Route, Routes } from "react-router-dom";

const Content = ({ darkMode, setLogger, setDataNav, navigate, isLogged }) => {
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
          <Login
            className={darkMode ? "darkMode" : "lightMode"}
            style={{ width: "100%" }}
            setLogger={setLogger}
            setDataNav={setDataNav}
            navigate={navigate}
            isLogged={isLogged}
          >
            Home
          </Login>
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
    </Routes>
  );
};

export default Content;

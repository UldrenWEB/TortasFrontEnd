import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import { Route, Routes } from "react-router-dom";
import CreatePerson from "../BO/CreatePerson";
import { useEffect } from "react";
import CreateProduct from "../BO/CreateProduct";
import {
  verifyLoginCookie,
  verifyMethodsNav,
  verifySession,
} from "../service/verifyLogin";
// import Reports from "./Reports";
import MyRoute from "./MyRoute";
import CreateRoute from "../BO/CreateRoute";
import ChatProbe from "../components/Messages/ChatProbe";
import FinalChatProbe from "./Messages/FinalChatProbe";
import CreateLocal from "../BO/CreateLocal";
import CreatePayMethod from "../BO/CreatePayMethod";
import ChangeStatusSeller from "../BO/ChangeStatusSeller";
import SuperLoader from "./SuperLoader";
import AsignarLocalVendedor from "../BO/AsignarLocalVendedor";

const Content = ({
  dataUser,
  darkMode,
  setLogger,
  setDataNav,
  navigate,
  isLogged,
  setDataUser,
  location,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    verifyLoginCookie({ setLogger, navigate, isLogged, location });
    verifyMethodsNav({ setLogger, navigate, setDataNav, setDataUser });
  }, []);

  return (
    //TODO: MODIFICAR AQUI ESTO QUE LOS ELEMENTOS USAN
    //TODO: ADEMAS RECORDAR QUE TODOS LOS COMPONENTES QUE CARGUEN DEBERAN USAR SU WITDH 100%
    <>
      {isLoading && <SuperLoader />}

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
              setDataUser={setDataUser}
              setLoading={setIsLoading}
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
              navigate={navigate}
            />
          }
        />

        {isLogged ? <Route path="/home" element={<div>Inicio</div>} /> : null}

        {/* Estas se pueden hacer dinamicas */}
        <Route path="/person/control/createPerson" element={<CreatePerson setLoading={setIsLoading} />} />

        <Route
          path="/sales/products/createProduct"
          element={<CreateProduct setLoading={setIsLoading} />}
        />

        <Route path="/local/control/createRoute" element={<CreateRoute setLoading={setIsLoading} />} />

        <Route path="/local/control/createLocal" element={<CreateLocal setLoading={setIsLoading} />} />

        <Route
          path="/billing/payMethod/createMethod"
          element={<CreatePayMethod setLoading={setIsLoading} />}
        />

        <Route
          path="/seller/control/changeStatusSeller"
          element={<ChangeStatusSeller setLoading={setIsLoading} />}
        />

        <Route
          path="/seller/control/asignLocalSeller"
          element={<AsignarLocalVendedor setLoading={setIsLoading} />}
        />

        <Route
          path="/reports"
          element={<MyRoute className={darkMode ? "darkMode" : "lightMode"} />}
        />

        <Route
          path="/miPinga"
          element={
            <>
              <FinalChatProbe
                typeChat={"broadcast"}
                userData={{ user: dataUser.name, profile: dataUser.profile }}
              />
              {/* <FinalChat
              typeChat={"el prado"}
              userData={{ user: dataUser.name, profile: dataUser.profile }}
            /> */}
              {/* <FinalChat
              typeChat={"direct"}
              userData={{ user: dataUser.name, profile: dataUser.profile }}
            />
            <FinalChat
              typeChat={"el prado"}
              userData={{ user: dataUser.name, profile: dataUser.profile }}
            /> */}
            </>
          }
        />
      </Routes>
    </>
  );
};

export default Content;

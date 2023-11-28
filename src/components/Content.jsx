import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { verifyLoginCookie, verifyMethodsNav } from "../service/verifyLogin";
import SuperLoader from "./SuperLoader";

const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const Logout = lazy(() => import("./Logout"));
const CreatePerson = lazy(() => import("../BO/CreatePerson"));
const CreateProduct = lazy(() => import("../BO/CreateProduct"));
const MyRoute = lazy(() => import("./MyRoute"));
const CreateRoute = lazy(() => import("../BO/CreateRoute"));
const CreateLocal = lazy(() => import("../BO/CreateLocal"));
const CreatePayMethod = lazy(() => import("../BO/CreatePayMethod"));
const ChangeStatusSeller = lazy(() => import("../BO/ChangeStatusSeller"));
const AsignarLocalVendedor = lazy(() => import("../BO/AsignarLocalVendedor"));
const CreateBilling = lazy(() => import("../BO/CreateBilling"));
const AsingPayToBill = lazy(() => import("../BO/payBill"));
const EditPerson = lazy(() => import("../BO/EditPerson"));
const AsignarSalarioVendedor = lazy(() =>
  import("../BO/AsignarSalarioVendedor")
);
const HomeLogged = lazy(() => import("./HomeLogged"));
const FinalChatProbe = lazy(() => import("./Messages/FinalChatProbe"));
const Contacto = lazy(() => import("./Contacto"));

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
    <Suspense fallback={<SuperLoader />}>
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

        <Route
          path="/home"
          element={<HomeLogged setLoading={setIsLoading} infoUser={dataUser} />}
        />

        {/* Estas se pueden hacer dinamicas */}
        <Route
          path="/person/control/createPerson"
          element={<CreatePerson setLoading={setIsLoading} />}
        />

        <Route
          path="/sales/products/createProduct"
          element={<CreateProduct setLoading={setIsLoading} />}
        />

        <Route
          path="/local/control/createRoute"
          element={<CreateRoute setLoading={setIsLoading} />}
        />

        <Route
          path="/local/control/createLocal"
          element={<CreateLocal setLoading={setIsLoading} />}
        />

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
          path="/billing/bill/createBill"
          element={<CreateBilling setLoading={setIsLoading} />}
        />

        <Route
          path="/billing/bill/payBill"
          element={<AsingPayToBill setLoading={setIsLoading} />}
        />

        <Route
          path="/person/control/editPerson"
          element={<EditPerson setLoading={setIsLoading} />}
        />
        <Route
          path="/sales/products/updateToProductSale"
          element={<EditProduct setLoading={setIsLoading} />}
        />
        <Route
          path="/local/control/editTo"
          element={<EditLocal setLoading={setIsLoading} />}
        />
        <Route
          path="/seller/order/asignTypePay"
          element={<AsignarSalarioVendedor setLoading={setIsLoading} />}
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
    </Suspense>
  );
};

export default Content;

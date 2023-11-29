import Cookies from "js-cookie";
import fetchDataPost from "./fetchDataPost";

export const verifyLoginCookie = ({ setLogger, navigate, location }) => {
  const logged = Cookies.get("connect.sid") ? true : false;
  setLogger(logged);

  if (logged) {
    if (location.pathname === "/" && location.pathname !== "/home") {
      navigate("/home");
    }
  } else {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }
};

export const verifyMethodsNav = ({
  setLogger,
  navigate,
  setDataNav,
  setDataUser,
}) => {
  const info = localStorage.getItem("permisosNav");
  const infoUser = localStorage.getItem("dataUser");

  if (!info || !infoUser) {
    setLogger(false);
    return navigate("/");
  }

  const permisosNav = JSON.parse(info);
  const dataUser = JSON.parse(infoUser);

  setDataNav(permisosNav);
  setDataUser(dataUser);
  return;
};

export const verifyLogout = ({ setLogger, setData, result }) => {
  try {
    setLogger(false);
  Cookies.remove("connect.sid");
  localStorage.removeItem("permisosNav");
  localStorage.removeItem("dataUser");
  setData(result.message || "La sesion se cerro correctamente");
  } catch (error) {
    console.warning(error.message)
    return true
  }
};

export const verifySession = async ({ setLogger, navigate }) => {
  const prueba = await fetchDataPost({
    area: "prueba",
    object: "prueba",
    method: "prueba",
    params: {},
  });

  if (prueba.errorSession) {
    Cookies.remove("connect.sid");
    localStorage.removeItem("permisosNav");
    localStorage.removeItem("dataUser");

    setLogger(false);

    console.log("se cierra session tonto");
    return navigate("/");
  }
};

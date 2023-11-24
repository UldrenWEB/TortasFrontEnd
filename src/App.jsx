import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Layout } from "antd";
import SideBar from "./components/Sidebar/SideBar";
import Content from "./components/Content";
import FinalChat from "./components/Messages/FinalChat";
import "./styles/App.css";
import { verifyLoginCookie, verifyMethodsNav } from "./service/verifyLogin";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkTheme, setDrakTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [dataNav, setDataNav] = useState({});
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    verifyLoginCookie({ setLogger: setIsLogged, navigate, location });

    verifyMethodsNav({ setLogger: setIsLogged, navigate, setDataNav , setDataUser});
  }, []);

  const changeTheme = () => setDrakTheme(!darkTheme);
  const changeCollapsed = () => setCollapsed(!collapsed);

  return (
    <main>
      <Layout className="main" onClick={!collapsed ? changeCollapsed : null}>
        {isLogged && (
          <SideBar
            darkTheme={darkTheme}
            changeTheme={changeTheme}
            collapsed={collapsed}
            changeCollapsed={changeCollapsed}
            infoMethod={dataNav}
            navigate={navigate}
            infoUser={dataUser}
          />
        )}

        <Content
          darkMode={darkTheme}
          setLogger={setIsLogged}
          setDataNav={setDataNav}
          navigate={navigate}
          isLogged={isLogged}
          setDataUser={setDataUser}
          location={location}
        />
      </Layout>
    </main>
  );
}

export default App;

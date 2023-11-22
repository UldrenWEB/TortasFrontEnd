import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Layout } from "antd";
import SideBar from "./components/Sidebar/SideBar";
import Content from "./components/Content";
import "./styles/App.css";

function App() {
  const navigate = useNavigate();
  const [darkTheme, setDrakTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [dataNav, setDataNav] = useState({})

  const changeTheme = () => setDrakTheme(!darkTheme);
  const changeCollapsed = () => setCollapsed(!collapsed);

  return (
    <>
      <Layout className="main" onClick={!collapsed ? changeCollapsed : null}>
        {isLogged && (
          <SideBar
            darkTheme={darkTheme}
            changeTheme={changeTheme}
            collapsed={collapsed}
            changeCollapsed={changeCollapsed}
            infoMethod={dataNav}
            navigate={navigate}
          />
        )}

        <Content darkMode={darkTheme} setLogger={setIsLogged} setDataNav={setDataNav} navigate={navigate} isLogged={isLogged} />

      </Layout>
    </>

    // <NavBar />
    // <Table data={pruebaData} customHeaders={['Hola1', 'Hola2', 'Hola3', 'Hola5', 'holaUltimo']} />
  );
}

export default App;

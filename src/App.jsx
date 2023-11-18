import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Layout } from "antd";
import SideBar from "./components/Sidebar/SideBar";
import Content from "./components/Content";
import dataInfo from './constants/dataInfo'
import "./styles/App.css";

function App() {
  const navigate = useNavigate();
  const [darkTheme, setDrakTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

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
            infoMethod={dataInfo}
            navigate={navigate}
          />
        )}

        <Content darkMode={darkTheme}/>
      </Layout>
    </>
  );
}

export default App;

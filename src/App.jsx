import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Layout } from "antd";
import SideBar from "./components/Sidebar/SideBar";
import Content from "./components/Content";
import dataInfo from "./constants/dataInfo";
import iClient from "./instances/iClientSocket";
import "./styles/App.css";
import Chat from "./components/Chat";

function App() {
  const navigate = useNavigate();
  const [darkTheme, setDrakTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  const changeTheme = () => setDrakTheme(!darkTheme);
  const changeCollapsed = () => setCollapsed(!collapsed);

  //TODO: REALIZAR EL HOOK QUE SE CONECTA PARA OBTENER LA INFORMACION

  const mensajes = [
    {
      fecha: "8/17/2023",
      usuario: "Uldren",
      emisor: "Uldren",
      contenido: "Hola como estan",
      receptor: "Sol",
    },
    {
      fecha: "9/17/2023",
      usuario: "Uldren",
      emisor: "Hermana",
      contenido: "Hola como estas Uldren",
      receptor: "Uldren",
    },
    {
      fecha: "10/17/2023",
      usuario: "Uldren",
      emisor: "Mama",
      contenido: "Hola como estas Uldren",
      receptor: "Uldren",
    },
    {
      fecha: "11/17/2023",
      usuario: "Uldren",
      emisor: "Novia",
      contenido: "Hola como estas Uldren",
      receptor: "Uldren",
    },
    {
      fecha: "12/17/2023",
      usuario: "Uldren",
      emisor: "Papa",
      contenido: "Hola como estas Uldren",
      receptor: "Uldren",
    },
  ];

  const OBJ_CHAT = {
    zones: ["el prado", "sur", "prolongacion"],
    direct: "direct",
    broadcast: "namespace",
  };

  const socketClient = iClient.createSocketClient();

  function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function generateName() {
    let name1 = [
      "uldren",
      "julio",
      "erika",
      "ramon",
      "william",
      "finol",
      "garcia",
      "gabi",
      "sol",
    ];

    var name = capFirst(name1[getRandomInt(0, name1.length + 1)]);
    return name;
  }

  const objInfo = {
    socketEmit: socketClient,
    byUser: 'uldren12',
  };


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

        {/* <Content darkMode={darkTheme} /> */}

        <Chat messagesInitial={mensajes} typeChat={'broadcast'} objChat={OBJ_CHAT} objInfo={objInfo} key={'me gusta el sexo duro y perduro'}/>
      </Layout>
    </>

    // <NavBar />
    // <Table data={pruebaData} customHeaders={['Hola1', 'Hola2', 'Hola3', 'Hola5', 'holaUltimo']} />
  );
}

export default App;

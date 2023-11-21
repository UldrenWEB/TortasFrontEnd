import { useEffect, useState } from "react";
import fetcho from "../service/fetcho";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "../styles/Logout.css";

const Logout = ({ setLogger, isLogged }) => {
  useEffect(() => {
    if (!isLogged) return;

    const handler = async () =>{
        const result = await fetcho({ url: "/logout", method: "GET" });

        if(result?.error) return setData(result.error)

        setLogger(false)
        setData(result.message)
    }

    handler()
  }, []);

  const [data, setData] = useState("Cerrar sesion");

  return (
    <section className="container-logout">
      <div className="cardLogout">
        <h1>Mensaje</h1> {data}

        <Button className="btnRegresar">
            <Link to='/'>Ir a inicio</Link>
        </Button>
      </div>
    </section>
  );
};

export default Logout;

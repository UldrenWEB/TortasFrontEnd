import Input from "./Input";
import { useEffect } from "react";
import "../styles/Login.css";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "antd";
import torta2 from "../imgs/torta2.svg";
import dinoLoginSvg from "../imgs/dinoLogin.svg";

const Login = ({ setLogger, setDataNav, navigate, isLogged }) => {
  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, []);

  return (
    <section className="container-login">
      <div className="card-login">
        <div className="grid-login login-container">
          <div className="ingresa-img">
          <img src={torta2} alt="Torta" />
          <h1>Ingresa</h1>
          </div>

          <div className="inputs-login">
            <Input placeholder="Usuario" icon={faUser} iden="userInput" />

            <Input
              type="password"
              placeholder="Contraseña"
              icon={faLock}
              isPass
              iden="passInput"
            />
          </div>

          <div className="forget">
            <Link to='/olvidoDatos'>Olvidaste tus datos?</Link>
          </div>

          <Button className="btn-c btn-ingresar">Ingresar</Button>
        </div>

        <div className="grid-login dino-login">
            <div className="container-dino-login">
                <h2>Las ventas esperan por tu <span>gestión.</span></h2>
                <img src={dinoLoginSvg} alt="Dino" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import { Button } from "antd";
import "../styles/Home.css";
import torta from '../imgs/torta.svg'
import TypeIt from "typeit";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // const [info, setInfo] = useState();
  // useEffect(() => {
  //   const fetchazo = async () => {
  //     const response = await fetch(
  //       "https://venta-tortas-dev-htaz.4.us-1.fl0.io/login",
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         cors: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "mamapinga": "depende"
  //         },
  //         body: JSON.stringify({ user: "uldren12", password: "1234" }),

  //       }
  //     );

  //     const json = await response.json();

  //     console.log(json);
  //     setInfo(json.message);
  //   };

  //   fetchazo();
  // }, []);

  useEffect(()=>{
    const iTypeIt = new TypeIt(".main-letter-home", {
      strings: "",
      speed: 100,
      loop: true
    }).go()

    iTypeIt.type("profesional.").pause(100)
  }, [])

  
  return (
    <main className="main-container-home">
      <div className="container-home">
        <div className="container-home-grid">
          <div className="main-elements-home">
            <h1 className="main-letter">
            Controla tus ventas como un <br />
              <span className="main-letter-home"></span>
            </h1>

            <p className="p-home">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quo
              odio labore cum ad maxime.asdadaaaaaaaaaaaaaaa
            </p>

            <div className="containerButton">
              <Link to={"/login"} style={{width: '100%'}}><Button className="btn-home btn-home-1">Ingresar</Button></Link>
              <Link to={"/contacto"}style={{width: '100%'}}><Button className="btn-home btn-home-2">Contacto</Button></Link>
            </div>
          </div>

          <div className="logo-torta-home">
            <img src={torta} alt="Torta" className="torta-main"/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

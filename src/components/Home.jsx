import { useEffect, useState } from "react";

const Home = () => {
  const [info, setInfo] = useState();
  useEffect(() => {
    const fetchazo = async () => {
      const response = await fetch(
        "https://venta-tortas-dev-htaz.4.us-1.fl0.io/login",
        {
          method: "POST",
          credentials: "include",
          cors: "cors",
          headers: {
            "Content-Type": "application/json",
            "mamapinga": "depende"
          },
          body: JSON.stringify({ user: "uldren12", password: "1234" }),
          
        }
      );

      const json = await response.json();

      console.log(json);
      setInfo(json.message);
    };

    fetchazo();
  }, []);

  return (
    <>
      <p>{info}</p>
    </>
  );
};

export default Home;

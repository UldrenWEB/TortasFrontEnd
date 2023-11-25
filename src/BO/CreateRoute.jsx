import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import {
  createObjRoute,
  createRouteDataFetch,
  objsFetch,
} from "../constants/dataFetchs";
import MagicForms from "../components/MagicForms";
import infoInputsBo from "../constants/infoInputsBO";
import ButtonVe from "../components/ButtonVe";
import fetchDataPost from "../service/fetchDataPost";
import { validateCreateRoute } from "../constants/schemas";

const CreateRoute = () => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataStreet, setDataStreet] = useState(null);

  const handleClick = async () => {
    const arrayInputs = ["inNombreRuta", "inCalleAsociada"];

    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

    const result = await validateCreateRoute({data})
    if (result?.error) return console.log(`Existio un error: ${result.error}`);

    const dataFetch = createRouteDataFetch({ data });

    const obj = createObjRoute({ dataFetch });

    const resultService = await fetchDataPost(obj);

    console.log(resultService);
  };

  //Obtener valores de las calles
  useEffect(() => {
    const objStreets = objsFetch.objGetAllStreet;

    const handleFetch = async () => {
      const dataSt = await fetchDataPost(objStreets);
      const dataStMap = dataSt.map((item) => {
        return (
          <option value={item.id_street} key={item.id_street}>
            {item.na_street}
          </option>
        );
      });

      setDataStreet(dataStMap);
    };

    handleFetch();
  }, []);

  //Settear en los select valores de las calles
  useEffect(() => {
    if (!mapaInfo || !dataStreet) return;

    mapaInfo.get("inCalleAsociada").setInfo({ value: "", options: dataStreet });
  }, [mapaInfo, dataStreet]);

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Crear Ruta</h1>
        <MagicForms
          infoData={infoInputsBo.CreateRoute}
          mapaInfo={setMapaInfo}
        />

        <ButtonVe content="Crear Ruta" click={handleClick} />
      </div>
    </section>
  );
};

export default CreateRoute;

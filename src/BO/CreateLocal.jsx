import getMapInputs from "../service/getMapInputs";
import {
  createLocalDataFetch,
  createObjLocal,
  objsFetch,
} from "../constants/dataFetchs";
import MagicForms from "../components/MagicForms";
import { useEffect, useState } from "react";
import infoInputsBo from "../constants/infoInputsBO";
import ButtonVe from "../components/ButtonVe";
import fetchDataPost from "../service/fetchDataPost";
import ModalSession from "../components/ModalSession";

const CreateLocal = ({setLoading}) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataRoute, setDataRoute] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);

  const handleClick = async () => {
    const arrayInputs = ["inNombreLocal", "inRutaAsociada"];
    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });
    // const result = await validateCreateLocal({data})
    // if (result?.error) return console.log(`Existio un error: ${result.error}`);
    const dataFetch = createLocalDataFetch({ data });
    const obj = createObjLocal({ dataFetch });
    const resultService = await fetchDataPost({...obj, setLoading});
    if(resultService?.errorSession) setIsErrorSession(true)
    console.log(resultService);
  };

  //Obtener las rutas actuales
  useEffect(() => {
    const objRoute = objsFetch.objGetAllRoutes;
    const handleFetch = async () => {
      const dataRt = await fetchDataPost({...objRoute, setLoading});
      if(dataRt?.errorSession) setIsErrorSession(true)

      const dataRtMap = dataRt.map((item) => {
        return (
          <option value={item.id_route} key={item.id_route}>
            {item.de_route}
          </option>
        );
      });
      setDataRoute(dataRtMap);
    };
    handleFetch();
  }, []);

  //Settear en los select valores de las rutas
  useEffect(() => {
    if (!mapaInfo || !dataRoute) return;
    mapaInfo.get("inRutaAsociada").setInfo({ value: "", options: dataRoute });
  }, [mapaInfo, dataRoute]);

  if(isErrorSession) return <ModalSession/>

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Crear Local</h1>
        <MagicForms
          infoData={infoInputsBo.CreateLocal}
          mapaInfo={setMapaInfo}
        />
        <ButtonVe content="Crear local" click={handleClick} />
      </div>
    </section>
  );
};

export default CreateLocal;

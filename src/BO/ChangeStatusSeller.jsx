import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import fetchDataPost from "../service/fetchDataPost";
import {
  changeStatusSellerDataFetch,
  changeStatusSellerObj,
  getSellerByIdObj,
  objsFetch,
  getSellerByIdDataFetch,
} from "../constants/dataFetchs";
import infoInputsBo from "../constants/infoInputsBO";
import MagicForms from "../components/MagicForms";
import ButtonVe from "../components/ButtonVe";

const ChangeStatusSeller = ({setLoading}) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataSellers, setDataSellers] = useState(null);
  const [dataIdSeller, setDataIdSeller] = useState(null); //Este es el id del vendedor que se selecciono en el select
  const [dataStatus, setDataStatus] = useState(null);

  const handleClick = async () => {
    const arrayInputs = ["inVendedor", "inEstadoVendedor", "inCambiarEstado"];

    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

    // const result = await validateChangeStatusSeller({data})
    // if (result?.error) return console.log(`Existio un error: ${result.error}`);

    const dataFetch = changeStatusSellerDataFetch({ data });
    if(dataFetch?.info) return console.log('No se cambia estado')
    const obj = changeStatusSellerObj({ dataFetch });
    const resultService = await fetchDataPost({...obj, setLoading});

    console.log(resultService);
  };

  const handleChangeSelect = (e) => {
    if (e.target.value === "") return;
    //Aqui debo obtener la informacion de ese vendedor
    const idSeller = e.target.value;
    setDataIdSeller(idSeller);
  };

  const eventHandlers = {
    inVendedor: handleChangeSelect,
  };

  //Este fetch obtiene los valores que iran en el select
  useEffect(() => {
    const objSellers = objsFetch.objGetAllSellers;

    const handleFetch = async () => {
      const dataSe = await fetchDataPost({...objSellers, setLoading});

      const dataSeMap = dataSe.map((item) => {
        return (
          <option
            value={item.id_person}
            key={item.id_person}
          >{`${item.na_person} ${item.ln_person}`}</option>
        );
      });

      setDataSellers(dataSeMap);
    };

    handleFetch();
  }, []);

  //Ahora este los coloca en el select
  useEffect(() => {
    if (!mapaInfo || !dataSellers) return;

    mapaInfo.get("inVendedor").setInfo({ value: "", options: dataSellers });

  }, [mapaInfo, dataSellers]);

  //Este se encargara de obtener la informacion del vendedor
  useEffect(() => {
    if (!dataIdSeller) return;

    const handleEffect = async () => {
      const dataFetch = getSellerByIdDataFetch({
        data: { idSeller: dataIdSeller },
      });
      const obj = getSellerByIdObj({ dataFetch });
      const result = await fetchDataPost({...obj, setLoading});

      const status = result[0].de_status_user
      // const VALUE_STATUS = status === 'active' && status ? 1 : 2

      // const statusMap = status

      setDataStatus(status)
    };

    handleEffect();
  }, [dataIdSeller]);

  //De setear cuando cambiara el estado del vendedor
  useEffect(() => {
    if (!dataStatus) return;

    mapaInfo
      .get("inEstadoVendedor")
      .setInfo({ value: dataStatus, options: dataStatus });
  }, [dataStatus])

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Cambiar estado vendedor</h1>
        <MagicForms
          infoData={infoInputsBo.ChangeStatusSeller}
          mapaInfo={setMapaInfo}
          eventHandlers={eventHandlers}
        />

        <ButtonVe content="Cambiar" click={handleClick} />
      </div>
    </section>
  );
};

export default ChangeStatusSeller;

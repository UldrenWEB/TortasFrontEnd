import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import fetchDataPost from "../service/fetchDataPost";
import {
  changeStatusSellerDataFetch,
  changeStatusSellerObj,
  objsFetch,
} from "../constants/dataFetchs";
import infoInputsBo from "../constants/infoInputsBO";
import MagicForms from "../components/MagicForms";
import ButtonVe from "../components/ButtonVe";

const ChangeStatusSeller = () => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataSellers, setDataSellers] = useState(null);
  const [dataStatus, setDataStatus] = useState(null);


  const handleClick = async () => {
    const arrayInputs = ["inVendedor", "inEstadoVendedor", "inCambiarEstado"];

    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

    const result = await validateChangeStatusSeller({data})
    if (result?.error) return console.log(`Existio un error: ${result.error}`);

    const dataFetch = changeStatusSellerDataFetch({ data });
    const obj = changeStatusSellerObj({ dataFetch });
    const resultService = await fetchDataPost(obj);

    console.log(resultService);
  };

  //Este fetch obtiene los valores que iran en el select
  useEffect(() => {
    const objSellers = objsFetch.objGetAllSellers;

    const handleFetch = async () => {
      const dataSe = await fetchDataPost(objSellers);

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

    handleFetch()
  }, []);

  //Ahora este los coloca en el select
  useEffect(() => {
    if (!mapaInfo || !dataSellers) return;

    mapaInfo.get("inVendedor").setInfo({ value: "", options: dataSellers });

  }, [mapaInfo, dataSellers]); 


  return (
    <section className="container-magic-forms">
        <div className="container-form-magic">
            <h1>Cambiar estado vendedor</h1>
            <MagicForms infoData={infoInputsBo.ChangeStatusSeller} mapaInfo={setMapaInfo}/>

            <ButtonVe content="Cambiar" click={handleClick}/>
        </div>
    </section>
  )

};

export default ChangeStatusSeller;

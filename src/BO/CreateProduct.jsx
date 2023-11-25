import { useEffect, useState } from "react";
import MagicForms from "../components/MagicForms";
import infoInputsBo from "../constants/infoInputsBO";
import ButtonVe from "../components/ButtonVe";
import getMapInputs from "../service/getMapInputs";
import { validateCreateProduct } from "../constants/schemas";
import {
  createObjProduct,
  createProductDataFetch,
} from "../constants/dataFetchs";
import fetchDataPost from "../service/fetchDataPost";

const CreateProduct = ({setLoading}) => {
  const [mapaInfo, setMapaInfo] = useState(null);

  const handleClick = async () => {
    const arrayInputs = ["inDescripcionProducto"];
    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });
    const result = await validateCreateProduct({ data });
    if (result?.error)
      return console.log(`Existio un error en CreateProduct: ${result.error}`);

    const dataFetch = createProductDataFetch({ data });

    const obj = createObjProduct({ dataFetch });
    console.log(obj)

    const resultService = await fetchDataPost({...obj, setLoading});

    console.log(resultService);
  };

  useEffect(() => {}, []);

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Crear Producto</h1>
        <MagicForms
          infoData={infoInputsBo.CreateProduct}
          mapaInfo={setMapaInfo}
        />

        <ButtonVe content="Crear" click={handleClick} />
      </div>
    </section>
  );
};

export default CreateProduct;

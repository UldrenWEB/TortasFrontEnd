export const createPersonDataFetch = ({ data }) => {
  try {
    const obj = {
      address: data.inDireccionPersona,
      idTypePerson: [data.inTipoPersona],
      paramsPerson: [
        data?.inNombrePersona,
        data?.inApellidoPersona,
        data?.inNumeroPersona,
      ],
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js`
    );
  }
};

export const createObjPerson = ({ dataFetch }) => {
    try {
    const obj = {
      area: "person",
      object: "control",
      method: "createPerson",
      params: dataFetch,
        };
        
    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el createObjPerson archivo dataFetchs.js con el dato ${dataFetch}`
    );
  }
};

export const createProductDataFetch = ({ data }) => {
  try {
      const obj = {
        option: 'product',
      params:[ data?.inDescripcionProducto],
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js`
    );
  }
};

export const createObjProduct = ({ dataFetch }) => {
  try {
    const obj = {
      area: "sales",
      object: "products",
      method: "insertTo",
      params: dataFetch
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el createObjProduct archivo dataFetchs.js con el dato ${dataFetch}`
    );
  }
};

export const objsFetch = {
  objGetAllAddress: {
    area: "person",
    object: "control",
    method: "getAllOf",
    params: { option: "address" },
  },
  objGetAllTypesPerson: {
    area: "person",
    object: "control",
    method: "getAllOf",
    params: { option: "typePerson" },
  },
};

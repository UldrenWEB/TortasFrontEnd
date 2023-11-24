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

export const createRouteDataFetch = ({ data }) => { 
  try {
    const obj = {
      to: 'route',
      params: [ data?.inCalleAsociada, data?.inNombreRuta],
    }
    return obj
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const createObjRoute = ({ dataFetch }) => {
  try {
    const obj = {
      area: "local",
      object: "control",
      method: "insertTo",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el createObjRoute archivo dataFetchs.js con el dato ${dataFetch}`
    );
  }
}

export const createLocalDataFetch = ({ data }) => {
  try {
    const obj = {
      to: 'local',
      params: [ data?.inRutaAsociada, data?.inNombreLocal],
    }
    return obj
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const createObjLocal = ({ dataFetch }) => {
  try {
    const obj = {
      area: "local",
      object: "control",
      method: "insertTo",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el createObjLocal archivo dataFetchs.js con el dato ${dataFetch}`
    );
  }
}

export const createPayMethodDataFetch = ({ data }) => { 
  try {

    const { inTipoMetodoPago, inDescripcionMetodoPago } = data

    const tipoMetodoMap = {
      1: 'bank',
      2: 'methodbank',
      3: 'methodother'
    }

    if (!tipoMetodoMap[inTipoMetodoPago]) {
      return false
    }
    const obj = {
      to: tipoMetodoMap[inTipoMetodoPago],
      params: [ inDescripcionMetodoPago],
    }

    return obj
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const createObjPayMethod = ({ dataFetch }) => {
  try {
    const obj = {
      area: "billing",
      object: "payMethod",
      method: "addTo",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el createObjPayMethod archivo dataFetchs.js con el dato ${dataFetch}`
    );
  }
}

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
  objGetAllStreet: {
    area: "directions",
    object: "Control",
    method: "getAll",
    params: {direction: 'street'}
  },
  objGetAllRoutes: {
    area: "local",
    object: "control",
    method: "getAllOf",
    params: ["route"],
  },
  
};

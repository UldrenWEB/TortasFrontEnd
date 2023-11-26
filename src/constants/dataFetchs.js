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
      option: tipoMetodoMap[inTipoMetodoPago],
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

export const changeStatusSellerDataFetch = ({ data }) => {
  try {
    if(!data?.inCambiarEstado) return {info: "no se ha cambiado estado entonces no se envia nada"}

    const obj = {
      idSeller: data?.inVendedor,
      option: data?.inEstadoVendedor === 'active' && data?.inCambiarEstado ? 'desactivate' : 'activate'
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js`
    );
  }
}

export const changeStatusSellerObj = ({ dataFetch }) => { 
  try {
    const obj = {
      area: "seller",
      object: "control",
      method: "changeStatusSeller",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${dataFetch} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const getSellerByIdDataFetch = ({ data }) => { 
  try {
    const obj = {
      idSeller: data?.idSeller,
    };

    return obj;
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const getSellerByIdObj = ({ dataFetch }) => { 
  try {
    const obj = {
      area: "seller",
      object: "control",
      method: "getInfoSeller",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${dataFetch} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const getLocalsByRouteDataFetch = ({ data }) => {
  try {
    const obj = {
      by: 'routeAll',
      params: [data?.idRoute],
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js`
    );
  }
}

export const getLocalsByRouteObj = ({ dataFetch }) => { 
  try {
    const obj = {
      area: "local",
      object: "control",
      method: "getLocalBy",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${dataFetch} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const createAsignLocalSellerDataFetch = ({ data }) => { 
  try {
    const obj = {
      idSeller: data?.inVendedor,
      local: [data?.inLocal]
    };

    return obj;
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const createAsignLocalSellerObj = ({ dataFetch }) => {
  try {
    const obj = {
      area: "seller",
      object: "control",
      method: "asignLocalSeller",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el createAsignLocalSellerObj archivo dataFetchs.js con el dato ${dataFetch}`
    );
  }
}

export const getPersonDataFetch = ({ data }) => {
  try {
    const obj = {
      option: 'oneperson',
      params: [data?.idPerson]
    }

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js`
    );
  }
}

export const getPersonObj = ({ dataFetch }) => { 
  try {
    const obj = {
      area: "person",
      object: "control",
      method: "getAllOf",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${dataFetch} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const editPersonDataFetch = ({ data }) => {
  try {
    const obj = {
      option: 'person',
      params: [data?.inNombrePersona, data?.inApellidoPersona, data?.inNumeroPersona, data?.inDireccionPersona, data?.inPersonas]
    }

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js`
    );
  }
}

export const editPersonObj = ({ dataFetch }) => {
  try {
    const obj = {
      area: "person",
      object: "control",
      method: "editTo",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(
      `Existio un error en el editPersonObj archivo dataFetchs.js con el dato ${dataFetch}`
    );
  }
}

export const createAsignSalaryDataFetch = ({ data }) => { 
  try {
    const obj = {
      idSeller: data?.inVendedor,
      idTypePay: data?.inTipoSalario
    };

    return obj;
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${data} en el archivo dataFetchs.js. Error: ${error.message}`)
  }
}

export const createAsignSalaryObj = ({ dataFetch }) => { 
  try {
    const obj = {
      area: "seller",
      object: "order",
      method: "asignTypePay",
      params: dataFetch,
    };

    return obj;
  } catch (error) {
    console.error(`Existio un error en el servicio dataFetch con el dato ${dataFetch} en el archivo dataFetchs.js. Error: ${error.message}`)
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
  objGetAllSellers: {
    area: "seller",
    object: "control",
    method: "getSellersBy",
    params: {}
  },
  objGetAllPersons: {
    area: 'person',
    object: 'control',
    method: 'getAllOf',
    params: {option: 'person'}
  },
  objGetAllTypesSalary: {
    area: 'person',
    object: 'control',
    method: 'getAllOf',
    params: {option: 'alltypesalary'}
  }
  
};

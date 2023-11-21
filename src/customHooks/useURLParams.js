import { Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import getDataToTable from "../service/getDataToTable";
import pathInfo from "../constants/reportsInfo";

//*CustomHook para obtner los parametros de la url
export const useURLParams = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState(null);
    const [options, setOptions] = useState();
    const [isMain, setIsMain] = useState(true)
    const [defaultComponent, setDefaultComponent] = useState(false)

    const getModuleAndObjectByPath = (typeFilter) => {
        try {
            const route = pathInfo.find(config => config.path === typeFilter);

            if (!route) {
                return { module: 'default', object: 'default', options: 'default' }
            };//No encontro esa ruta
            const { module, object, options } = route
            return { module, object, options }
        } catch (error) {
            console.error(`Hubo un error al buscar en un arreglo de objeto en el customHook de useUrlParams: ${error.message}`);
            return false;
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const params = {};
                for (const [key, value] of searchParams.entries()) {
                    params[key] = value;
                }

                if (!params.filter) return setDefaultComponent(true)

                const { module, object, options } = getModuleAndObjectByPath(params.filter);

                if (module === 'default') return setDefaultComponent(true)

                const requestData = {
                    object,
                    area: module,
                    method: params.method,
                    params: [params.param]
                }


                const response = await getDataToTable({
                    body: requestData
                })

                console.log('Aqui json');
                const json = await response.json()
                setData(json)
                setOptions(options)
            } catch (error) {
                setDefaultComponent(true);
                console.error('Error al obtener los datos:', error);
            }
        };

        getData();
    }, [location.search]);

    if (defaultComponent) return { defaultComponent }

    return { data, options, isMain };
};

export default useURLParams;
import { useEffect, useState } from "react";
import DefaultComponent from './DefaultComponent'
import ButtonReports from "./ButtonReports";
import ComponentTable from "./Table";
import pathInfo from "../constants/reportsInfo";
import getData from '../service/getDataToTable'
import useURLParams from '../customHooks/useURLParams'
import pruebaData from "../service/pruebaData";

const getModuleAndObjectByPath = (typeFilter) => {
    try {
        const route = pathInfo.find(config => config.path === typeFilter);
        console.log('Aqui Route', route)
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

const fetchData = async ({ module, object, method, params }) => {
    const requestData = {
        object,
        area: module,
        method,
        params: [params],
    };

    const response = await getData({
        body: requestData,
    });

    return response;
};

const MyRoute = () => {
    const [data, setData] = useState(null);
    const [optionsData, setOptions] = useState(null);
    const [isMain, setIsMain] = useState(true);
    const [defaultComponent, setDefaultComponent] = useState(false);
    const { params, setParams } = useURLParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const verifyMain = params['main'];

                const { module, object, options } = getModuleAndObjectByPath(params.filter);
                console.log(options)
                if (module === 'default') {
                    setDefaultComponent(true);
                    console.log('default')
                    return;
                }

                console.log('Params', params, module, object, params.method, params.params)
                if (!verifyMain) {
                    const response = await fetchData(
                        {
                            module: module,
                            object: object,
                            method: params.method,
                            params: params.params
                        }
                    );
                    setIsLoading(false);
                    setData({ response, module, object, context: params['context'] });
                    setIsMain(false);
                    return;
                }
                setOptions(options);
                setIsLoading(false);
                return;
            } catch (error) {
                console.error(`Hubo un error al realizar un fetch o cargar las opciones en el componente myRoute: ${error.message}`);
            }
        };

        if (params.filter) {
            fetchDataAndSetData();
        }
    }, [params]);

    if (isLoading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras los datos se están cargando
    }

    return (
        <div>
            {defaultComponent ? (
                <DefaultComponent />
            ) : isMain ? (
                <ButtonReports optionByPath={optionsData} setParams={setParams} />
            ) : (
                <ComponentTable data={{ response: pruebaData, module: 'sales', object: 'products', context: 'product' }} />
            )}
        </div>
    );
};


export default MyRoute;







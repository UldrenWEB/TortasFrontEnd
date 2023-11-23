import { useEffect, useState } from "react";
import DefaultComponent from "./DefaultComponent";
import ButtonReports from "./ButtonReports";
import ComponentTable from "./Table";
import pathInfo from "../constants/reportsInfo";
import getData from '../service/getDataToTable'
import useURLParams from '../customHooks/useURLParams'
import fetcho from "../service/fetcho";

const getModuleAndObjectByPath = (typeFilter) => {
    try {
        const route = pathInfo.find((config) => config.path === typeFilter);
        console.log("Aqui Route", route);
        if (!route) {
            return { module: "default", object: "default", options: "default" };
        } //No encontro esa ruta
        const { module, object, options } = route;
        return { module, object, options };
    } catch (error) {
        console.error(
            `Hubo un error al buscar en un arreglo de objeto en el customHook de useUrlParams: ${error.message}`
        );
        return false;
    }
};

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
    const [optionsData, setOptions] = useState({});
    const [isMain, setIsMain] = useState(true);
    const [defaultComponent, setDefaultComponent] = useState(false);
    const { params } = useURLParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const verifyMain = params["main"];

                const { module, object, options } = getModuleAndObjectByPath(
                    params.filter
                );

                if (module === "default") {
                    setDefaultComponent(true);
                    console.log("default");
                    return;
                }

                console.log(
                    "Params",
                    params,
                    module,
                    object,
                    params.method,
                    params.params
                );
                if (!verifyMain) {
                    const response = await fetcho({
                        url: "/toProcess",
                        method: "POST",
                        body: {
                            module: module,
                            object: object,
                            method: params.method,
                            params: params.params,
                        },
                    });
                    setIsLoading(false);
                    setData({ response, module, object, context: params["context"] });
                    setIsMain(false);
                    return;
                }
                setOptions({ options });
                setIsLoading(false);
                return;
            } catch (error) {
                console.error(
                    `Hubo un error al realizar un fetch o cargar las opciones en el componente myRoute: ${error.message}`
                );
            }
        };

        if (params.filter) {
            fetchDataAndSetData();
        }
    }, [params]);

    if (isLoading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras los datos se están cargando
    }

    //Abajo necesito un arreglo de objeto de prueba para tener los datos de la tabla que tengan propiedades id, name y description
    const datainfo = [
        { id: 1, name: "Estrella", description: "Una brillante estrella en el cielo nocturno", price: 1000, stock: 10, category: "Cosmico" },
        { id: 2, name: "Luna", description: "Un satelite natural de la tierra", price: 2000, stock: 20, category: "Cosmico" },
        { id: 3, name: "Sol", description: "Una estrella de tamaño mediano", price: 3000, stock: 30, category: "Cosmico" },
        { id: 4, name: "Marte", description: "El planeta rojo", price: 4000, stock: 40, category: "Cosmico" },
        { id: 5, name: "Jupiter", description: "El planeta mas grande del sistema solar", price: 5000, stock: 50, category: "Cosmico" },
        { id: 6, name: "Saturno", description: "El planeta con anillos", price: 6000, stock: 60, category: "Cosmico" },
        { id: 7, name: "Urano", description: "El planeta con anillos", price: 7000, stock: 70, category: "Cosmico" },
        { id: 8, name: "Neptuno", description: "El planeta con anillos", price: 8000, stock: 80, category: "Cosmico" },
        { id: 9, name: "Pluton", description: "El planeta con anillos", price: 9000, stock: 90, category: "Cosmico" },
        { id: 10, name: "Mercurio", description: "El planeta con anillos", price: 10000, stock: 100, category: "Cosmico" },
        { id: 11, name: "Venus", description: "El planeta con anillos", price: 11000, stock: 110, category: "Cosmico" },
        { id: 12, name: "Tierra", description: "El planeta con anillos", price: 12000, stock: 120, category: "Cosmico" },
        { id: 13, name: "Ceres", description: "El planeta con anillos", price: 13000, stock: 130, category: "Cosmico" },
        { id: 14, name: "Eris", description: "El planeta con anillos", price: 14000, stock: 140, category: "Cosmico" },
        { id: 15, name: "Haumea", description: "El planeta con anillos", price: 15000, stock: 150, category: "Cosmico" },
        { id: 16, name: "Makemake", description: "El planeta con anillos", price: 16000, stock: 160, category: "Cosmico" },
        { id: 17, name: "Sedna", description: "El planeta con anillos", price: 17000, stock: 170, category: "Cosmico" },
        { id: 18, name: "Orcus", description: "El planeta con anillos", price: 18000, stock: 180, category: "Cosmico" },
        { id: 19, name: "Ixion", description: "El planeta con anillos", price: 19000, stock: 190, category: "Cosmico" },
        { id: 20, name: "Varuna", description: "El planeta con anillos", price: 20000, stock: 200, category: "Cosmico" },
        { id: 21, name: "Quaoar", description: "El planeta con anillos", price: 21000, stock: 210, category: "Cosmico" },
        { id: 22, name: "Eris", description: "El planeta con anillos", price: 22000, stock: 220, category: "Cosmico" },
        { id: 23, name: "Eris", description: "El planeta con anillos", price: 23000, stock: 230, category: "Cosmico" },
        { id: 24, name: "Eris", description: "El planeta con anillos", price: 24000, stock: 240, category: "Cosmico" },
        { id: 25, name: "Eris", description: "El planeta con anillos", price: 25000, stock: 250, category: "Cosmico" },
        { id: 26, name: "Eris", description: "El planeta con anillos", price: 26000, stock: 260, category: "Cosmico" },
        { id: 27, name: "Eris", description: "El planeta con anillos", price: 27000, stock: 270, category: "Cosmico" },
        { id: 28, name: "Eris", description: "El planeta con anillos", price: 28000, stock: 280, category: "Cosmico" },
        { id: 29, name: "Eris", description: "El planeta con anillos", price: 29000, stock: 290, category: "Cosmico" },
        { id: 30, name: "Eris", description: "El planeta con anillos", price: 30000, stock: 300, category: "Cosmico" },
        { id: 31, name: "Eris", description: "El planeta con anillos", price: 31000, stock: 310, category: "Cosmico" },
        { id: 32, name: "Eris", description: "El planeta con anillos", price: 32000, stock: 320, category: "Cosmico" },
        { id: 33, name: "Eris", description: "El planeta con anillos", price: 33000, stock: 330, category: "Cosmico" },
        { id: 34, name: "Eris", description: "El planeta con anillos", price: 34000, stock: 340, category: "Cosmico" },
        { id: 35, name: "Eris", description: "El planeta con anillos", price: 35000, stock: 350, category: "Cosmico" },
        { id: 36, name: "Eris", description: "El planeta con anillos", price: 36000, stock: 360, category: "Cosmico" },

    ]

    console.log("AQUIIII DATA", data);
    return (
        <div>
            {defaultComponent ? (
                <DefaultComponent />
            ) : isMain ? (
                <ButtonReports optionByPath={optionsData} />
            ) : (
                <ComponentTable data={{ response: datainfo }} />
            )}
        </div>
    );
};

export default MyRoute;

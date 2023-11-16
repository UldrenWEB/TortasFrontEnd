import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

//*CustomHook para obtner los parametros de la url
const useURLParams = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const params = {};
                for (const [key, value] of searchParams.entries()) {
                    params[key] = value;
                }
                console.log(params);
                // Realizar la llamada a la API con los parámetros obtenidos
                // const response = await fetch(`/api/data`)
                // const responseData = await response.json();
                // setData(responseData);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        getData();
    }, [location.search]);

    return data;
};

export default useURLParams;
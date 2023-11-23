import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

//*CustomHook para obtner los parametros de la url
const useURLParams = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [params, setParams] = useState({});

    useEffect(() => {
        try {
            const obj = {};
            const myArray = [];
            for (const [key, value] of searchParams.entries()) {
                if (key.startsWith('params')) {
                    myArray.push(value)
                }
                obj[key] = value;
            }
            obj['params'] = myArray

            setParams(obj)
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [location.search]);

    return { params };
};

export default useURLParams;
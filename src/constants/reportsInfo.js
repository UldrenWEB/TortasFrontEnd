import { URL_BASE } from "./url";

const pathInfo = [
    {
        path: 'routes',
        module: 'local',
        object: 'control',
        option: [
            { type: 'button', label: 'Todas las rutas', to: `${URL_BASE}/reports?method=getAllOf&params=route` },
            { type: 'text', placeHolder: 'Ingrese nombre', label: 'Por nombre de local', to: `${URL_BASE}/reports?method=getRouteByLocal` },
        ]

    },
    {
        path: 'products',
        module: 'sales',
        object: 'products',
        option: [
            { type: 'button', label: 'Todos los productos', to: `${URL_BASE}/reports?method=getAll&params=productsale` },
            { type: 'text', placeholder: 'Ingrese presentacion', label: 'Producto por presentacion especifica', to: `${URL_BASE}/reports?method=getAllProductByCondition&params=presentation` },
            { type: 'number', placeholder: 'Ingrese monto', label: 'Producto por monto especifico', to: `${URL_BASE}/reports?method=getAllProductByCondition&params=amount` },
            { type: 'number', placeholder: 'Ingrese monto', label: 'Producto menor al monto', to: `${URL_BASE}/reports?method=getAllProductByCondition&params=lessthanamount` },
            { type: 'number', placeholder: 'Ingrese monto', label: 'Producto mayor al monto', to: `${URL_BASE}/reports?method=getAllProductByCondition&params=largerthanamount` },

        ]
    },
    {
        path: 'local',
        module: 'local',
        object: 'control',
        option: [

        ]
    },
    {
        path: 'pays',
        module: 'billing',
        object: 'bill',
        option: [

        ]
    },
    {
        path: 'sales',
        module: 'sales',
        object: 'assignment',
        option: [

        ]
    },
    {
        path: 'debtors',
        module: 'billing',
        object: 'control',
        option: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        option: [

        ]
    },
    {
        path: 'person',
        module: 'person',
        object: 'control',
        option: [

        ]
    },
    {
        path: 'payMethods',
        module: 'billing',
        object: 'payMethod',
        option: [

        ]
    },
    {
        path: 'bills',
        module: 'billing',
        object: 'bill',
        option: [

        ]
    },
    {
        path: 'assingments',
        module: 'sales',
        object: 'assignments',
        option: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        option: [

        ]
    },
    {
        path: 'presentations',
        module: 'sales',
        object: 'assignments',
        option: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        option: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        option: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        option: [

        ]
    },


]

export default pathInfo;
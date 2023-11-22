import { URL_BASE } from "./url";

const pathInfo = [
    {
        path: 'routes',
        module: 'local',
        object: 'control',
        options: [
            { type: 'button', label: 'Todas las rutas', to: `?filter=routes&context=route&method=getAllOf&params=route` },
            { type: 'text', placeHolder: 'Ingrese nombre', label: 'Por nombre de local', to: `?filter=routes&context=route&method=getRouteByLocal` },
        ]

    },
    {
        path: 'products',
        module: 'sales',
        object: 'products',
        options: [
            {
                type: 'button',
                label: 'Todos los productos',
                to: `?filter=products&context=product&method=getall&params=productsale`
            },
            {
                type: 'text',
                placeholder: 'Ingrese presentacion',
                label: 'Producto por presentacion especifica',
                to: `?filter=products&context=product&method=getallProductByCondition&params=presentation`
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto',
                label: 'Producto por monto especifico',
                to: `?filter=products&context=product&method=getAllProductByCondition&params=amount`
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto',
                label: 'Producto menor al monto',
                to: `?filter=products&context=product&method=getAllProductByCondition&params=lessthanamount`
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto',
                label: 'Producto mayor al monto',
                to: `?filter=products&context=product&method=getAllProductByCondition&params=largerthanamount`
            },

        ]
    },
    {
        path: 'local',
        module: 'local',
        object: 'control',
        options: [

        ]
    },
    {
        path: 'pays',
        module: 'billing',
        object: 'bill',
        options: [

        ]
    },
    {
        path: 'sales',
        module: 'sales',
        object: 'assignment',
        options: [

        ]
    },
    {
        path: 'debtors',
        module: 'billing',
        object: 'control',
        options: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        options: [

        ]
    },
    {
        path: 'person',
        module: 'person',
        object: 'control',
        options: [

        ]
    },
    {
        path: 'payfilter=products&Methods',
        module: 'billing',
        object: 'payfilter=products&Method',
        options: [

        ]
    },
    {
        path: 'bills',
        module: 'billing',
        object: 'bill',
        options: [

        ]
    },
    {
        path: 'assingments',
        module: 'sales',
        object: 'assignments',
        options: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        options: [

        ]
    },
    {
        path: 'presentations',
        module: 'sales',
        object: 'assignments',
        options: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        options: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        options: [

        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        options: [

        ]
    },


]

export default pathInfo;
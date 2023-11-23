const pathInfo = [
    {
        path: 'routes',
        module: 'local',
        object: 'control',
        options: [
            {
                type: 'button',
                label: 'Todas las rutas',
                to: `?filter=routes&context=route&method=getAllOf&params=route`
            },
            {
                type: 'select',
                method: ['local', 'control', 'getAllOf', 'local'],
                placeHolder: 'Ingrese nombre',
                label: 'Por nombre de local',
                to: `?filter=routes&context=route&method=getRouteByLocal`
            },
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
                type: 'select',
                method: ['sales', 'products', 'getAll', 'presentation'],
                placeholder: 'Seleccione presentacion',
                label: 'Producto por presentacion especifica',
                to: `?filter=products&context=product&method=getAllProductByCondition&params=presentation`
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
            {
                type: 'button',
                label: 'Todos los locales',
                to: `?filter=local&context=local&method=getAllOf&params=local`
            },
            {
                type: 'text',
                placeholder: 'Ingrese persona',
                label: 'Local por persona',
                to: `?filter=local&context=local&method=getLocalBy&params=person`
            },
            {
                type: 'select',
                method: ['local', 'control', 'getAllOf', 'route'],
                placeholder: 'Ingrese route',
                label: 'Local por ruta',
                to: `?filter=local&context=local&method=getLocalBy&params=route`
            },
        ]
    },
    {
        path: 'pays',
        module: 'billing',
        object: 'bill',
        options: [
            {
                error: 'Aqui faltan los metodos correspondientes'
            }
        ]
    },
    {
        path: 'sales',
        module: 'billing',
        object: 'bill',
        options: [
            {
                error: 'Aqui faltan los metodos correspondientes'
            }
        ]
    },
    {
        path: 'debtors',
        module: 'billing',
        object: 'bill',
        options: [
            {
                error: 'Aqui faltan los metodos correspondientes'
            }
        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        options: [
            {
                type: 'button',
                label: 'Todos los vendendores',
                to: '?filter=seller&context=seller&method=getSellersBy'
            },
            {
                type: 'select',
                method: ['local', 'control', 'getAllOf', 'route'],
                placeholder: 'Seleccione una ruta',
                label: 'Vendedores por ruta',
                to: '?filter=seller&context=seller&method=getSellersBy&params=route'
            },
            {
                type: 'select',
                method: ['sales', 'assignment', 'getAllAssignment'],
                placeholder: 'Seleccione asignacion',
                label: 'Vendedor por asignacion',
                to: '?filter=seller&context=seller&method=getSellersBy&params=assignment'
            },
            {
                type: 'button',
                label: 'Vendedores por venta',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sells'
            },
            {
                type: 'number',
                placeholder: 'Ingrese minimo',
                label: 'Vendedores por ventas minimas',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sellsMin'
            },
            {
                type: 'number',
                placeholder: 'Ingrese maximo',
                label: 'Vendedores por ventas maximas',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sellsMax'
            },
            {
                type: 'date',
                placeholder: 'Ingrese fecha',
                label: 'Vendedores por ventas fechas',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sellsByDate'
            },
            {
                type: 'number',
                placeholder: 'Ingrese rango de fechas',
                label: 'Vendedores por rango de fechas',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sellsByRangeDate'
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto',
                label: 'Vendedores por monto que han realizado',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sellsByAmmount'
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto minimo',
                label: 'Vendedores por monto minimo',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sellsByAmmountMin'
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto maximo',
                label: 'Vendedores por monto maximo',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sellsByAmmountMax'
            },
        ]
    },
    {
        path: 'person',
        module: 'person',
        object: 'control',
        options: [
            {
                type: 'button',
                label: 'Todos las persona',
                to: '?filter=person&context=person&method=getAllOf&params=person'
            },
            {
                type: 'select',
                method: ['directions', 'control', 'getAll', 'address'],
                placeholder: 'Seleccion direccion',
                label: 'Persona por direccion',
                to: '?filter=person&context=person&method=getAllOf&params=getAllPersonWithAddress'
            },
            {
                type: 'button',
                label: 'Todos los tipos de persona',
                to: '?filter=person&context=person&method=getAllOf&params=typePerson'
            },
            {
                type: 'button',
                label: 'Todos las direcciones de personas',
                to: '?filter=person&context=person&method=getAllOf&params=address'
            },
        ]
    },
    {
        path: 'payMethod',
        module: 'billing',
        object: 'payMethod',
        options: [
            {
                type: 'button',
                label: 'Todos lo metodos de pago',
                to: '?filter=payMethod&context=status&method=getBy&params=getAllMethods'
            },
            {
                type: 'button',
                label: 'Todos lo metodos de pago habilitados',
                to: '?filter=payMethod&context=status&method=getBy&params=methodActives'
            },
            {
                type: 'button',
                label: 'Todos lo metodos desahabilitados',
                to: '?filter=payMethod&context=status&method=getBy&params=getInactiveMethods'
            },
            {
                type: 'button',
                label: 'Metodos de pago banco',
                to: '?filter=payMethod&context=methodbank&method=getBy&params=methodBanks'
            },
            {
                type: 'button',
                label: 'Otros metodos no de bancos',
                to: '?filter=payMethod&context=methodother&method=getBy&params=methodOthers'
            },

        ]
    },
    {
        path: 'bills',
        module: 'billing',
        object: 'bill',
        options: [
            {
                error: 'Faltan metodos para poder indicarlo aqui'
            }
        ]
    },
    {
        path: 'assingments',
        module: 'sales',
        object: 'assignments',
        options: [
            {
                type: 'button',
                label: 'Todas las asignaciones',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=nameclientmid'
            },
            {
                type: 'text',
                placeholder: 'Ingrese nombre de cliente',
                label: 'Todas las asignaciones por cliente',
                to: '?filter=assingments&context=state&method=getAllAssignment'
            },
            {
                type: 'text',
                placeholder: 'Ingrese nombre de vendedor',
                label: 'Todas las asignaciones por vendedor',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=namesellermid'
            },
            {
                type: 'select',
                method: ['sales', 'products', 'getAll', 'product'],
                placeholder: 'Seleccione el producto',
                label: 'Todas las asignaciones por producto',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=nameproductmid'
            },
            {
                type: 'select',
                method: ['sales', 'products', 'getAll', 'presentation'],
                placeholder: 'Seleccion la presentacion',
                label: 'Todas las asignaciones por presentacion',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=namepresentationtmid'
            },
            {
                type: 'date',
                placeholder: 'Ingrese la fecha',
                label: 'Asignaciones por fecha',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=date'
            },
        ]
    },
    {
        path: 'presentations',
        module: 'sales',
        object: 'assignments',
        options: [
            {
                type: 'button',
                label: 'Todas las presentaciones',
                to: '?filter=presentations&context=presentation&method=getAll&params=presentation'
            },
            {
                type: 'select',
                method: ['sales', 'products', 'getAll', 'product'],
                placeholder: 'Seleccione producto',
                label: 'Todas las presentaciones de un producto',
                to: '?filter=presentations&context=presentation&method=getAllPresentationByProduct'
            },
        ]
    }

]

export default pathInfo;
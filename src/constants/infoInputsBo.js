const infoInputsBo = {
    CreatePerson: [
        {type: 'text', label: "Nombre", id: 'inNombrePersona', placeholder: "Nombre de la persona"},
        {type: 'text', label: "Apellido", id: 'inApellidoPersona', placeholder: "Apellido de la persona"},
        {type: 'number', label: "Numero", id: 'inNumeroPersona', placeholder: "Numero de la persona"},
        {type: 'select', label: "Tipo", id: 'inTipoPersona', placeholder: "Tipo de la persona"},
        {type: 'select', label: "Direccion", id: 'inDireccionPersona', placeholder: "Direccion de la persona"},
    ],
    CreateProduct: [
        {type: 'text', label: "Descripcion producto", id: 'inDescripcionProducto', placeholder: "Descripcion del producto"}
    ],
    CreateRoute: [
        {type: 'text', label: "Nombre ruta", id: 'inNombreRuta', placeholder: "Nombre de la ruta"},
        {type: 'select', label: "Calla asociada", id: 'inCalleAsociada', placeholder: "Calle asociada a la ruta"},
    ]
}

export default infoInputsBo
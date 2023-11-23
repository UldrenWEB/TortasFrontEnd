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
    ]
}

export default infoInputsBo
import { object, string, number } from "yup";

const schemaCreatePerson = object({
  inNombrePersona: string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "El nombre solo puede contener letras"),
  inApellidoPersona: string()
    .required("El apellido es requerido")
    .min(3, "El apellido debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "El apellido solo puede contener letras"),
  inDireccionPersona: number().integer().required("La dirección es requerida"),
  inNumeroPersona: string()
    .required("El número es requerido")
    .matches(
      /^(0412|0424|0426|0416|0414)\d{7}$/,
      "Número de teléfono inválido"
    ),
  inTipoPersona: number().integer().required("El tipo es requerido"),
});

export const validateCreateperson = async ({ data }) => {
  try {
    const result = await schemaCreatePerson.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const schemaCreateProduct = object({
  inDescripcionProducto: string()
    .required("La descripción es requerida")
    .min(3, "La descripción debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "La descripción solo puede contener letras"),
});

export const validateCreateProduct = async ({ data }) => {
  try {
    const result = await schemaCreateProduct.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

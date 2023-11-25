import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";

import trash from "../icons/basura.svg";
import pencil from "../icons/lapiz.svg";
import eye from "../icons/ojo.svg";
import folder from "../icons/folderOriginal.svg";

import getMethod from "../service/getMethod";
import DefaultComponent from "./DefaultComponent";
import fetcho from "../service/fetcho";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/table.css";
import ColumnGroup from "antd/es/table/ColumnGroup";
import ModalSession from "./ModalSession";
//Importar css de la tabla

//!Componente el cual Renderiza en una tabla una consulta SQL y muestra cada registro
const ComponentTable = ({ data, customHeaders }) => {
  const [tableData, setTableData] = useState(data);
  const [headers, setHeaders] = useState([]);
  const [modifiedData, setModifiedData] = useState();
  const [confirmAction, setConfirmAction] = useState();
  const [successMessage, setSuccessMessage] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [actionAvailable, setActionAvalible] = useState([]);
  const [update, setUpdate] = useState(null);

  const { response, module, object, context } = tableData;

  if (!response || response.error) return <div>Cargando...</div>;

  console.log("Probando", response, module, object, context);
  useEffect(() => {
    const array = [];
    const actions = ["delete", "update"];
    for (let i = 0; i <= actions.length; i++) {
      const bool = getMethod({
        action: actions[i],
        context: context,
        module: module,
        object: object,
      });
      if (bool) array.push(actions[i]);
    }
    setActionAvalible(array);
  }, []);

  // Renderizar tabla cuando cambien los headers
  useEffect(() => {
    if (customHeaders && customHeaders.length > 0) {
      setHeaders(customHeaders);
    } else if (response.length > 0) {
      setHeaders(Object.keys(response[0]));
    }
  }, [customHeaders, data, tableData]);

  useEffect(() => {
    const fetchByFetcho = async () => {
      console.log("Paso a modificar la base de datos");
      console.log("Aqui modificando esto", modifiedData);
      try {
        if (!modifiedData || !isConfirm) return;

        const { id, module, object, action, context, updateData } =
          modifiedData;
        const method = getMethod({ module, object, action, context });

        const response = await fetcho({
          url: "/toProcess",
          method: "POST",
          body: {
            area: module,
            object: object,
            method: method,
            params: [id],
          },
        });

        if (response.error) {
          setTableData(tableData);
          return console.error("Hubo un error al hacer la consulta");
        }

        if(response?.errorSession) return <ModalSession />

        setTableData({
          response: action === "delete" ? updateData : update,
          module,
          object,
          context,
        });

        setIsConfirm(false);
        setSuccessMessage(true);
        return console.error(response);
      } catch (error) {
        console.error(
          `Hubo un error al hacer una consulta para modificar en el componente Table, ${error.message}`
        );
        return (
          <div>
            <DefaultComponent />
          </div>
        );
      }
    };

    if (isConfirm) {
      fetchByFetcho();
    }
  }, [isConfirm]);

  //!ESTO ESTA RARO SI TAL LO HARE PERO SI NO YA NO REDIRIGIRE NADA
  // Button para redirigir según los datos específicos que se encuentran en esta tabla
  const handleButtonView = (rowData) => {
    setConfirmAction(true);
  };

  const handleButtonEdit = (rowData) => {
    setEditingRow(rowData);
  };

  const handleButtonDelete = (rowData) => {
    setConfirmAction(true);

    const { id } = rowData;
    // Eliminar el elemento de tableData
    const updateData = response.filter((row) => row !== rowData);
    setModifiedData({
      id,
      module,
      object,
      action: "delete",
      context,
      updateData,
    });
  };

  const handleConfirmAction = () => {
    setConfirmAction(false);
    //Cuando le damos aceptar ocultamos el modal y hacemos true la confirmacion

    setIsConfirm(true);
  };

  const handleSaveChanges = (rowData) => {
    setConfirmAction(true);

    const { id } = rowData;
    const updateData = response.find((row) => row.id === id);
    setModifiedData({
      id,
      module,
      object,
      action: "update",
      context,
      updateData,
    });

    // Restablecer la fila de edición a null
    setEditingRow(null);
  };

  const handleInputChange = (e, rowIndex, columnName) => {
    const { value } = e.target;

    // Crear una copia de la respuesta actual
    const updatedResponse = [...response];

    // Actualizar el valor del campo modificado
    updatedResponse[rowIndex][columnName] = value;

    setUpdate(updatedResponse);
    // Actualizar el estado de la tabla
    // setTableData({ response: updatedResponse, module, object, context });
  };

  return (
    <>
      <Table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header) =>
              header === "id" ? null : <th key={header}>{header}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {response.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {editingRow === row ? (
                // Campos de edición
                <>
                  {Object.entries(row).map(([key, value], columnIndex) =>
                    key === "id" ? null : (
                      <td key={columnIndex}>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleInputChange(e, rowIndex, key)}
                        />
                      </td>
                    )
                  )}
                </>
              ) : (
                // Campos normales
                <>
                  {Object.entries(row).map(([key, value], columnIndex) =>
                    key === "id" ? null : <td key={columnIndex}>{value}</td>
                  )}
                </>
              )}
              <td>
                <div className="d-flex flex-column flex-sm-row">
                  {/* Botón de guardar cambios */}
                  {editingRow === row ? (
                    <Button
                      className="icon-button p-2 m-1 p-sm-0"
                      variant="link"
                      onClick={() => handleSaveChanges(row)}
                    >
                      <img
                        src={folder}
                        alt="Icon save"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="icon-button p-2 m-1 p-sm-0"
                        variant="link"
                        onClick={() => handleButtonView(row)}
                      >
                        <img
                          src={eye}
                          alt="Icon eye"
                          style={{ width: "16px", height: "16px" }}
                        />
                      </Button>

                      {actionAvailable.includes("update") && (
                        <Button
                          className="icon-button p-2 m-1 p-sm-0"
                          variant="link"
                          onClick={() => handleButtonEdit(row)}
                        >
                          <img
                            src={pencil}
                            alt="Icon pencil"
                            style={{ width: "16px", height: "16px" }}
                          />
                        </Button>
                      )}
                      {actionAvailable.includes("delete") && (
                        <Button
                          className="icon-button p-2 m-1 p-sm-0"
                          variant="link"
                          onClick={() => handleButtonDelete(row)}
                        >
                          <img
                            src={trash}
                            alt="Icon trash "
                            style={{ width: "16px", height: "16px" }}
                          />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal para confirmar la accion */}
      {confirmAction && (
        <Modal show={confirmAction} onHide={() => setConfirmAction(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirma tu accion</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estás seguro de que deseas hacerlo?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setConfirmAction(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirmAction}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* Modal de que todo fue exitosos */}
      {successMessage && (
        <Modal show={successMessage} onHide={() => setSuccessMessage(false)}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Acción completada</Modal.Title>
          </Modal.Header>
          <Modal.Body>Todo se ha realizado correctamente.</Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ComponentTable;

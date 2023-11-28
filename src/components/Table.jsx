import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";

import trash from "../icons/basura.svg";
import pencil from "../icons/lapiz.svg";
import eye from "../icons/ojo.svg";
import folder from "../icons/folderOriginal.svg";

import getMethod from "../service/getMethod";
import DefaultComponent from "./DefaultComponent";
import fetcho from "../service/fetcho";

import "../styles/table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnGroup from "antd/es/table/ColumnGroup";
import ModalSession from "./ModalSession";
//Importar css de la tabla

//!Componente el cual Renderiza en una tabla una consulta SQL y muestra cada registro
const Componenttable = ({ data, customHeaders }) => {
  const [tableData, settableData] = useState(data);
  const [headers, setHeaders] = useState([]);
  const [modifiedData, setModifiedData] = useState(null);
  const [confirmAction, setConfirmAction] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [actionAvailable, setActionAvailable] = useState([]);
  const [update, setUpdate] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const { response, module, object, context } = tableData;

  if (!response || response.error) return <div>Cargando...</div>;

  useEffect(() => {
    const array = [];
    const actions = ["delete", "update"];
    for (let i = 0; i < actions.length; i++) {
      const bool = getMethod({
        action: actions[i],
        context: context,
        module: module,
        object: object,
      });
      if (bool) array.push(actions[i]);
    }
    setActionAvailable(array);
  }, []);

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
          settableData(tableData);
          return console.error("Hubo un error al hacer la consulta");
        }

        if (response?.errorSession) return <ModalSession />;

        settableData({
          response: action === "delete" ? updateData : update,
          module,
          object,
          context,
        });

        setIsConfirm(false);
        setSuccessMessage(true);
        console.log(response);
      } catch (error) {
        console.error(
          `Hubo un error al hacer una consulta para modificar en el componente table, ${error.message}`
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

  const handleButtonView = (rowData) => {
    setConfirmAction(true);
  };

  const handleButtonEdit = (rowData) => {
    const data = tableData["response"].find((obj) => obj.id === rowData.id);
    setOriginalData(data);
    setEditingRow(rowData);
  };

  const handleCancelEdit = () => {
    if (originalData) {
      console.log("Paso aqui", tableData);
      console.log("Data origianl ", originalData);
      const newData = [...tableData["response"]];
      console.log("Aquii esta la nueva data", newData);
      newData[editingRow] = originalData;

      console.log("Aqui extrayendo info con la fila", newData[editingRow]);
      settableData(newData);
      setOriginalData(null);
    }
    setEditingRow(null);
  };

  const handleButtonDelete = (rowData) => {
    setConfirmAction(true);

    const { id } = rowData;
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
    setIsConfirm(true);
  };

  const handleSaveChanges = (rowData) => {
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

    originalData(null);
    setEditingRow(null);
  };

  const handleInputChange = (e, rowIndex, columnName) => {
    const { value } = e.target;

    const updatedResponse = [...response];
    updatedResponse[rowIndex][columnName] = value;

    setUpdate(updatedResponse);
  };

  return (
    <>
        <div>Imprimir</div>
      <table className="table table-responsive  table-hover ">
        <thead className="table-danger">
          <tr className="main-tr">
            {headers.map((header) =>
              header === "id" ? null : <th key={header}>{header.toUpperCase()}</th>
            )}
            <th>ACTIONS</th>
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
                    <>
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
                      <Button
                        className="icon-button p-2 m-1 p-sm-0"
                        variant="link"
                        onClick={() => handleCancelEdit()}
                      >
                        <img
                          src={"./hola"}
                          alt="Icon cancel"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Button>
                    </>
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
      </table>
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

export default Componenttable;

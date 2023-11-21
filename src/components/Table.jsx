import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap'
import trash from '../icons/basura.svg'
import pencil from '../icons/lapiz.svg'
import eye from '../icons/ojo.svg'
import '../styles/table.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//Importar css de la tabla

//!Componente el cual Renderiza en una tabla una consulta SQL y muestra cada registro
const ComponentTable = ({ data, customHeaders }) => {
  const [tableData, setTableData] = useState(data);
  const [headers, setHeaders] = useState([]);

  // Renderizar tabla cuando cambien los datos
  useEffect(() => {
    if (!data) return;
    setTableData(data);
  }, [data]);

  // Renderizar tabla cuando cambien los headers
  useEffect(() => {
    if (customHeaders && customHeaders.length > 0) {
      setHeaders(customHeaders);
    } else if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
    }
  }, [customHeaders, data]);

  // Button para redirigir según los datos específicos que se encuentran en esta tabla
  const handleButtonClick = (rowData) => {
    console.log("Informacion de toda la fila:", rowData);
  };

  return (
    <Table className="table table-striped">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, columnIndex) => (
              <td key={columnIndex}>{value}</td>
            ))}
            <td>
              <div className="d-flex flex-column flex-sm-row">
                <Button className="icon-button p-2 m-1 p-sm-0" variant='link' onClick={() => handleButtonView(row)}>
                  <img src={eye} alt="Icon eye" style={{ width: '16px', height: '16px' }} />
                </Button>
                <Button className="icon-button p-2 m-1 p-sm-0" variant='link' onClick={() => handleButtonEdit(row)}>
                  <img src={pencil} alt="Icon pencil" style={{ width: '16px', height: '16px' }} />
                </Button>
                <Button className="icon-button p-2 m-1 p-sm-0" variant='link' onClick={() => handleButtonDelete(row)}>
                  <img src={trash} alt="Icon trash " style={{ width: '16px', height: '16px' }} />
                </Button>
              </div >
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ComponentTable;

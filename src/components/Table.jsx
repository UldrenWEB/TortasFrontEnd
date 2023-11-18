import React, { useState, useEffect } from "react";
//Importar css de la tabla

//!Componente el cual Renderiza en una tabla una consulta SQL y muestra cada registro
const Table = ({ data, customHeaders }) => {
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
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
          <th>Botones</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, columnIndex) => (
              <td key={columnIndex}>{value}</td>
            ))}
            <td>
              <button onClick={() => handleButtonClick(row)}>Botón</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

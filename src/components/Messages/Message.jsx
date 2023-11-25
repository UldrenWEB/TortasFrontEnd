import React from "react";
import "../../styles/message.css";

const MensajesComponent = ({ infoMessage }) => {
  const { fecha, imagen, contenido, usuario, isReceiving } = infoMessage;

  const hasImage = imagen && imagen.url;
  const hasDescription =
    imagen && imagen.descripcion && imagen.descripcion !== "image";

  return (
    <div className={`message-container ${isReceiving ? "received" : "sent"}`}>
      <div className="message-info">
        <p>Fecha: {fecha}</p>
        <p>{isReceiving ? "Recibiendo" : "Enviando"}</p>
        <p>to: {usuario}</p>
      </div>
      {hasImage && (
        <div className="message-content">
          <img src={imagen.url} alt="image" />
          {hasDescription && <p>{imagen.descripcion}</p>}
        </div>
      )}
      <p className="message-content">Contenido del mensaje: {contenido}</p>
    </div>
  );
};

export default MensajesComponent;

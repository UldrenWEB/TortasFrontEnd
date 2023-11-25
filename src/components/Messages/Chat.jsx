import React, { useState, useEffect } from "react";
import MensajesComponent from "./Message";
import iClient from "../../instances/iClientSocket";
import sendMessageByBeibi from "../../service/sendMessage";

import messageIcon from "../../icons/comentario-alt.svg";
import groupIcon from "../../icons/usuarios-alt.svg";
import twoIcon from "../../icons/usuarios.svg";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//El objeto de chats es aquel que tiene 3 propiedades si es de broadcast, room, direct
//objInfo = {socketEmit, byUser, sendToUser}
const Chat = ({
  messagesInitial,
  objChat,
  typeChat,
  objInfo,
  newMessage,
  newImage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [typeChatMessage, setTypeChatMessage] = useState("");

  const [renderedMessages, setRenderedMessages] = useState([]);
  const [icon, setIcon] = useState(null);

  const [showChat, setShowChat] = useState(false);

  const getChatIcon = (typeChatMessage) => {
    console.log('Aqui icon type', typeChatMessage)
    const icons = {
      direct: messageIcon,
      broadcast: groupIcon,
      zones: twoIcon,
    };

    const verify = icons[typeChatMessage];
    if (verify === "namespace") return icons["broadcast"];
    if (verify === "direct") return icons[typeChatMessage];
    if (objChat["zones"].includes(typeChatMessage)) return icons["zones"];
  };



  useEffect(() => {
    let keyCont = 0;

    if (!messagesInitial) return;

    // Mapear los mensajes iniciales a componentes de mensajes
    const messageComponents = messagesInitial.map((obj) => {
      keyCont++;
      return <MensajesComponent key={keyCont} infoMessage={obj} />;
    });
    setRenderedMessages(messageComponents);
  }, [messagesInitial]);

  useEffect(() => {
    if (!objChat) return null;

    if (
      typeof objChat[typeChat] === "string" ||
      objChat.zones.includes(typeChat)
    ) {
      setTypeChatMessage(typeChat);
      setIcon(getChatIcon(typeChat));

    } else {
      console.error("El tipo de chat es incorrecto. Por favor, verifique.");
    }
  }, [typeChat]);

  useEffect(() => {
    if (!newMessage) return null;

    const { message, image } = newMessage;
    if (message) {
      handleSendTextMessage(message);
    } else if (newImage) {
      handleSendImageMessage(message, image);
    }
  }, [newMessage, newImage]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendTextMessage = (message) => {
    const success = sendMessageByBeibi({
      socketEmit: objInfo.socketEmit,
      typeChatMessage: typeChatMessage,
      sendToUser: objInfo.sendToUser,
      inputValue: inputValue,
      objChat: objChat,
    });
    console.log('Heyyyyyyy')
    if (!success) {
      console.error("Hubo un error al enviar el mensaje");
      return;
    }

    const newMessage = {
      emisor: objInfo.byUser,
      usuario: objInfo.byUser,
      fecha: new Date().toLocaleString(),
      contenido: inputValue ? inputValue : message,
    };

    setInputValue("");
    setRenderedMessages((prevMessages) => [
      ...prevMessages,
      <MensajesComponent
        key={prevMessages.length + 1}
        infoMessage={newMessage}
      />,
    ]);
  };

  const handleSendImageMessage = (message, image) => {
    // Implementa la lógica para enviar una imagen aquí
    //Abrir un modal o una ventana de selección de archivos
    iClient.loadImage({
      socket: objInfo.socketEmit,
      file: fileSeleccionado ? fileSeleccionado : image,
      destination: typeChatMessage,
      message: inputValue ? inputValue : message,
    });
  };

  const toggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  return (
    <div>
      <Button
        className="icon-button p-2 m-1 p-sm-0"
        variant="link"
        onClick={toggleChat}
      >
        <img
          src={twoIcon}
          alt="Icon chat"
          style={{ width: "16px", height: "16px" }}
        />
      </Button>
      {showChat && (
        <div className="chat-container">
          <div className="messages-container">
            {/* Renderizar los mensajes */}
            {renderedMessages}
          </div>
          <div className="chat-input">
            <Button
              className="send-image-button"
              onClick={handleSendImageMessage}
            >
              Enviar Imagen
            </Button>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
            />
            <Button
              className="send-text-button"
              onClick={handleSendTextMessage}
            >
              Enviar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

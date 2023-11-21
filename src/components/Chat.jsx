import React, { useState, useEffect } from 'react';
import MensajesComponent from './Message';
import iClient from '../instances/iClientSocket';
import sendMessage from '../service/sendMessage';

import messageIcon from '../icons/comentario-alt.svg';
import groupIcon from '../icons/usuarios-alt.svg'
import twoIcon from '../icons/usuarios.svg'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let keyCont = 0;
const OBJ_CHAT = {
    zones: [''],
    direct: 'direct',
    broadcast: 'namespace'
}

//El objeto de chats es aquel que tiene 3 propiedades si es de broadcast, room, direct
//objInfo = {socketEmit, byUser, sendToUser}
const Chat = ({ messagesInitial, objChat, typeChat, objInfo }) => {
    const [icon, setIcon] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [typeChatMessage, setTypeChatMessage] = useState('');
    const [renderedMessage, setRenderedMessages] = useState([]);

    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        // Iterar sobre el arreglo de objetos
        const messageComponents = messagesInitial.map((obj) => {
            keyCont++;
            return (
                <MensajesComponent key={keyCont} infoMessage={obj} />
            );
        });
        setRenderedMessages(messageComponents);
    }, [messagesInitial]);

    useEffect(() => {

        if (typeof objChat[typeChat] === 'string' || objChat['zones'].includes(typeChat)) {
            setTypeChatMessage(typeChat);
            getChatIcon(typeChat)
        } else {
            console.error('El tipo de chat es incorrecto por favor verifique')
        }


    }, [typeChat])

    const getChatIcon = (typeChatMessage) => {
        const obj = {
            direct: setIcon(messageIcon),
            broadcast: setIcon(groupIcon),
            zones: setIcon(twoIcon)
        }
        const verify = obj[typeChatMessage]
        if (verify === 'namespace') return obj['broadcast']
        if (verify === 'direct') return obj[typeChatMessage]
        if (objChat['zones'].includes(typeChatMessage)) return obj['zones']

        return obj[typeChatMessage]
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendTextMessage = () => {

        const bool = sendMessage({
            socketEmit: objInfo['socketEmit'],
            typeChatMessage: typeChatMessage,
            sendToUser: objInfo['sendToUser'],
            inputValue: inputValue,
            objChat: objChat
        })

        if (!bool) return console.error('Hubo un error al enviar un mensaje')

        const newMessage = {
            emisor: objInfo['byUser'],
            usuario: objInfo['byUser'],
            fecha: new Date().toLocaleString(),
            contenido: inputValue,
        };

        keyCont++;
        const message = <MensajesComponent key={keyCont} infoMessage={newMessage} />
        setRenderedMessages([...renderedMessage, message]);
        setInputValue('');
    }

    const handleSendImageMessage = () => {
        // Aquí se puede implementar la lógica para enviar una imagen
        // por ejemplo, abrir un modal o una ventana de selección de archivos
        iClient.loadImage({
            socket: objInfo['socketEmit'],
            file: fileSeleccionado,
            destination: typeChatMessage,
            message: inputValue
        })
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };
    return (
        <div>
            <Button className="icon-button p-2 m-1 p-sm-0" variant='link' onClick={toggleChat}>
                <img src={icon} alt="Icon chat" style={{ width: '16px', height: '16px' }} />
            </Button>
            {showChat && <div className="chat-container">
                <div className="messages-container">
                    {/* Renderizar los mensajes */}
                    {renderedMessage.map((Message, index) => {
                        return (Message)
                    })}
                </div>
                <div className="chat-input">
                    <Button className="send-image-button" onClick={handleSendImageMessage}>
                        Enviar Imagen
                    </Button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Escribe tu mensaje..."
                    />
                    <Button className="send-text-button" onClick={handleSendTextMessage}>
                        Enviar
                    </Button>
                </div>
            </div>}
        </div>

    );
};


export default Chat;







import { useEffect, useState } from "react";
import iClient from "../../instances/iClientSocket";
import Chat from "./Chat";
import fetcho from "../../service/fetcho";

const mensajes = [
    {
        fecha: "8/17/2023",
        usuario: "Uldren",
        emisor: "Uldren",
        contenido: "Hola como estan",
        receptor: "Sol",
    },
    {
        fecha: "9/17/2023",
        usuario: "Uldren",
        emisor: "Hermana",
        contenido: "Hola como estas Uldren",
        receptor: "Uldren",
    },
    {
        fecha: "10/17/2023",
        usuario: "Uldren",
        emisor: "Mama",
        contenido: "Hola como estas Uldren",
        receptor: "Uldren",
    },
    {
        fecha: "11/17/2023",
        usuario: "Uldren",
        emisor: "Novia",
        contenido: "Hola como estas Uldren",
        receptor: "Uldren",
    },
    {
        fecha: "12/17/2023",
        usuario: "Uldren",
        emisor: "Papa",
        contenido: "Hola como estas Uldren",
        receptor: "Uldren",
    },
];

const FinalChat = ({ userData, typeChat }) => {
    const [chatMessages, setChatMessages] = useState(null);
    const [objChat, setObjChat] = useState({});
    const [objInfo, setObjInfo] = useState({});
    const [socket, setSocket] = useState(false);
    const [typeEvent, setTypeEvent] = useState("");
    const [messageReceived, setMessageReceived] = useState();


    useEffect(() => {
        if (!userData) return console.error("User data es undefinded");
        console.log("Entra en carga mensajes");
        const { user, profile } = userData;
        const loadChatMessages = async () => {
            try {
                const messages = await fetcho({
                    url: "/toProcess",
                    method: "POST",
                    body: {
                        area: "messanger",
                        object: "control",
                        method: "getMessageBy",
                        params: ["typeanduser", typeChat, user],
                    },
                });
                if (!messages || messages.error)
                    return console.error(`Hubo un error obtener los mensajes del usuario`);

                setChatMessages(mensajes);
            } catch (error) {
                console.error("Error al cargar los mensajes del chat:", error);
                return null;
            }
        };

        const loadRooms = async () => {
            console.log("Entro en cargar rooms");
            try {
                const rooms = await fetcho({
                    url: "/toProcess",
                    method: "POST",
                    body: {
                        area: "local",
                        object: "control",
                        method: "getAllOf",
                        params: ["route"],
                    },
                });

                if (!rooms || rooms.error)
                    return console.error("Hubo un error al intentar obtener las rutas");
                let array = [];
                rooms.forEach((obj) => {
                    array.push(obj["de_route"]);
                });

                console.log("Aqui array de rutas (rooms)", array);
                const obj = {
                    zones: ["el prado", "prolongacion", "sur"],
                    direct: "direct",
                    broadcast: "namespace",
                };

                setObjChat(obj);
            } catch (error) {
                console.error("Error al cargar los rooms", error);
                return null;
            }
        };
        const loadSocketClient = async () => {
            console.log("Entra en crear socket client");
            try {
                const socketClient = iClient.createSocketClient({
                    objUser: userData,
                });

                if (!socketClient)
                    return console.error("Huno un error al crear el socket del client");
                const route = await fetcho({
                    url: "/toProcess",
                    method: "POST",
                    body: {
                        area: "local",
                        object: "control",
                        method: "getRouteBy",
                        params: {
                            option: "user",
                            params: [user],
                        },
                    },
                });
                const joinNamespace = iClient.joinNamespace(socketClient);
                const joinRoom = iClient.joinRoom(socketClient, "sur");

                if (
                    !joinNamespace ||
                    joinNamespace.error ||
                    joinRoom.error ||
                    !joinRoom
                )
                    return console.error(
                        "Hubo un error al unirse al nameSpace o al room"
                    );

                const obj = {
                    socketEmit: socketClient,
                    byUser: user,
                };

                setObjInfo(obj);
                setSocket(socketClient);
            } catch (error) {
                console.error("Hubo un error al crear el socket del client", error);
            }
        };
        loadChatMessages();
        loadRooms();
        loadSocketClient();
    }, []);

    useEffect(() => {
        //?Eventos listeners
        if (!objChat) return;

        if (objChat[typeChat] === "direct") return setTypeEvent("direct message");
        if (objChat[typeChat] === "namespace")
            return setTypeEvent("broadcast message");
        if (objChat["zones"]?.includes(typeChat))
            return setTypeEvent("room message");

        return console.error("Tipo de chat invalido");
    }, [objChat]);

    const validateImage = (data) => {
        const { file, typeFile } = data;
        if (typeFile === "image") {
            console.log("Es una imagen");
            const imgTag = `<img src="${file}">`;
            return imgTag;
        } else if (typeFile === "voice") {
            console.log("Es un audio");
            //Manejo de audio
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (socket) {
            console.log("Aqui el evento segun el tipo de chat", typeEvent);
            socket.on(typeEvent, (data) => {
                const { message } = data;
                const isImg = validateImage(data);
                if (isImg) return setMessageReceived({ message, image: isImg });

                console.log(`Mesaje recibido`, data);

                setMessageReceived({ message });
            });
        }

        // Limpiar el listener al desmontar el componente
        return () => {
            if (socket) {
                socket.off(typeEvent);
            }
        };
    }, [socket]);

    return (
        <div>
            {!chatMessages ||
                !typeChat ||
                !objChat ||
                !objInfo ||
                !messageReceived ? (
                <h1>Cargando...</h1>
            ) : (
                <Chat
                    typeChat={typeChat}
                    messagesInitial={chatMessages}
                    objChat={objChat}
                    objInfo={objInfo}
                    newMessage={messageReceived}
                />
            )}
        </div>
    );
};

export default FinalChat;

import { useEffect, useState } from "react";
import iClient from "../../instances/iClientSocket";
import Chat from "./Chat";
import fetcho from "../../service/fetcho";



const FinalChat = ({ userData, typeChat }) => {
    const [chatMessages, setChatMessages] = useState(null);
    const [objChat, setObjChat] = useState();
    const [objInfo, setObjInfo] = useState({});
    const [socket, setSocket] = useState(false);
    const [typeEvent, setTypeEvent] = useState("");
    const [messageReceived, setMessageReceived] = useState();


    useEffect(() => {
        if (!userData) return console.error("User data es undefinded");
        const { user, profile } = userData;
        const loadChatMessages = async () => {
            try {
                // const messages = await fetcho({
                //     url: "/toProcess",
                //     method: "POST",
                //     body: {
                //         area: "messanger",
                //         object: "control",
                //         method: "getMessageBy",
                //         params: ["typeanduser", typeChat, user],
                //     },
                // });
                // if (!messages || messages.error)
                //     return console.error(`Hubo un error obtener los mensajes del usuario`, messages.error);

                setChatMessages(mensajes);
            } catch (error) {
                console.error("Error al cargar los mensajes del chat:", error);
                return null;
            }
        };

        const loadRooms = async () => {
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
                    return console.error("Hubo un error al intentar obtener las rutas", rooms.error);
                let array = [];
                rooms.forEach((obj) => {
                    array.push(obj["de_route"]);
                });
                const obj = {
                    direct: 'direct',
                    broadcast: 'namespace',
                    zones: array
                }

                setObjChat(obj);
            } catch (error) {
                console.error("Error al cargar los rooms", error);
                return null;
            }
        };
        const loadSocketClient = async () => {
            try {
                const socketClient = iClient.createSocketClient({
                    objUser: userData,
                });

                if (!socketClient)
                    return console.error("Hubo un error al crear el socket del client");
                // const route = await fetcho({
                //     url: "/toProcess",
                //     method: "POST",
                //     body: {
                //         area: "local",
                //         object: "control",
                //         method: "getRouteBy",
                //         params: {
                //             option: "user",
                //             params: [user],
                //         },
                //     },
                // });

                // if (!route || route.error) {
                //     return console.error('Hubo un error al intentar obtener la ruta del usuario', route.error)
                // }

                // console.log('Esta es la ruta a la que se va a unir ese usuario', route)
                const joinNamespace = iClient.joinNamespace(socketClient);
                const joinRoom = iClient.joinRoom(socketClient, 'el prado');

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
                return;
            }
        };
        loadChatMessages();
        loadRooms();
        loadSocketClient();
    }, []);

    useEffect(() => {
        //?  Eventos listeners
        if (!objChat) return;

        console.log('Aqui el object Chat para eligir el evento a escuchar', objChat)
        if (objChat[typeChat] === "direct") return setTypeEvent("direct_message");

        if (objChat[typeChat] === "namespace")
            return setTypeEvent("broadcast_message");

        if (objChat["zones"]?.includes(typeChat))
            return setTypeEvent("room_message");

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
        if (!socket) return;

        console.log("Aqui el evento segun el tipo de chat es ->: ", typeEvent);
        socket.on(typeEvent, (data) => {
            console.log(`Mesaje recibido`, data);
            const { message } = data;
            const isImg = validateImage(data);
            if (isImg) return setMessageReceived({ message, image: isImg });


            setMessageReceived({ message });
        });

        // Limpiar el listener al desmontar el componente
        return () => {
            if (socket) {
                socket.off(typeEvent);
            }
        };
    }, [socket]);

    return (
        <div>
            <Chat
                typeChat={typeChat}
                messagesInitial={chatMessages}
                objChat={objChat}
                objInfo={objInfo}
                newMessage={messageReceived}
            />
        </div>
    );
};

export default FinalChat;

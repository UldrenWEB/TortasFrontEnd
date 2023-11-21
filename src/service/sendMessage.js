import iClient from "../instances/iClientSocket";

const sendMessage = ({
  socketEmit,
  typeChatMessage,
  inputValue,
  sendToUser,
  objChat,
}) => {
  if (inputValue.trim() !== "") {
    // if (typeChatMessage === "direct") {
    //   const send = iClient.sendDirectMessage({
    //     socketEmit: socketEmit,
    //     user: sendToUser,
    //     message: inputValue,
    //   });
    //   if (!send) {
    //     return false;
    //   }
    // }

    // if (objChat[typeChatMessage] === "namespace") {
    //   const send = iClient.sendMessageBroadcast({
    //     socket: socketEmit,
    //     message: inputValue,
    //   });

    //   if (!send) {
    //     return false;
    //   }
    // }

    if (objChat["zones"].includes(typeChatMessage)) {
      // const send = iClient.sendMessage({
      //   socketEmit: socketEmit,
      //   room: typeChatMessage,
      //   message: inputValue,
      // });

      const send = socketEmit.emit('message zone', { socketEmit, room : 'el prado', message: inputValue, })

      if (!send || send.error) {
        console.log("No se envio el mensaje");
        return false;
      }
      return true;
    }

    return true;
  }

  return false;
};

export default sendMessage;

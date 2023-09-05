import Message from "../models/Message.js";

export async function getMessages(idUser) {
  return await Message.find({
    idUser: idUser
  });
}

export async function setMessages(message, idUser) {
  const newMessage = new Message({
    message: message,
    idUser: idUser
  });

  await newMessage.save();
}
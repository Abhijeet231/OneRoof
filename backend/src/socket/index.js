import Chat from "../models/chat.model.js";
import ChatMessage from "../models/chatMessage.model.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("New Client connected", socket.id);

    //Join a chat room
    socket.on("joinChat", (chatId) => {
      try {
        socket.join(chatId);
        console.log(`User with socket ID: ${socket.id} joined chat: ${chatId}`);
      } catch (error) {
        console.error(error);
      }
    });

    //Send message event
    socket.on("sendMessage", async ({ chatId, senderId, content }) => {
      try {
        const newMsg = await ChatMessage.create({
          sender: senderId,
          content,
          chat: chatId,
        });

        await Chat.findByIdAndUpdate(chatId, { lastMessage: newMsg._id });

        const populatedMsg = await newMsg.populate("sender", "userName email");

        //Send message to all users in the chat room
        io.to(chatId).emit("newMessage", populatedMsg);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};


export default socketHandler;
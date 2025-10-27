import { useEffect, useState, useRef } from "react"
import socket from "@/components/socket/socket.js"
import { useAuth } from "../provider/AuthProvider"


const Chat = () => {

    const {currentUser} = useAuth();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const chatId = 23123;
    const currentUserId = currentUser._id;

    const messagesEndRef = useRef(null);

    useEffect(() => {
        //Join chat room when component mounts
        socket.emit("joinChat", chatId);

        //Listen for new messages
        socket.on('newMessage', (newMsg) => {
            setMessages((prev) => [...prev, newMsg]);
        });

        //Cleanup listner
        return () => {
            socket.off('newMessage');
        };

    }, [chatId]);

    useEffect(() => {
        //Auto Scroll to bottom
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

   
    const sendMessage = () => {
        if(!message.trim()) return;

        socket.emit("sendMessage", {
            chatId,
            sender: currentUserId,
            content: message,
        });
        setMessage("")
    }



  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex items-center shadow">
        <h2 className="text-xl font-semibold">Chat Room</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            No messages yet. Say hello 👋
          </p>
        )}

        {messages.map((msg, i) => {
          const isSender = msg.sender?._id === currentUserId;
          return (
            <div
              key={i}
              className={`flex ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-2xl text-sm ${
                  isSender
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="font-medium text-xs mb-1">
                  {isSender ? "You" : msg.sender?.userName || "User"}
                </p>
                <p>{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 flex items-center bg-gray-100">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
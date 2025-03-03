import React, { useEffect, useState } from "react";
import {
  ArrowTrendingDownIcon,
  BookOpenIcon,
  CogIcon,
  PaperClipIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [myChats, setMyChats] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    loadUserChats();
  }, [navigate]);

  useEffect(() => {
    setChatData(myChats.find((chat) => chat.id === currentChat));
  }, [currentChat]);

  const loadUserChats = () => {
    const chats = JSON.parse(localStorage.getItem("chats")) || [];
    setMyChats(chats.filter((chat) => chat.username === username));
  };
  
  const handleChat = async (e) => {
    e.preventDefault();
    if (isSending || !message.trim()) return;

    setIsSending(true);
    const newMessage = message.trim();
    setMessage("");

    let chatId = currentChat;
    let existingChats = JSON.parse(localStorage.getItem("chats")) || [];
    let chatEntry;

    if (!chatId) {
      chatId = uuidv4();
      setCurrentChat(chatId);
      chatEntry = { id: chatId, interactions: [],pdf:file.name, username, date: new Date() };
      existingChats.push(chatEntry);
    } else {
      chatEntry = existingChats.find((chat) => chat.id === chatId);
    }

    const interactionId = uuidv4();
    chatEntry.interactions.push({
      id: interactionId,
      user: newMessage,
      assistant: null,
      isPending: true,
    });

    localStorage.setItem("chats", JSON.stringify(existingChats));
    setChatData({ ...chatEntry });
    try {
      const resp = await axios.post(
        "/chat/test-azure/",
        { search_query: newMessage,pdf_name:file.name, conversation_history:chatEntry.interactions },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      );

      const updatedChats = JSON.parse(localStorage.getItem("chats")) || [];
      const updatedChat = updatedChats.find((chat) => chat.id === chatId);
      const interaction = updatedChat.interactions.find(
        (i) => i.id === interactionId
      );

      if (interaction) {
        interaction.assistant = resp.data.response.message;
        interaction.isPending = false;
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        setChatData({ ...updatedChat });
      }
    } catch (error) {
      const updatedChats = JSON.parse(localStorage.getItem("chats")) || [];
      const updatedChat = updatedChats.find((chat) => chat.id === chatId);
      updatedChat.interactions = updatedChat.interactions.filter(
        (i) => i.id !== interactionId
      );
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      setChatData({ ...updatedChat });
      console.error("API call failed:", error);
    } finally {
      setIsSending(false);
    }
  };
  const handleNewChat = async() => {
    setCurrentChat(null);
    setChatData(null);
  };
  const handleFileUpload = async(file) => {
    setFile(file)
    const resp=await axios.post("/chat/file-upload/",{file},{headers:{Authorization:`Token ${localStorage.getItem("token")}`,"Content-Type":"multipart/form-data"}});
    console.log(resp.data);
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-200">
        <div className="flex justify-between items-center w-full mb-2">
          <h2 className="text-xl font-semibold mb-4">Search History</h2>
          <button
            className="flex items-center py-2 px-4 text-sm bg-orange text-white rounded  transition"
            onClick={handleNewChat}
          >
            <PencilSquareIcon />
            <span className="ml-2">New Chat</span>
          </button>
        </div>
        {myChats.map((chat) => (
          <div
            key={chat.id}
            className={`mb-4 p-4 bg-blue-100 rounded-lg shadow-sm cursor-pointer hover:bg-blue-50 ${
              chat.id === currentChat ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setCurrentChat(chat.id)}
          >
            <h3 className="font-semibold text-gray-700">
              {chat.date.toString().split("T")[0]}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {chat.interactions[0]?.user || "New chat"}
            </p>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">{username}</span>
            <CogIcon className="h-6 w-6 cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {!currentChat ? (
            <div className="flex items-center justify-center h-full">
              <label className="flex flex-col items-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                <PaperClipIcon className="h-12 w-12 text-gray-500 mb-4" />
                <span className="text-gray-700 font-medium">
                  Upload a file to start a new chat
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </label>
            </div>
          ) : (
            chatData?.interactions.map((interaction) => (
              <div key={interaction.id} className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-orange text-white rounded-lg p-3 max-w-3xl shadow-md">
                    {interaction.user}
                  </div>
                </div>

                {/* Assistant Response */}
                {interaction.assistant ? (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-3xl shadow-md text-gray-800">
                      {interaction.assistant}
                    </div>
                  </div>
                ) : interaction.isPending ? (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-3xl shadow-md">
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleChat(e)}
            />
            <button
              className={`px-6 py-3 rounded-lg font-medium disabled:cursor-not-allowed ${
                isSending
                  ? "bg-orange cursor-not-allowed"
                  : "bg-orange hover:bg-orange"
              } text-white transition-colors`}
              onClick={handleChat}
              disabled={isSending || (!file)}
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
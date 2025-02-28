import React, { useEffect, useState } from "react";
import { CogIcon, PaperClipIcon } from "@heroicons/react/20/solid"; // Import Heroicons paperclip icon
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ChatScreen = () => {
  const [message, setMessage] = useState(""); // Create a state for message
  const [file, setFile] = useState(null); // Create a state for file
  const navigate = useNavigate();
  const handleMessage = (e) => setMessage(e.target.value); // Create a function to handle message change
  const handleFile = (e) => setFile(e.target.files[0]); // Create a function to handle file upload
  const username = localStorage.getItem("username");
  const [currentChat, setCurrentChat] = useState(null);
  const [chatData,setChatData]=useState(null)
  // const loadUserChats = () => {
  //   const chats = localStorage.getItem("chats");
  //   const userChats = JSON.parse(chats)?.filter(
  //     (chat) => chat.username === username
  //   );
  //   setMyChats(userChats);
  // };
  // useEffect(() => {
  //   loadUserChats();
  // }, []);
  const handleChat = async (e) => {
    e.preventDefault();
    if (!currentChat) {
      const existingChats = JSON.parse(localStorage.getItem("chats")) || [];
      const chatId = uuidv4();
      setCurrentChat(chatId); // This is async - use chatId for immediate reference
      
      // Create new chat structure
      const newChat = { 
        id: chatId, 
        interactions:[],
        username 
      };
      
      // Update local storage immediately
      const updatedChats = [...existingChats, newChat];
      localStorage.setItem("chats", JSON.stringify(updatedChats));
  
      try {
        // Send request to backend
        const resp = await axios.post(
          "/chat/test-azure/",
          { search_query: message },
          { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
        );
  
        // Get fresh copy of chats from localStorage
        const latestChats = JSON.parse(localStorage.getItem("chats")) || [];
        const currentChatEntry = latestChats.find(chat => chat.id === chatId);
  
        if (currentChatEntry) {
          // Update message order: user first, then assistant
          // currentChatEntry.user.push(message);
          currentChatEntry.interactions.push({user:message,assistant:resp.data.response.message});
          localStorage.setItem("chats", JSON.stringify(latestChats));
        } else {
          console.error("New chat not found in localStorage");
          // Optional: Handle missing chat scenario
        }
      } catch (error) {
        console.error("API call failed:", error);
        // Optional: Clean up failed chat creation
        const filteredChats = existingChats.filter(chat => chat.id !== chatId);
        localStorage.setItem("chats", JSON.stringify(filteredChats));
        // setCurrentChat(null);
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
  }, [navigate]);
  useEffect(()=>{
    setChatData(JSON.parse(localStorage.getItem('chats'))?.find(chat=>chat.id=currentChat))
  },[currentChat])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Search History</h2>
        <div className="mb-4 p-4 bg-blue-200 rounded shadow">
          <h3 className="font-semibold">Chat 1</h3>
          <p>Content of Chat 1</p>
        </div>
        <div className="mb-4 p-4 bg-blue-200 rounded shadow">
          <h3 className="font-semibold">Chat 2</h3>
          <p>Content of Chat 2</p>
        </div>
        <div className="mb-4 p-4 bg-blue-200 rounded shadow">
          <h3 className="font-semibold">Chat 3</h3>
          <p>Content of Chat 3</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="flex items-center justify-between bg-gray-800 text-white p-4">
          <h1 className="text-2xl">Chat Application</h1>
          <div className="flex items-center space-x-4">
            <span>{username}</span>
            <CogIcon className="h-6 w-6 cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            {
              chatData?.interactions.map((chat)=>(
                <div>
                  <div>{chat?.user}</div>
                  <div>{chat.assistant}</div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded mb-2"
              value={message}
              onChange={handleMessage}
            />
            <label className="cursor-pointer">
              <PaperClipIcon className="h-6 w-6 text-gray-500" />
              <input type="file" className="hidden" onChange={handleFile} />
            </label>
            <button
              className="bg-orange text-white px-6 py-2 rounded"
              onClick={handleChat}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;

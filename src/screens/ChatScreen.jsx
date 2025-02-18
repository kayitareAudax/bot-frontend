import React, { useState } from 'react';
import { CogIcon, PaperClipIcon } from '@heroicons/react/20/solid'; // Import Heroicons paperclip icon

const ChatScreen = () => {
  const [message, setMessage] = useState(''); // Create a state for message
  const [file, setFile] = useState(null); // Create a state for file

  const handleMessage = (e) => setMessage(e.target.value); // Create a function to handle message change
  const handleFile = (e) => setFile(e.target.files[0]); // Create a function to handle file upload

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Search History</h2>
        <div className="mb-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Chat 1</h3>
          <p>Content of Chat 1</p>
        </div>
        <div className="mb-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Chat 2</h3>
          <p>Content of Chat 2</p>
        </div>
        <div className="mb-4 p-4 bg-gray-100 rounded shadow">
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
            <span>Username</span>
            <CogIcon className="h-6 w-6 cursor-pointer" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="bg-gray-200 p-2 rounded">Hello, how can I help you?</div>
          </div>
        </div>

        {/* Input Area */}
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
            <button className="bg-orange text-white px-6 py-2 rounded">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { useChat } from "../hooks/useChat";

const Dashboard = () => {

  const chat = useChat();

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  const [chatInput, setChatInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);


  useEffect(() => {
    chat.initializeSocketConnection();
    chat.getChatsHandler();
  }, []);


  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const trimmedMessage = chatInput.trim();

    if (!trimmedMessage) return;

    chat.sendMessageHandler({
      message: trimmedMessage,
      chatId: currentChatId,
    });

    setChatInput("");
  };


  const openChat = (chatId) => {
    chat.handleOpenChat(chatId);
    setShowSidebar(false); // mobile sidebar auto close
  };


  return (
    <main className="h-screen w-full flex bg-neutral-800 text-white overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`
        fixed md:relative
        z-40
        h-full
        w-72 md:w-1/4
        bg-neutral-900
        border-r border-neutral-700
        flex flex-col
        transform
        transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >

        <div className="p-4 border-b border-neutral-700 flex justify-between items-center">

          <h1 className="text-xl font-bold">ChatIo — AI Chat Assistant</h1>

          {/* Close button mobile */}
          <button
            className="md:hidden"
            onClick={() => setShowSidebar(false)}
          >
            ✕
          </button>

        </div>


        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {Object.values(chats || {}).map((chatItem) => (

            <button
              key={chatItem.id}
              onClick={() => openChat(chatItem.id)}
              className={`w-full p-3 rounded-lg text-left transition-colors
              ${
                currentChatId === chatItem.id
                  ? "bg-neutral-700 border border-neutral-500"
                  : "border border-neutral-600 hover:bg-neutral-800"
              }`}
            >

              <ReactMarkdown>
                {chatItem.title || "Untitled Chat"}
              </ReactMarkdown>

            </button>

          ))}

        </div>

      </aside>


      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">

        {/* Mobile header */}
        <div className="md:hidden p-4 border-b border-neutral-700 flex items-center gap-4">

          <button onClick={() => setShowSidebar(true)}>
            ☰
          </button>

          <h2 className="font-semibold">Chat-Io</h2>

        </div>


        {/* Messages */}
        <div
          className="
          flex-1
          overflow-y-auto
          p-4 md:p-6
          space-y-4
          scroll-smooth
        "
        >

          {(chats[currentChatId]?.messages || []).map((msg, index) => (

            <div
              key={index}
              className={`flex flex-col ${
                msg.role === "user"
                  ? "items-end"
                  : "items-start"
              }`}
            >

              <div
                className={`
                max-w-[85%] md:max-w-lg
                px-4 py-3
                rounded-lg
                ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-neutral-700 text-gray-100 rounded-bl-none"
                }
              `}
              >

                <span className="text-xs opacity-75 capitalize block mb-1">
                  {msg.role}
                </span>


                {msg.role === "user" ? (

                  <p className="text-sm whitespace-pre-wrap">
                    {msg.content}
                  </p>

                ) : (

                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>

                )}

              </div>

            </div>

          ))}

        </div>


        {/* Input */}
        <div className="p-4 md:p-6 bg-neutral-800 sticky bottom-0">

          <form
            onSubmit={handleSubmitMessage}
            className="flex gap-2 md:gap-4 w-full"
          >

            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="
              flex-1
              bg-neutral-700
              text-white
              placeholder-neutral-400
              rounded-lg
              px-4
              py-3
              text-base
              focus:outline-none
              focus:ring-2
              focus:ring-neutral-500
            "
            />


            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="
              px-4 md:px-6
              py-3
              bg-neutral-600
              hover:bg-neutral-500
              rounded-lg
              font-semibold
              transition-colors
              disabled:opacity-50
            "
            >
              Send
            </button>

          </form>

        </div>

      </div>

    </main>
  );
};

export default Dashboard;
// src/components/Chat.tsx

import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ChangeEvent,
} from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "";

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const assistantEls = container.querySelectorAll<HTMLElement>(".assistant-message");
    if (assistantEls.length > 0) {
      const last = assistantEls[assistantEls.length - 1];
      last.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: inputValue,
          conversation_id: conversationId,
        }),
      });
      const data = await response.json();

      const botMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, botMessage]);
      setConversationId(data.conversation_id);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Error: Could not get response from server.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => setIsOpen((open) => !open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {isOpen ? (
        <div className="flex flex-col bg-gray-900 border border-cyan-400/30 rounded-xl shadow-2xl w-[400px] h-[600px] overflow-hidden backdrop-blur-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 flex justify-between items-center border-b border-cyan-400/20">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-['Poppins'] text-cyan-300">
                MedHive AI
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {/* Clear messages */}
              <button
                onClick={() => setMessages([])}
                className="text-cyan-300 hover:text-cyan-200 transition-colors p-1 rounded-lg hover:bg-cyan-400/10"
                title="Clear messages"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              {/* Close chat */}
              <button
                onClick={toggleChat}
                className="text-cyan-300 hover:text-cyan-200 transition-colors p-1 rounded-lg hover:bg-cyan-400/10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/80 to-gray-900/20 font-medium"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="p-3 rounded-full bg-cyan-400/10 border border-cyan-400/30">
                  <svg
                    className="w-10 h-10 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-['Poppins'] text-gray-100">
                  MedHive Assistant
                </h2>
                <p className="text-gray-400 font-['Poppins']">
                  Ask me about medical information, symptoms, or health advice
                </p>
              </div>
            )}

            {messages.map((message, i) => (
              <div
                key={i}
                className={`relative max-w-[85%] p-4 rounded-xl transition-all ${
                  message.role === "user"
                    ? "ml-auto bg-gradient-to-br from-cyan-600/70 to-cyan-500/70 text-white shadow-cyan-lg font-['Poppins']"
                    : message.role === "system"
                    ? "mx-auto bg-red-500/10 border border-red-400/30 text-red-300"
                    : "mr-auto bg-gray-800/60 border border-gray-700 text-gray-300 hover:border-cyan-400/30 assistant-message"
                }`}
              >
                {message.content}
                {message.role === "user" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400/50 clip-path-triangle" />
                )}
              </div>
            ))}

            {isLoading && (
              <div className="mr-auto max-w-[85%] p-4 rounded-xl bg-gray-800/60 border border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-100" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-200" />
                </div>
              </div>
            )}
          </div>

          {/* Input part...*/}
          <div className="p-3 border-t border-cyan-400/10 bg-gray-900/50">
            <div className="flex items-center gap-2 font-['Poppins']">
              <textarea
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInputValue(e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder="Ask Dr. MedLiv..."
                rows={1}
                className="flex-1 p-2 bg-gray-800/60 border border-gray-700 rounded-xl resize-none text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all scrollbar-thin scrollbar-track-gray-900/50 scrollbar-thumb-cyan-400/30"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-cyan-400/10 border border-cyan-400/30 rounded-xl hover:bg-cyan-400/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="absolute top-3 right-4 flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 p-4 rounded-xl shadow-2xl backdrop-blur-lg transition-all hover:shadow-cyan-lg"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chat;

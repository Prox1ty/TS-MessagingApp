import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
import { type Message } from "../types";
import { socket } from "../socket/socket";
import { useUser } from "../context/userContext"; 

function ChatRoom() {
  const isConnected = socket.connected;
  const { roomId } = useParams();
  const [inputText, setInputText] = useState<string>("");
  const { user, setUser } = useUser()!;
  
  useEffect(() => {
    const fetchUser = async () => {
      const newRes = await fetch('http://localhost:8000/user/me', {
        credentials: 'include',
      });
      if (!newRes.ok) throw new Error('Error setting user object');
      const userObj = await newRes.json();
      setUser(userObj);
    };

    void fetchUser();
  }, [setUser]);

  const [messages, setMessages] = useState([
    {
      id: "init-1",
      sender: "System",
      text: `Connected to room #${roomId}. Send a message to start chatting!`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const chatEndRef: any = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('join_room', roomId);

    function onMessageReceived(data: { author: string, text: string }) {
      const incomingMessage: Message = {
        id: crypto.randomUUID(),
        sender: data.author,
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      setMessages((prev) => [...prev, incomingMessage]);
    }

    socket.on('receive_message', onMessageReceived);

    return () => {
      socket.emit("leave_room", roomId);
      socket.off("receive_message", onMessageReceived);
      socket.disconnect();
    }
    
  }, [roomId]);


  // for auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const trimmed: string = inputText.trim();
    if (!trimmed) return; // no message to send

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: "You",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    socket.emit("send_message", {
      room: roomId,
      author: user?.name ?? "someone",
      message: trimmed
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950 p-4 font-sans text-zinc-100 selection:bg-blue-500/30">
      <div className="w-full max-w-2xl h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <header className="px-5 py-3.5 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <div>
              <h2 className="font-semibold text-zinc-100 text-sm flex items-center gap-1.5">
                Room <span className="font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-xs">#{roomId}</span>
              </h2>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Leave Room
          </button>
        </header>

        {/* Message feed */}
        <main className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              isOwn={msg.sender === 'You'}
            />
          ))}
          {/* Invisible anchor target for auto-scroll */}
          <div ref={chatEndRef} />
        </main>

        {/* Message Input form */}
        <footer className="p-3 bg-zinc-900 border-t border-zinc-800">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </footer>

      </div>
    </div>
  );
}

export default ChatRoom;

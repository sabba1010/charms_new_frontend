import React, { useEffect, useRef, useState } from 'react';
import { X, Send, MessageSquare, Loader2 } from 'lucide-react';

interface Message {
  _id: string;
  content: string;
  createdAt?: string;
  sender: {
    _id?: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

interface ChatBoxProps {
  bookingId: string | number | null;
  onClose: () => void;
  title?: string; // optional override: "Chat with Sitter" or "Chat with Client"
}

const ChatBox: React.FC<ChatBoxProps> = ({ bookingId, onClose, title }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem('token');
  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

  // Decode current user id from JWT payload
  let currentUserId: string | null = null;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      currentUserId = payload.id || payload._id || null;
    }
  } catch {
    currentUserId = null;
  }

  const fetchMessages = async () => {
    if (!bookingId) return;
    try {
      const res = await fetch(`${apiUrl}/messages/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setMessages(data.data);
    } catch (e) {
      console.error('Fetch messages error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMsg.trim() || !bookingId || sending) return;
    setSending(true);
    try {
      const res = await fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId, content: newMsg.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, data.data]);
        setNewMsg('');
      }
    } catch (e) {
      console.error('Send message error', e);
    } finally {
      setSending(false);
    }
  };

  if (!bookingId) return null;

  const chatTitle = title || 'Chat';

  return (
    <div className="fixed inset-0 bg-[#1a2e35]/40 flex items-center justify-center z-[9999] backdrop-blur-sm p-4 sm:p-0">
      <div className="bg-[#fcfbf9] sm:rounded-[2rem] shadow-2xl w-full sm:max-w-md flex flex-col overflow-hidden border border-white/50 h-full sm:h-[80vh] sm:max-h-[700px] relative">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center relative">
              <MessageSquare size={18} className="text-emerald-600" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-[15px] font-extrabold text-[#1a2e35]">{chatTitle}</h2>
              <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-widest">Active Now</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-full text-[#c28876]">
              <Loader2 size={24} className="animate-spin mr-2" />
              <span className="text-sm font-bold">Loading conversation...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
              <div className="w-20 h-20 rounded-full bg-[#f0e8df] flex items-center justify-center text-[#c28876] opacity-80">
                <MessageSquare size={32} />
              </div>
              <p className="text-[15px] font-bold text-slate-600">Start the conversation</p>
              <p className="text-xs text-slate-400 font-medium text-center max-w-[200px]">Send a message to discuss details about the job.</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMe = currentUserId && msg.sender?._id === currentUserId;
              const initials = `${msg.sender.firstName?.[0] ?? ''}${msg.sender.lastName?.[0] ?? ''}`.toUpperCase() || 'U';

              // logic to check if previous message was from same sender to group them
              const prevMsg = index > 0 ? messages[index - 1] : null;
              const isGrouped = prevMsg && prevMsg.sender?._id === msg.sender?._id;

              return (
                <div key={msg._id} className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'} ${isGrouped ? 'mt-1' : 'mt-6'}`}>
                  {/* Avatar (hide if grouped) */}
                  {!isMe && (
                    <div className="w-8 flex-shrink-0">
                      {!isGrouped && (
                        msg.sender.avatar ? (
                          <img src={msg.sender.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#c28876] flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
                            {initials}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Bubble */}
                  <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-5 py-3 text-[14px] leading-relaxed shadow-sm ${isMe
                        ? 'bg-[#1a2e35] text-white rounded-2xl rounded-br-sm'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-sm'
                      }`}>
                      {msg.content}
                    </div>
                    {/* Timestamp */}
                    {!isGrouped && (
                      <span className={`text-[9px] text-slate-400 font-bold uppercase tracking-wider px-1 ${isMe ? 'text-right' : 'text-left'}`}>
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-4 bg-white border-t border-slate-100 sticky bottom-0">
          <div className="flex items-center gap-3 bg-slate-50/80 rounded-2xl px-4 py-2.5 border border-slate-200 focus-within:border-[#c28876] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#c28876]/10 transition-all">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-transparent outline-none text-[15px] text-slate-700 placeholder-slate-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!newMsg.trim() || sending}
              className="w-10 h-10 bg-[#c28876] hover:bg-[#a97565] text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-40 flex-shrink-0 active:scale-95 shadow-md shadow-[#c28876]/30"
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

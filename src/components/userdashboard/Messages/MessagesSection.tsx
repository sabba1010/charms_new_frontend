import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Send, Paperclip, Smile, CheckCheck, Circle, Info
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ChatMessage {
  _id: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

interface ChatThread {
  id: string | number;
  userName: string;
  userAvatar: string;
  userStatus: 'Online' | 'Offline';
  sitterListing: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

const MessagesSection = () => {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeThreadId, setActiveThreadId] = useState<string | number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user._id || user.id;

  const getImageUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
    const backendUrl = apiUrl.replace('/api', '');
    return `${backendUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const fetchBookingsAndMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        const bookingsList = data.data;
        const threadsData = await Promise.all(bookingsList.map(async (b: any) => {
          let lastMsgText = 'No messages yet';
          let lastMsgTime = '';
          try {
            const mRes = await fetch(`${apiUrl}/messages/${b._id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const mData = await mRes.json();
            if (mData.success && mData.data.length > 0) {
              const lastMsg = mData.data[mData.data.length - 1];
              lastMsgText = lastMsg.content;
              const dateObj = new Date(lastMsg.createdAt);
              lastMsgTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
          } catch (e) {
            console.error('Error fetching messages for booking', b._id, e);
          }
          return {
            id: b._id,
            userName: b.sitter ? `${b.sitter.firstName || ''} ${b.sitter.lastName || ''}`.trim() || b.sitter.username : 'Unknown Sitter',
            userAvatar: getImageUrl(b.sitter?.avatar || b.listing?.logo),
            userStatus: 'Online' as const,
            sitterListing: b.listing?.title || 'Pet Care',
            lastMessage: lastMsgText,
            lastMessageTime: lastMsgTime,
            unreadCount: 0,
          };
        }));
        setThreads(threadsData);
        if (threadsData.length > 0 && !activeThreadId) {
          setActiveThreadId(threadsData[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveMessages = async () => {
    if (!activeThreadId) return;
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/messages/${activeThreadId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (e) {
      console.error('Error fetching active messages', e);
    }
  };

  useEffect(() => {
    fetchBookingsAndMessages();
  }, []);

  useEffect(() => {
    if (activeThreadId) {
      fetchActiveMessages();
      const interval = setInterval(fetchActiveMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [activeThreadId]);

  // Scroll to bottom on load/new message
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeThreadId) return;
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId: activeThreadId, content: inputText.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, data.data]);
        setThreads(prev => prev.map(t => {
          if (t.id === activeThreadId) {
            return {
              ...t,
              lastMessage: data.data.content,
              lastMessageTime: new Date(data.data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
          }
          return t;
        }));
        setInputText('');
      }
    } catch (e) {
      console.error('Send message error', e);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const activeThread = threads.find(t => t.id === activeThreadId);

  const filteredThreads = threads.filter(t =>
    t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.sitterListing.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex h-[580px]">

      {/* 1. Inbox Left Sidebar: Threads list */}
      <div className="w-[320px] border-r border-slate-100 flex flex-col h-full bg-[#fcfcfc]/30 flex-shrink-0">

        {/* Search Header */}
        <div className="p-4 border-b border-slate-50 space-y-3 flex-shrink-0">
          <h2 className="text-[16px] font-bold text-slate-900">Inbox</h2>
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search sitter or listing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-[12px] text-slate-600 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Contacts list scroll */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50/50">
          {loading ? (
            <div className="p-8 text-center text-slate-400 italic text-[12px]">
              Loading conversations...
            </div>
          ) : filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-slate-400 italic text-[12px]">
              No conversations found
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={cn(
                    "p-4 flex gap-3.5 items-start cursor-pointer hover:bg-slate-50/50 transition-colors relative",
                    isActive ? "bg-slate-50/80 border-r-2 border-[#111c1e]" : ""
                  )}
                >
                  {/* User Avatar with status dot */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={thread.userAvatar}
                      alt={thread.userName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    {thread.userStatus === 'Online' && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#5cb85c] rounded-full border-2 border-white shadow-sm" />
                    )}
                  </div>

                  {/* Thread details snippet */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className={cn("text-[13px] text-slate-900 truncate", thread.unreadCount > 0 ? "font-bold" : "font-semibold")}>
                        {thread.userName}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                        {thread.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-[#111c1e]/70 font-semibold truncate">
                      {thread.sitterListing}
                    </p>
                    <p className={cn("text-[12px] truncate", thread.unreadCount > 0 ? "text-slate-900 font-semibold" : "text-slate-400 font-medium")}>
                      {thread.lastMessage}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {thread.unreadCount > 0 && (
                    <span className="absolute right-4 bottom-4 w-5 h-5 bg-[#111c1e] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 2. Inbox Right Section: Active conversation area */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        {activeThread ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-slate-50 flex items-center justify-between flex-shrink-0 z-10">
              <div className="flex items-center gap-3">
                <img
                  src={activeThread.userAvatar}
                  alt={activeThread.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-[14px] font-bold text-slate-900">{activeThread.userName}</h3>
                  <p className="text-[10.5px] text-slate-400 font-medium flex items-center gap-1">
                    <Circle size={8} className={cn("fill-current", activeThread.userStatus === 'Online' ? "text-[#5cb85c]" : "text-slate-300")} />
                    {activeThread.userStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Pet Sitter Listing context banner */}
            <div className="bg-slate-50/50 border-b border-slate-50 px-6 py-2.5 flex items-center gap-2 text-[11px] text-slate-500 flex-shrink-0">
              <Info size={13} className="text-slate-400" />
              <span>Discussing Listing: <strong className="text-slate-700 font-bold">{activeThread.sitterListing}</strong></span>
            </div>

            {/* Message bubble stream */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20"
            >
              {messages.length === 0 ? (
                <div className="p-8 text-center text-slate-400 italic text-[12px]">
                  No messages yet. Start chatting!
                </div>
              ) : (
                messages.map((message) => {
                  const senderId = message.sender?._id || message.sender;
                  const isMe = senderId === currentUserId;
                  const senderName = message.sender?.firstName
                    ? `${message.sender.firstName} ${message.sender.lastName || ''}`
                    : (isMe ? 'Me' : activeThread.userName);
                  return (
                    <div
                      key={message._id}
                      className={cn(
                        "flex flex-col max-w-[70%] space-y-1",
                        isMe ? "ml-auto items-end" : "mr-auto items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                          isMe
                            ? "bg-[#111c1e] text-white rounded-tr-none font-medium"
                            : "bg-white border border-slate-100 text-slate-700 rounded-tl-none font-medium"
                        )}
                      >
                        {message.content}
                      </div>
                      <div className="flex items-center gap-1.5 text-[9.5px] text-slate-400 font-semibold px-1">
                        <span className="text-[8.5px] text-slate-400">by {senderName}</span>
                        <span>•</span>
                        <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {isMe && <CheckCheck size={11} className="text-emerald-500" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message input bar */}
            <div className="p-4 border-t border-slate-50 flex items-center gap-3 bg-white flex-shrink-0">
              <button className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex-shrink-0">
                <Paperclip size={18} />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={`Send message to ${activeThread.userName}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-10 py-3 text-[13px] text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all font-medium"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={cn(
                  "p-3 rounded-full text-white shadow-md active:scale-95 transition-all flex items-center justify-center flex-shrink-0",
                  inputText.trim()
                    ? "bg-[#111c1e] hover:bg-black cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                )}
              >
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 italic">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;

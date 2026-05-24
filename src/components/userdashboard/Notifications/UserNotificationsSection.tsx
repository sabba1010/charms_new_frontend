import React, { useState } from 'react';
import {
  Bell, Mail, Calendar, CheckCircle2, MessageSquare,
  Star, Sparkles, Trash2, Check
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Notification {
  id: number;
  title: string;
  description: string;
  type: 'booking' | 'message' | 'review' | 'system';
  time: string;
  isRead: boolean;
}

const UserNotificationsSection = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Booking Confirmed! 🐾',
      description: 'Emma Thompson confirmed your Boarding booking request for Bella (Golden Retriever) from May 20 to May 25.',
      type: 'booking',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'New Message from James Wilson',
      description: '"Hi! I wanted to double check what time you\'d like me to pick up Rocky for his daily walk..."',
      type: 'message',
      time: '5 hours ago',
      isRead: false,
    },
    {
      id: 3,
      title: 'Share Your Experience',
      description: 'How was Rocky\'s day care with Sophia Miller on Jun 02? Leave a review to help others!',
      type: 'review',
      time: '2 days ago',
      isRead: true,
    },
    {
      id: 4,
      title: 'Welcome to Home Paw! 🏡',
      description: 'Your profile has been created successfully. Find sitters, save searches, and keep your pets happy!',
      type: 'system',
      time: '1 week ago',
      isRead: true,
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.isRead;
    return true;
  });

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={18} />
          </div>
        );
      case 'message':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={18} />
          </div>
        );
      case 'review':
        return (
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Star size={18} />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0">
            <Bell size={18} />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                "px-3.5 py-1 text-[11px] font-bold rounded-full transition-all",
                activeFilter === 'all'
                  ? "bg-[#111c1e] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              )}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={cn(
                "px-3.5 py-1 text-[11px] font-bold rounded-full transition-all",
                activeFilter === 'unread'
                  ? "bg-[#111c1e] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              )}
            >
              Unread ({notifications.filter(n => !n.isRead).length})
            </button>
          </div>
        </div>

        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-[#111c1e] hover:underline flex items-center gap-1.5"
          >
            <CheckCircle2 size={13} /> Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-slate-50">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 py-20 text-center">
            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Check size={20} />
            </div>
            <p className="text-slate-400 italic text-[14px]">
              You're all caught up! No notifications.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={cn(
                "p-6 flex items-start gap-4 hover:bg-slate-50/40 rounded-xl transition-all",
                !notif.isRead ? "bg-slate-50/20 border-l-[3px] border-[#111c1e] pl-[21px]" : "pl-6"
              )}
            >
              {getNotificationIcon(notif.type)}

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className={cn("text-[14px] text-slate-900", !notif.isRead ? "font-bold" : "font-semibold")}>
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{notif.description}</p>

                <div className="flex items-center gap-4 pt-2">
                  {!notif.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="text-[11px] font-bold text-[#111c1e] hover:underline flex items-center gap-1"
                    >
                      <Check size={12} /> Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="text-[11px] font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserNotificationsSection;

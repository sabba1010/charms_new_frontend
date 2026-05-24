import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import DateRangePicker from '../userdashboard/DateRangePicker';

const AdminBookingsSection = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState('April 13, 2026 - May 13, 2026');

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-visible">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between relative">
        <h2 className="text-[16px] font-bold text-slate-900">Your Bookings</h2>
        
        <div className="relative">
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 text-slate-400 text-[13px] font-medium hover:text-slate-900 transition-colors"
          >
            <span>{dateRange}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", showDatePicker ? "rotate-180" : "")} />
          </button>

          <AnimatePresence>
            {showDatePicker && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-4 z-[100]"
              >
                <DateRangePicker 
                  onApply={(range: { start: string; end: string }) => {
                    setShowDatePicker(false);
                  }}
                  onCancel={() => setShowDatePicker(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-8 py-20">
        <p className="text-slate-400 italic text-[14px]">
          You don't have any bookings yet
        </p>
      </div>
    </div>
  );
};

export default AdminBookingsSection;

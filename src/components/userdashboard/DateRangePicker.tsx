import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DateRangePickerProps {
  onApply: (range: { start: string; end: string }) => void;
  onCancel: () => void;
  initialRange?: { start: string; end: string };
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onApply, onCancel, initialRange }) => {
  const [selectedRange, setSelectedRange] = useState(initialRange || { start: '2026-04-01', end: '2026-04-30' });
  const [activePreset, setActivePreset] = useState('Last Month');

  const presets = [
    'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Custom'
  ];

  return (
    <div className="absolute top-full right-0 mt-4 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 z-50 flex overflow-hidden min-w-[700px]">
      {/* Sidebar Presets */}
      <div className="w-48 border-r border-slate-50 p-2 bg-slate-50/30">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => setActivePreset(preset)}
            className={cn(
              "w-full text-left px-4 py-2.5 text-[13px] font-medium transition-all rounded-lg mb-1",
              activePreset === preset 
                ? "bg-[#111c1e] text-white" 
                : "text-slate-500 hover:bg-slate-100"
            )}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Calendars Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex p-6 gap-8">
          {/* April 2026 */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 px-2">
              <button className="text-slate-400 hover:text-slate-900"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-[14px] font-bold text-slate-800">April 2026</span>
              <div className="w-4" />
            </div>
            <div className="grid grid-cols-7 text-center mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                <span key={d} className="text-[11px] font-bold text-slate-400 uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {[...Array(30)].map((_, i) => {
                const day = i + 1;
                const isSelected = day === 1 || day === 30;
                const isInRange = day > 1 && day < 30;
                return (
                  <button
                    key={i}
                    className={cn(
                      "aspect-square text-[13px] flex items-center justify-center rounded-lg transition-all",
                      isSelected && "bg-[#111c1e] text-white font-bold",
                      isInRange && "bg-emerald-50 text-emerald-700",
                      !isSelected && !isInRange && "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* May 2026 */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="w-4" />
              <span className="text-[14px] font-bold text-slate-800">May 2026</span>
              <button className="text-slate-400 hover:text-slate-900"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-7 text-center mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                <span key={d} className="text-[11px] font-bold text-slate-400 uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
               {/* Pre-fill for May */}
               {[...Array(31)].map((_, i) => (
                <button
                  key={i}
                  className="aspect-square text-[13px] flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
          <span className="text-[13px] font-medium text-slate-500 tabular-nums">
            04/01/2026 - 04/30/2026
          </span>
          <div className="flex items-center gap-3">
            <button 
              onClick={onCancel}
              className="px-6 py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => onApply(selectedRange)}
              className="px-8 py-2 bg-[#111c1e] text-white rounded-lg text-[13px] font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;

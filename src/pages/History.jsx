import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

const History = () => {
  const { today, getLogsForDate } = useStore();
  const [selectedDate, setSelectedDate] = useState(today);

  // Generate last 7 days array
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayName = d.toLocaleDateString('zh-CN', { weekday: 'short' });
    
    // Get logs for that date
    const dayLogs = getLogsForDate(dateStr);
    const kcal = dayLogs.reduce((sum, item) => sum + (item.kcal * item.portion), 0);
    
    last7Days.push({
      dateStr,
      dayName,
      kcal,
      logs: dayLogs
    });
  }

  const maxChartValue = Math.max(1600, ...last7Days.map(d => d.kcal)) + 200;

  const selectedDayData = last7Days.find(d => d.dateStr === selectedDate);

  return (
    <div className="flex flex-col h-full p-6 pb-24 overflow-y-auto">
      <h1 className="text-2xl font-bold text-slate-700 mb-8 text-center">历史记录 📊</h1>
      
      {/* 7-Day Custom Bar Chart */}
      <div className="bg-white p-6 rounded-4xl shadow-sm border border-sage/30 mb-8">
        <div className="flex justify-between items-end h-48 gap-2">
          {last7Days.map((day, i) => {
            const isOver = day.kcal > 1600;
            const heightPct = day.kcal === 0 ? 5 : (day.kcal / maxChartValue) * 100;
            const isSelected = day.dateStr === selectedDate;
            
            return (
              <div 
                key={i} 
                className="flex flex-col items-center flex-1 cursor-pointer group"
                onClick={() => setSelectedDate(day.dateStr)}
              >
                {/* kcal label */}
                <span className={`text-[10px] font-bold mb-2 transition-opacity ${isSelected ? 'opacity-100 text-slate-700' : 'opacity-0 group-hover:opacity-100 text-slate-400'}`}>
                  {Math.round(day.kcal)}
                </span>
                
                {/* Bar */}
                <div className="w-full relative bg-slate-100 rounded-full flex-1 flex flex-col justify-end overflow-hidden">
                  {/* 1600 line indicator */}
                  <div 
                    className="absolute w-full border-b-2 border-dashed border-slate-300 z-10" 
                    style={{ bottom: `${(1600 / maxChartValue) * 100}%` }}
                  />
                  
                  <div 
                    className={`w-full rounded-full transition-all duration-500 ease-out ${
                      isOver ? 'bg-red-400' : 'bg-pink'
                    } ${isSelected ? 'shadow-inner-soft filter brightness-110' : 'opacity-80'}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                
                {/* Day label */}
                <span className={`text-xs font-bold mt-3 ${isSelected ? 'text-pink' : 'text-slate-400'}`}>
                  {day.dayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Logs below chart */}
      <div>
        <h3 className="font-bold text-slate-700 mb-4 px-2">
          {selectedDate === today ? '今天' : selectedDayData?.dayName + ', ' + selectedDate.split('-').slice(1).join('/')} 🍱
        </h3>
        <div className="flex flex-col gap-3">
          {!selectedDayData || selectedDayData.logs.length === 0 ? (
            <div className="bg-white/50 border border-dashed border-slate-300 rounded-3xl p-6 text-center text-slate-400 font-medium">
              这一天没有记录哦
            </div>
          ) : (
            selectedDayData.logs.map((log, i) => (
              <div key={i} className="bg-white p-4 rounded-3xl shadow-sm border border-pink/20 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-700">{log.food.name}</div>
                  <div className="text-xs font-medium text-slate-400 mt-1">
                    {log.portion} 份
                  </div>
                </div>
                <div className="font-bold text-pink">
                  {Math.round(log.portion * log.food.kcalPerPortion)} kcal
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default History;

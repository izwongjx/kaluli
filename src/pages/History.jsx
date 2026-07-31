import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Settings, X, Plus } from 'lucide-react';

const History = () => {
  const { today, getLogsForDate, addPoints, missingFoods } = useStore();
  const [selectedDate, setSelectedDate] = useState(today);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const [addPointsAmount, setAddPointsAmount] = useState('');

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
    <div className="flex flex-col h-full px-6 pb-24 overflow-y-auto relative" style={{ paddingTop: 'max(1.5rem, env(safe-area-inset-top))' }}>
      <div className="flex justify-between items-center mb-8 relative">
        <button 
          onClick={() => setShowLogoutPrompt(true)}
          className="text-slate-400 hover:text-slate-600 transition-colors p-2 -ml-2 rounded-full hover:bg-slate-100"
        >
          <Settings size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-700 absolute left-1/2 -translate-x-1/2">历史记录 📊</h1>
        <div className="w-8"></div>
      </div>
      
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

      {/* Logout Prompt Modal */}
      {showLogoutPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6 backdrop-blur-sm animate-[overlayEnter_0.3s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-8 flex flex-col items-center w-[300px] shadow-xl border border-white/60 animate-[modalEnter_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)] text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Warning</h2>
            <p className="text-slate-500 font-medium mb-8">Do you wanna logout?</p>
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => {
                  setShowLogoutPrompt(false);
                  setShowAdminModal(true);
                }}
                className="bg-pink text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-pink/90 transition-all w-full"
              >
                Logout
              </button>
              <button 
                onClick={() => setShowLogoutPrompt(false)}
                className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6 backdrop-blur-sm animate-[overlayEnter_0.3s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 flex flex-col w-full max-w-md shadow-xl border border-white/60 relative animate-[modalEnter_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)] max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Admin Settings</h2>
              <button onClick={() => setShowAdminModal(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto hide-scrollbar flex-1 -mx-2 px-2">
              <div className="mb-6 bg-pink/10 p-4 rounded-2xl border border-pink/20">
                <h3 className="font-bold text-slate-700 mb-3 text-sm">Add Points Manually</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={addPointsAmount}
                    onChange={(e) => setAddPointsAmount(e.target.value)}
                    className="flex-1 bg-white rounded-xl px-4 py-2 text-sm border border-pink/30 focus:outline-none focus:ring-2 focus:ring-pink/50"
                  />
                  <button
                    onClick={() => {
                      const val = parseInt(addPointsAmount);
                      if (!isNaN(val) && val !== 0) {
                        addPoints(val, 'Admin manual addition');
                        setAddPointsAmount('');
                        alert(`Successfully added ${val} points!`);
                      }
                    }}
                    className="bg-pink text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-pink/90 transition-colors shadow-sm flex items-center gap-1"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
              
              <div className="mb-2">
                <h3 className="font-bold text-slate-700 mb-3 text-sm">Requested Missing Foods</h3>
                {(!missingFoods || missingFoods.length === 0) ? (
                  <p className="text-slate-400 text-sm text-center py-4 bg-slate-50 rounded-2xl">No requests yet.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {missingFoods.slice().reverse().map((item, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                        <span className="font-medium text-slate-700 text-sm">{item.name}</span>
                        <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default History;

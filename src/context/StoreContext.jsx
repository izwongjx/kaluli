import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

const getTodayDateString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const StoreProvider = ({ children }) => {
  const [today, setToday] = useState(getTodayDateString());
  
  // State variables
  const [logs, setLogs] = useState([]);
  const [points, setPoints] = useState(0);
  const [pointHistory, setPointHistory] = useState([]);
  const [quizPassed, setQuizPassed] = useState(false);
  const togetherSince = "2025-08-18";

  // Initialize data on mount and handle date changes
  useEffect(() => {
    const currentDate = getTodayDateString();
    setToday(currentDate);

    // 1. Load Quiz
    const savedQuiz = localStorage.getItem(`quiz_passed_${currentDate}`);
    setQuizPassed(savedQuiz === 'true');

    // 2. Load Points
    const savedPoints = parseInt(localStorage.getItem('love_points_total') || '0', 10);
    setPoints(savedPoints);

    // 3. Load Point History
    const savedHistory = JSON.parse(localStorage.getItem('love_points_log') || '[]');
    setPointHistory(savedHistory);

    // 4. Load Today's Logs
    const savedLogs = JSON.parse(localStorage.getItem(`log_${currentDate}`) || '[]');
    setLogs(savedLogs);

    // Check if we need to calculate points from yesterday (simple approach: look at last active date if we had a last active date tracking)
    // To handle "date changes", we could track "last_opened_date".
    const lastOpenedDate = localStorage.getItem('last_opened_date');
    if (lastOpenedDate && lastOpenedDate !== currentDate) {
      // Calculate points for the last opened date
      const lastLogs = JSON.parse(localStorage.getItem(`log_${lastOpenedDate}`) || '[]');
      const lastKcal = lastLogs.reduce((sum, item) => sum + (item.kcal * item.portion), 0);
      
      let earned = 0;
      if (lastKcal <= 1600) {
        earned = Math.floor((1600 - lastKcal) / 2);
      }
      
      if (earned > 0) {
        // Check if we already rewarded this date to prevent duplicates
        const alreadyRewarded = savedHistory.find(h => h.date === lastOpenedDate);
        if (!alreadyRewarded) {
          const newTotal = savedPoints + earned;
          const newHistory = [...savedHistory, { date: lastOpenedDate, points_earned: earned }];
          
          setPoints(newTotal);
          setPointHistory(newHistory);
          
          localStorage.setItem('love_points_total', newTotal.toString());
          localStorage.setItem('love_points_log', JSON.stringify(newHistory));
        }
      }
    }
    
    // Update last opened date
    localStorage.setItem('last_opened_date', currentDate);
    
    // Check for date rollover while app is open
    const interval = setInterval(() => {
      const now = getTodayDateString();
      if (now !== currentDate) {
        window.location.reload();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Actions
  const passQuiz = () => {
    localStorage.setItem(`quiz_passed_${today}`, 'true');
    setQuizPassed(true);
  };

  const addLog = (food, portion) => {
    const newLog = { food, portion, kcal: food.kcalPerPortion };
    const newLogs = [...logs, newLog];
    setLogs(newLogs);
    localStorage.setItem(`log_${today}`, JSON.stringify(newLogs));
  };

  const deleteLog = (index) => {
    const newLogs = [...logs];
    newLogs.splice(index, 1);
    setLogs(newLogs);
    localStorage.setItem(`log_${today}`, JSON.stringify(newLogs));
  };
  
  const getLogsForDate = (dateStr) => {
    return JSON.parse(localStorage.getItem(`log_${dateStr}`) || '[]');
  };

  const addPoints = (amount) => {
    const newTotal = points + amount;
    setPoints(newTotal);
    const newHistory = [...pointHistory, { date: today, points_earned: amount, note: 'Found Easter Egg!' }];
    setPointHistory(newHistory);
    localStorage.setItem('love_points_total', newTotal.toString());
    localStorage.setItem('love_points_log', JSON.stringify(newHistory));
  };

  const deductPoints = (amount, note) => {
    const newTotal = points - amount;
    setPoints(newTotal);
    const newHistory = [...pointHistory, { date: today, points_earned: -amount, note: note }];
    setPointHistory(newHistory);
    localStorage.setItem('love_points_total', newTotal.toString());
    localStorage.setItem('love_points_log', JSON.stringify(newHistory));
  };

  const currentKcal = logs.reduce((sum, item) => sum + (item.kcal * item.portion), 0);

  return (
    <StoreContext.Provider value={{
      today,
      logs,
      points,
      pointHistory,
      quizPassed,
      togetherSince,
      currentKcal,
      passQuiz,
      addLog,
      deleteLog,
      getLogsForDate,
      addPoints,
      deductPoints
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

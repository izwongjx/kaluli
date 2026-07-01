import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useStore } from './context/StoreContext';
import QuizGate from './pages/QuizGate';
import Home from './pages/Home';
import LogFood from './pages/LogFood';
import LovePoints from './pages/LovePoints';
import History from './pages/History';
import BottomNav from './components/BottomNav';

function App() {
  const { quizPassed } = useStore();
  const location = useLocation();

  return (
    <div className="h-full bg-cream flex justify-center w-full font-sans overflow-hidden">
      <div className="w-full max-w-[480px] h-full flex flex-col relative overflow-hidden transition-all duration-300">
        
        {/* Temporary Restart Button */}
        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="absolute top-2 right-2 z-50 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg opacity-50 hover:opacity-100 shadow-sm"
        >
          🔄 重置测试 (Restart)
        </button>

        {!quizPassed ? (
          <QuizGate />
        ) : (
          <>
            <div key={location.pathname} className="flex-1 overflow-y-auto hide-scrollbar pt-8 pb-[120px] animate-[pageFadeIn_0.3s_ease-out]">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/log" element={<LogFood />} />
                <Route path="/points" element={<LovePoints />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <BottomNav />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

const Home = () => {
  const { currentKcal: actualKcal, points, togetherSince, addPoints } = useStore();
  const currentKcal = actualKcal;
  const maxKcal = 1600;
  
  // Calculate days together
  const startDate = new Date(togetherSince);
  startDate.setHours(0, 0, 0, 0);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(todayDate - startDate);
  const daysTogether = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const safeKcal = Math.min(currentKcal, maxKcal);
  const kcalLeft = Math.max(0, maxKcal - currentKcal);
  
  let message = "宝宝太棒啦！继续保持 🔥";
  if (currentKcal > 1600) {
    message = "哎呀... 明天再重新开始吧 😭";
  } else if (currentKcal >= 1500) {
    message = "剩下不多啦，选点好吃的 😅";
  } else if (currentKcal >= 1200) {
    message = "稍微吃慢点啦宝宝 👀";
  } else if (currentKcal >= 800) {
    message = "乖乖按计划进行中哦 💪";
  }

  const [easterEgg, setEasterEgg] = useState(null);
  const pathRef = React.useRef(null);
  const [pathLen, setPathLen] = useState(150); // Fallback approximate length

  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
    
    // Randomly spawn a couple avatar on the screen (only valid images: 1, 2, 3, 4, 6)
    const validCouples = [1, 2, 3, 4, 6];
    const randomCouple = validCouples[Math.floor(Math.random() * validCouples.length)];
    const randomTop = 20 + Math.random() * 50; // 20% to 70% top (middle area)
    
    // Spawn mostly on the far left or far right edges
    const isLeft = Math.random() > 0.5;
    const randomLeft = isLeft ? (2 + Math.random() * 12) : (80 + Math.random() * 12);
    
    setEasterEgg({
      image: `/couple${randomCouple}.png`,
      top: `${randomTop}%`,
      left: `${randomLeft}%`
    });
  }, []);

  const handleEggClick = () => {
    if (addPoints) {
      addPoints(10);
    }
    setEasterEgg(null); // Make it disappear
  };

  return (
    <div className="flex flex-col items-center w-full h-full pb-20 overflow-y-auto bg-[#fef9f5] animate-[pageFadeIn_0.4s_ease-out] relative">
      
      {/* Top Hanging Progress Arc */}
      <div className="absolute top-0 left-0 w-full h-[180px] pointer-events-none z-0">
        <svg viewBox="0 0 400 180" className="w-full h-full overflow-visible drop-shadow-sm" preserveAspectRatio="xMidYMin slice">
          {/* Background Arc */}
          <path 
            d="M -20,-10 C 100,160 300,160 420,-10" 
            fill="none" stroke="#ffe4e8" strokeWidth="28" strokeLinecap="round"
          />
          {/* Progress Arc */}
          <path 
            d="M -20,-10 C 100,160 300,160 420,-10" 
            fill="none" stroke="#ff8fa3" strokeWidth="28" strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - (safeKcal / maxKcal) * 100}
            className={`transition-all duration-1000 ease-out ${safeKcal === 0 ? 'opacity-0' : 'opacity-100'}`}
          />
        </svg>
      </div>

      {/* Central Progress Text - Inside the inner curve */}
      <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <span className="text-slate-800 font-extrabold text-[32px] tracking-widest leading-none drop-shadow-sm" style={{ fontStyle: 'italic' }}>
          {currentKcal}
        </span>
        <span className="text-slate-500 font-bold text-[10px] tracking-[0.2em] uppercase mt-1">
          / {maxKcal} KCAL
        </span>
      </div>

      {/* Flexible Spacer to push content down */}
      <div className="flex-1 min-h-[6rem] w-full pointer-events-none"></div>

      {/* Centered Chat Bubble */}
      <div className="relative z-10 w-full max-w-[280px] px-2 mb-2 animate-[float_4s_ease-in-out_infinite] mt-16">
        <div className="relative bg-white border-[2px] border-slate-800 rounded-[20px] p-4 shadow-sm">
          <span className="text-slate-800 font-bold text-[15px] leading-relaxed tracking-wide block text-center">
            {message}
          </span>
          {/* Tail pointing down */}
          <div className="absolute -bottom-[9px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-[2px] border-r-[2px] border-slate-800 rotate-45"></div>
        </div>
      </div>

      {/* Centered Avatar */}
      <div className="relative z-10 w-[240px] h-[240px] flex justify-center items-end mb-8 mt-4">
        <img src="/boy1.png" alt="Boy Avatar" className="w-full h-full object-contain object-bottom" />
      </div>

      {/* Info Pills (Pink) Centered */}
      <div className="relative z-10 flex w-full max-w-[360px] justify-center gap-4 px-4 pb-2 mt-auto">
        <div className="flex-1 bg-[#ff8fa3] text-white rounded-full py-3.5 text-[14px] font-bold tracking-wide shadow-sm text-center flex justify-center items-center">
          {daysTogether} days
        </div>
        <div className="flex-1 bg-[#ff8fa3] text-white rounded-full py-3.5 text-[14px] font-bold tracking-wide shadow-sm text-center flex justify-center items-center">
          {kcalLeft} left
        </div>
      </div>

      {/* Easter Egg Mini-Game */}
      {easterEgg && (
        <div 
          className="absolute z-50 cursor-pointer drop-shadow-sm hover:scale-125 transition-transform duration-300"
          style={{ top: easterEgg.top, left: easterEgg.left }}
          onClick={handleEggClick}
        >
          <img src={easterEgg.image} alt="Easter Egg" className="w-[22px] h-[22px] object-contain opacity-70" />
        </div>
      )}
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default Home;

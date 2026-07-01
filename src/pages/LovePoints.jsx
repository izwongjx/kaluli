import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const LovePoints = () => {
  const { points, pointHistory, addPoints, deductPoints } = useStore();
  const [showRules, setShowRules] = useState(false);
  const [redeemModal, setRedeemModal] = useState(null);
  const [errorModal, setErrorModal] = useState(false);

  const rewards = [
    { name: "Boo random", pts: 3000, emoji: "❓" },
    { name: "Oreo ice cream", pts: 3500, emoji: "🍦" },
    { name: "Potato chips", pts: 3500, emoji: "🥔" },
    { name: "Mcd ice cream", pts: 4000, emoji: "🍦" },
    { name: "Mcd fries", pts: 4000, emoji: "🍟" },
    { name: "火鸡面 + 紫菜", pts: 4500, emoji: "🍜" },
    { name: "Sushi", pts: 5500, emoji: "🍣" },
    { name: "Fish and chips", pts: 5500, emoji: "🐟" },
    { name: "Unagi rice", pts: 5500, emoji: "🍚" },
    { name: "Omakase", pts: 10000, emoji: "🍱" },
  ];

  const handleRedeem = (reward) => {
    if (points >= reward.pts) {
      deductPoints(reward.pts, `Redeemed ${reward.name}`);
      setRedeemModal(reward.name);
    } else {
      setErrorModal(true);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 pb-24 overflow-y-auto relative">
      <h1 className="text-2xl font-bold text-slate-700 mb-6 text-center">Boo Points 🩷</h1>
      
      {/* Total Balance Badge */}
      <div className="bg-pink text-white rounded-3xl py-6 px-8 flex items-baseline justify-center gap-3 shadow-soft mb-8 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 -mt-2 -mr-2 text-white/20 text-7xl">🩷</div>
        <span className="text-5xl font-extrabold z-10">{points}</span>
        <span className="text-lg font-bold opacity-90 z-10 whitespace-nowrap">总 Boo Points</span>
      </div>

      {/* Rules */}
      <div 
        className="bg-white rounded-3xl p-5 shadow-sm border border-pink/20 mb-8 cursor-pointer hover:border-pink/50 transition-colors" 
        onClick={() => setShowRules(!showRules)}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-700">如何获取 Boo Points？✨</h3>
          <button className="text-slate-400 bg-slate-100 p-1.5 rounded-full transition-transform">
            {showRules ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        
        {showRules && (
          <div className="mt-4 pt-4 border-t border-slate-100 animate-[pageFadeIn_0.2s_ease-out]">
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              如果每天摄入低于 1600 kcal，剩下的卡路里就会变成 Boo Points 哦！
              <br/><br/>
              <span className="text-pink bg-pink/10 px-2 py-1 rounded-lg block w-fit">(1600 - 已摄入 kcal) ÷ 2 = Boo Points</span>
              <br/>
              超过 1600 kcal 的话？那天就没有 Boo Points 啦 😭。Boo Points 会在第二天早上发放！
            </p>
          </div>
        )}
      </div>

      {/* Rewards List */}
      <h3 className="font-bold text-slate-700 mb-4 px-2">兑换奖励 🎁</h3>
      <div className="flex flex-col gap-3 mb-8">
        {rewards.map((reward, i) => (
          <div 
            key={i} 
            onClick={() => handleRedeem(reward)}
            className="bg-white rounded-3xl p-4 flex justify-between items-center shadow-sm border border-sage/20 hover:border-pink transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl bg-sage/10 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                {reward.emoji}
              </div>
              <div className="font-bold text-slate-600 group-hover:text-pink transition-colors">{reward.name}</div>
            </div>
            <div className="font-bold text-pink bg-pink/10 px-3 py-1.5 rounded-xl text-sm whitespace-nowrap">
              {reward.pts} BP
            </div>
          </div>
        ))}
      </div>

      {/* History */}
      <h3 className="font-bold text-slate-700 mb-4 px-2">获取记录 📝</h3>
      <div className="flex flex-col gap-3">
        {pointHistory.length === 0 ? (
          <div className="text-center text-slate-400 mt-4 font-medium">还没有获取 Boo Points 的记录哦！</div>
        ) : (
          [...pointHistory].reverse().map((record, i) => (
            <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm flex justify-between border border-sage/20 ${record.points_earned < 0 ? 'opacity-80' : ''}`}>
              <div className="flex flex-col">
                <span className="font-bold text-slate-600">{record.date}</span>
                {record.note && <span className="text-xs text-slate-400 font-medium mt-0.5">{record.note}</span>}
              </div>
              <span className={`font-bold ${record.points_earned < 0 ? 'text-slate-500' : 'text-pink'}`}>
                {record.points_earned > 0 ? '+' : ''}{record.points_earned} BP
              </span>
            </div>
          ))
        )}
      </div>

      {/* Temporary Reset Button */}
      <button 
        onClick={() => {
          localStorage.removeItem('love_points_total');
          localStorage.removeItem('love_points_log');
          window.location.reload();
        }}
        className="mt-12 text-[11px] text-slate-300 hover:text-slate-500 underline decoration-slate-300 w-full text-center pb-4"
      >
        [测试专用: 清空数据 (Reset to 0)]
      </button>

      {/* Redeem Modal Overlay */}
      {redeemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-6 backdrop-blur-md animate-[overlayEnter_0.3s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-8 flex flex-col items-center justify-between w-[300px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative border border-white/60 animate-[modalEnter_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            
            <div className="w-28 h-28 mb-4 animate-[float_4s_ease-in-out_infinite] drop-shadow-md">
              <img src="/boykiss1.png" alt="Happy Boy" className="w-full h-full object-contain" />
            </div>
            
            <div className="text-2xl tracking-wider text-slate-800 font-extrabold text-center mb-2">
              恭喜宝宝
            </div>
            
            <div className="text-base tracking-wide text-slate-500 font-medium text-center mb-6 leading-relaxed">
              辛苦啦！奖励你：<br/>
              <span className="text-pink font-bold text-lg">{redeemModal}</span>
            </div>
            
            <button 
              onClick={() => setRedeemModal(null)}
              className="bg-pink text-white px-8 py-3 rounded-2xl text-base font-bold tracking-widest shadow-md shadow-pink/30 hover:bg-pink/90 transition-all w-full"
            >
              开心收下！
            </button>
          </div>
        </div>
      )}

      {/* Error Modal Overlay */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-6 backdrop-blur-md animate-[overlayEnter_0.3s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-8 flex flex-col items-center justify-between w-[300px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative border border-white/60 animate-[modalEnter_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            
            <div className="w-28 h-28 mb-4 animate-[float_4s_ease-in-out_infinite] drop-shadow-md">
              <img src="/boysad1.png" alt="Sad Boy" className="w-full h-full object-contain" />
            </div>
            
            <div className="text-2xl tracking-wider text-slate-800 font-extrabold text-center mb-2">
              余额不足 😭
            </div>
            
            <div className="text-base tracking-wide text-slate-500 font-medium text-center mb-6 leading-relaxed">
              Boo Points 不够兑换这个啦！<br/>宝宝还要继续加油哦！
            </div>
            
            <button 
              onClick={() => setErrorModal(false)}
              className="bg-slate-800 text-white px-8 py-3 rounded-2xl text-base font-bold tracking-widest shadow-md hover:bg-slate-700 transition-all w-full"
            >
              我知道啦
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes overlayEnter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalEnter {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default LovePoints;

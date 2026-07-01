import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';

const QUIZ_QUESTIONS = [
  {
    q: "我最喜欢吃什么？",
    opts: ["蘑菇", "西兰花", "胡萝卜", "洋葱"],
    ans: 0,
    avatar: "/couple1.png"
  },
  {
    q: "我的“爱之语 (Love Language)”是什么？",
    opts: ["Words of Affirmation", "Physical Touch", "Quality Time", "Receiving Gifts"],
    ans: 1,
    avatar: "/couple2.png"
  },
  {
    q: "我们第一次见面的地方是哪里？",
    opts: ["图书馆", "CC1 Booth", "科室", "电影院"],
    ans: 2,
    avatar: "/couple3.png"
  },
  {
    q: "我们一起看的第一部电影是什么？",
    opts: ["分手清单", "Zootopia", "不说话的爱", "Lalalala"],
    ans: 0,
    avatar: "/couple4.png"
  },
  {
    q: "我最喜欢的颜色是什么？",
    opts: ["红色", "蓝色", "粉色", "绿色"],
    ans: 1,
    avatar: "/couple6.png"
  },
  {
    q: "我每天早上醒来做的第一件事是什么？",
    opts: ["喝水", "看手机", "Call Booboo", "去洗手间"],
    ans: 2,
    avatar: "/couple1.png"
  },
  {
    q: "哪家餐厅/地方是专属“我们的”？",
    opts: ["McDonald's", "Hotpot Kitchen", "Johnny English", "Shin Zushi"],
    ans: 2,
    avatar: "/couple2.png"
  },
  {
    q: "有什么东西是我们俩都非常讨厌的？",
    opts: ["蘑菇", "大太阳", "胡萝卜", "香菜"],
    ans: 1,
    avatar: "/couple3.png"
  },
  {
    q: "我们俩之间，谁的厨艺更好？",
    opts: ["Junxii", "Shixuen"],
    ans: 0,
    avatar: "/couple4.png",
    special: "cook"
  }
];

const QuizGate = () => {
  const { passQuiz } = useStore();
  const [step, setStep] = useState('welcome');
  const [shake, setShake] = useState(false);
  const [poutCount, setPoutCount] = useState(0);
  const [isLeavingWelcome, setIsLeavingWelcome] = useState(false);

  // States for special cook question
  const [shixuenScale, setShixuenScale] = useState(1);
  const [junxiiScale, setJunxiiScale] = useState(1);

  // Pick one question based on today's date
  const initialIndex = useMemo(() => new Date().getDate() % QUIZ_QUESTIONS.length, []);
  const [currentQIndex, setCurrentQIndex] = useState(initialIndex);

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  const handleAnswer = (index) => {
    if (currentQ.special === 'cook' && index === 1) { // Clicked Shixuen
      setShixuenScale(prev => Math.max(0, prev - 0.25));
      setJunxiiScale(prev => prev + 0.3);
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    if (index === currentQ.ans) {
      setStep('success');
    } else {
      setStep('wrong');
    }
  };

  const handleStart = () => {
    setIsLeavingWelcome(true);
    setTimeout(() => {
      setStep('quiz');
    }, 280);
  };

  if (step === 'welcome') {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#fff6f4] to-[#ffece8] relative overflow-hidden ${isLeavingWelcome ? 'animate-[pageFadeOut_0.3s_ease-in_forwards]' : 'animate-[pageFadeIn_0.4s_ease-out]'}`}>
        
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-pink/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple/20 rounded-full blur-2xl"></div>

        <div className="z-10 flex flex-col items-center w-full mt-4">
          <div className="mb-0 text-[56px] text-slate-800 font-extrabold drop-shadow-sm tracking-widest">
            欢迎来到
          </div>
          
          <div className="mb-10 text-base tracking-[0.2em] text-slate-500 font-medium uppercase">
            welcome to
          </div>
          
          {/* Avatar with floating animation */}
          <div className="relative w-64 h-auto mb-10 flex justify-center items-center animate-[float_4s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl transform scale-75"></div>
            <img src="/girl1.png" alt="Girl Avatar" className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
          </div>
          
          <div className="mb-12 text-lg font-bold tracking-widest text-slate-600 bg-white/50 px-6 py-2 rounded-full border border-white/60 shadow-sm backdrop-blur-sm">
            ✨ 专属卡路里计算机 ✨
          </div>
          
          <button 
            onClick={handleStart}
            className="group relative bg-gradient-to-r from-pink to-[#ff9aab] text-white px-10 py-4 rounded-3xl text-xl font-bold tracking-widest shadow-[0_8px_30px_rgba(255,181,200,0.4)] hover:shadow-[0_8px_30px_rgba(255,181,200,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden w-full max-w-[260px]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10">开始计算</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-cream relative animate-[pageFadeIn_0.4s_ease-out]">
      {/* Avatar */}
      <div className={`relative mb-8 ${shake ? 'animate-shake' : ''}`}>
        <div className="w-40 h-40">
          <img src={currentQ.avatar} alt="Couple Avatar" className="w-full h-full object-contain drop-shadow-sm" />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white w-full p-6 rounded-4xl shadow-soft border border-sage/30">
        <div className="text-xs font-bold text-pink text-center mb-2 uppercase tracking-wider">每日一问 ✨</div>
        <h2 className="text-xl font-bold text-center text-slate-700 mb-6">
          {currentQ.q}
        </h2>
        
        <div className="flex flex-col gap-3 items-center w-full">
          {currentQ.opts.map((opt, i) => {
            const isSpecial = currentQ.special === 'cook';
            let style = {};
            if (isSpecial) {
              if (i === 0) style = { transform: `scale(${junxiiScale})`, transformOrigin: 'center' };
              if (i === 1) {
                if (shixuenScale <= 0.05) return null; // hide when extremely small
                style = { transform: `scale(${shixuenScale})`, transformOrigin: 'center' };
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={style}
                className={`w-full py-4 px-6 bg-sage/10 hover:bg-sage/20 text-slate-700 font-semibold rounded-2xl transition-all duration-300 text-left ${isSpecial ? 'text-center' : ''}`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <button 
        onClick={() => {
          if (poutCount >= 2) passQuiz();
          else setPoutCount(p => p + 1);
        }}
        className={`mt-8 font-bold text-slate-400 hover:text-pink transition-all duration-300 underline underline-offset-4 decoration-slate-300 hover:decoration-pink ${
          poutCount === 0 ? 'text-xl' : poutCount === 1 ? 'text-base' : 'text-[10px]'
        }`}
      >
        {poutCount === 0 ? '撅嘴过关' : poutCount === 1 ? '尊都要撅嘴过关吗' : 'haobaaaa 撅嘴过关吧'}
      </button>

      {/* Temporary Test Button */}
      <button 
        onClick={() => {
          setCurrentQIndex(prev => (prev + 1) % QUIZ_QUESTIONS.length);
          setShixuenScale(1);
          setJunxiiScale(1);
        }}
        className="mt-6 text-[11px] text-slate-300 hover:text-slate-500 underline decoration-slate-300"
      >
        [测试专用: 切换下一题 (Next Q)]
      </button>

      {/* Modal Overlay */}
      {(step === 'wrong' || step === 'success') && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-6 backdrop-blur-md animate-[overlayEnter_0.3s_ease-out]">
          <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 flex flex-col items-center justify-between w-[280px] h-[280px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative border border-white/60 animate-[modalEnter_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            {step === 'wrong' ? (
              <>
                <div className="text-xl tracking-wider text-slate-800 mt-1 font-bold">
                  你竟然答错！
                </div>
                <div className="w-24 h-24 flex justify-center items-center opacity-90 drop-shadow-sm">
                  <img src="/boysad1.png" alt="Sad Boy" className="w-full h-full object-contain" />
                </div>
                <div className="text-sm tracking-wide text-slate-500 font-medium">
                  我生气气了！
                </div>
                <button 
                  onClick={() => setStep('quiz')}
                  className="bg-slate-800 text-white px-6 py-2.5 rounded-2xl text-sm font-bold tracking-widest shadow-md hover:bg-slate-700 hover:-translate-y-0.5 transition-all flex items-center justify-center w-full"
                >
                  我要重答
                </button>
              </>
            ) : (
              <>
                <div className="text-xl tracking-wider text-slate-800 mt-1 font-bold">
                  耶！答对啦！
                </div>
                <div className="w-24 h-24 flex justify-center items-center opacity-90 drop-shadow-sm">
                  <img src="/boyhappy1.png" alt="Happy Boy" className="w-full h-full object-contain" />
                </div>
                <div className="text-sm tracking-wide text-slate-500 font-medium">
                  你最懂我了！
                </div>
                <button 
                  onClick={() => passQuiz()}
                  className="bg-pink text-white px-6 py-2.5 rounded-2xl text-sm font-bold tracking-widest shadow-md shadow-pink/30 hover:bg-pink/90 hover:-translate-y-0.5 transition-all flex items-center justify-center w-full"
                >
                  进入记录器
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        
        @keyframes overlayEnter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalEnter {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default QuizGate;

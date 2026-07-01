import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Heart, History } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: <Home size={24} />, label: '首页' },
    { to: '/log', icon: <UtensilsCrossed size={24} />, label: '记录' },
    { to: '/points', icon: <Heart size={24} />, label: 'Boo Points' },
    { to: '/history', icon: <History size={24} />, label: '历史' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white rounded-t-4xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-pink/20 h-[95px] flex justify-around items-start pt-3 px-4 pb-6 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 transition-all duration-300 ${
              isActive ? 'text-pink scale-110' : 'text-slate-400 hover:text-pink/70'
            }`
          }
        >
          {item.icon}
          <span className="text-[10px] font-semibold mt-1 whitespace-nowrap">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;

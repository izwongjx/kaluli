import React from 'react';

// A simple cute SVG chibi boy placeholder
export const AvatarHim = ({ calorieStatus = "under_800", className = "" }) => {
  // Determine expression
  let eye = <path d="M 35 45 Q 40 40 45 45 M 55 45 Q 60 40 65 45" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />;
  let mouth = <path d="M 45 55 Q 50 65 55 55" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />;
  let extra = null;

  if (calorieStatus === "under_800") {
    // Big smile
    mouth = <path d="M 40 55 Q 50 70 60 55 Z" fill="#ff7da9" stroke="#333" strokeWidth="2" strokeLinejoin="round" />;
  } else if (calorieStatus === "800_1200") {
    // Normal smile
    mouth = <path d="M 45 55 Q 50 60 55 55" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />;
  } else if (calorieStatus === "1200_1500") {
    // Worried
    eye = <path d="M 35 42 Q 40 40 45 42 M 55 42 Q 60 40 65 42" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />;
    mouth = <path d="M 45 58 Q 50 55 55 58" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />;
  } else if (calorieStatus === "1500_1600") {
    // Nervous sweat drop
    mouth = <path d="M 45 55 Q 50 52 55 55" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />;
    extra = <path d="M 70 30 Q 75 35 70 40 Q 65 35 70 30" fill="#a4d1ff" />;
  } else if (calorieStatus === "over_1600") {
    // Crying
    eye = <path d="M 35 45 L 45 40 M 35 40 L 45 45 M 55 40 L 65 45 M 55 45 L 65 40" stroke="#333" strokeWidth="3" strokeLinecap="round" />;
    mouth = <path d="M 45 58 Q 50 52 55 58" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />;
    extra = <>
      <path d="M 35 50 V 65" stroke="#a4d1ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 4" />
      <path d="M 65 50 V 65" stroke="#a4d1ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 4" />
    </>;
  }

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        {/* Hair Back */}
        <circle cx="50" cy="45" r="35" fill="#6b4c3a" />
        {/* Face */}
        <circle cx="50" cy="50" r="30" fill="#ffe0d2" />
        {/* Rosy Cheeks */}
        <ellipse cx="32" cy="52" rx="6" ry="3" fill="#ffb5c8" opacity="0.6" />
        <ellipse cx="68" cy="52" rx="6" ry="3" fill="#ffb5c8" opacity="0.6" />
        {/* Eyes & Mouth */}
        {eye}
        {mouth}
        {/* Hair Front (Messy) */}
        <path d="M 20 40 Q 30 20 50 20 Q 70 20 80 40 Q 65 15 50 25 Q 35 15 20 40 Z" fill="#5c3a21" />
        <path d="M 40 20 L 45 35 L 50 22 L 55 35 L 60 20 Z" fill="#5c3a21" />
        {/* T-shirt (bottom edge) */}
        <path d="M 30 80 Q 50 70 70 80 L 75 100 L 25 100 Z" fill="#222" />
        {extra}
      </svg>
    </div>
  );
};

export const AvatarHer = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        {/* Hair Back (Long wavy orange-red) */}
        <path d="M 20 50 Q 15 80 25 100 L 75 100 Q 85 80 80 50 Z" fill="#d95c32" />
        <circle cx="50" cy="45" r="35" fill="#e86a3e" />
        {/* Face */}
        <circle cx="50" cy="50" r="28" fill="#ffdfc4" />
        {/* Rosy Cheeks */}
        <ellipse cx="32" cy="52" rx="5" ry="3" fill="#ffb5c8" opacity="0.8" />
        <ellipse cx="68" cy="52" rx="5" ry="3" fill="#ffb5c8" opacity="0.8" />
        {/* Eyes */}
        <path d="M 35 45 Q 40 40 45 45" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 55 45 Q 60 40 65 45" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Soft Smile */}
        <path d="M 45 55 Q 50 60 55 55" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Hair Front / Bangs */}
        <path d="M 25 40 Q 50 20 75 40 Q 60 25 50 30 Q 40 25 25 40 Z" fill="#e86a3e" />
      </svg>
    </div>
  );
};

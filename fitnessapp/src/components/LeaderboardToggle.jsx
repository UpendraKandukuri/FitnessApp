'use client';

import { useState } from 'react';

export default function LeaderboardToggle() {
  const [isVisible, setIsVisible] = useState(false);

  const leaderboardData = [
    { name: 'Alice', score: 120 },
    { name: 'Bob', score: 110 },
    { name: 'Charlie', score: 95 },
  ];

  function handleClick() {
    setIsVisible(!isVisible);
  }

  
  const maxScore = Math.max(...leaderboardData.map(user => user.score));
  const maxBarWidth = 300; 

  return (
    <div className="p-6 text-white min-h-[300px] rounded-lg shadow-lg max-w-xl mx-auto">
      <button
        onClick={handleClick}
        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition-transform duration-300"
      >
        {isVisible ? 'Hide Leaderboard' : 'Show Leaderboard'}
      </button>

      {isVisible && (
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 ring-1 ring-white/20">
          <h2 className="text-2xl font-bold mb-6 border-b border-white/30 pb-2 flex items-center gap-2">
            🏆 Leaderboard
          </h2>

          {leaderboardData.map((user, idx) => {
            
            const barWidth = (user.score / maxScore) * maxBarWidth;
            return (
              <div key={idx} className="mb-6 last:mb-0">
                <div className="flex justify-between mb-1 font-semibold text-white">
                  <span>{user.name}</span>
                  <span>{user.score} points</span>
                </div>
                <div className="bg-gray-800 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${barWidth}px` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


import React, { useState, useEffect } from 'react';

const LiveStatus: React.FC = () => {
  const [time, setTime] = useState('');
  const [status, setStatus] = useState({ text: '', color: 'bg-gray-500' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      // Calculate time in Chennai (Asia/Kolkata)
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true } as const;
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      
      const chennaiDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const hour = chennaiDate.getHours();

      // Default Status: Recharging
      let statusText = "Recharging 💤";
      let statusColor = "bg-neo-orange"; 

      // 10 AM to 6 PM IST: Working
      if (hour >= 10 && hour < 18) {
        statusText = "Shipping Code 💻";
        statusColor = "bg-neo-green";
      }

      setTime(timeString);
      setStatus({ text: statusText, color: statusColor });
    };

    update();
    const interval = setInterval(update, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white dark:bg-neo-dark-surface border-2 border-black dark:border-neo-dark-border shadow-neo-sm rounded-full mb-8 animate-[fadeIn_1s_ease-out] hover:scale-105 transition-transform select-none">
      <div className={`w-3 h-3 rounded-full ${status.color} animate-pulse border border-black`} />
      <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wide text-black dark:text-neo-dark-text">
        IST {time} • {status.text}
      </span>
    </div>
  );
};

export default React.memo(LiveStatus);

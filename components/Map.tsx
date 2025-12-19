import React, { useState } from 'react';
import { MapUser } from '../types';
import { Navigation, Shield } from 'lucide-react';

const mockUsers: MapUser[] = [
  { id: '1', x: 50, y: 50, aqi: 42, name: 'You' },
  { id: '2', x: 20, y: 30, aqi: 45, name: 'Siti (Bangsar)' },
  { id: '3', x: 75, y: 25, aqi: 110, name: 'Ravi (Brickfields)' }, // Near hotspot
  { id: '4', x: 65, y: 70, aqi: 22, name: 'Wei Ming (PJ)' },
  { id: '5', x: 30, y: 80, aqi: 15, name: 'Jenny (Sunway)' },
];

export const Map: React.FC = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [scale, setScale] = useState(1);

  const handleLocate = () => {
    setIsLocating(true);
    // Zoom IN to user instead of out, to avoid showing empty margins
    setScale(1.2); 
    setTimeout(() => {
        setIsLocating(false);
        setScale(1); 
    }, 1500);
  };

  return (
    <div className="h-full relative bg-[#121212] overflow-hidden flex flex-col rounded-b-[2.5rem]">
      {/* Map Header Overlay - Glassmorphism */}
      <div className="absolute top-4 left-4 right-4 z-20 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-[20px] shadow-lg flex justify-between items-center">
        <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
               Community Map
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">1,240 active sensors</p>
        </div>
        <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,230,118,0.5)]"></span>
            <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
        </div>
      </div>

      {/* Simulated Map Container */}
      <div className="flex-1 relative w-full h-full overflow-hidden">
        <div 
            className="w-full h-full relative transition-transform duration-1000 ease-in-out origin-center"
            style={{ transform: `scale(${scale})` }}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.03]" 
                style={{ 
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px'
                }} 
            />

            {/* Haze Hotspot: Cheras - Red Pill Badge Style */}
            <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-danger/10 rounded-full blur-[60px] animate-pulse pointer-events-none" />
            <div className="absolute top-[28%] right-[23%]">
                 <div className="bg-danger/20 border border-danger/20 backdrop-blur-sm text-danger text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger animate-ping" />
                    Haze Alert: Cheras
                 </div>
            </div>
            
            {/* Roads (Abstract) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                <path d="M-50 400 Q 200 350 500 400" stroke="white" strokeWidth="8" fill="none" />
                <path d="M100 0 Q 150 400 100 900" stroke="white" strokeWidth="6" fill="none" />
                <path d="M400 0 Q 300 300 400 900" stroke="white" strokeWidth="6" fill="none" />
            </svg>

            {/* User Dots - Smaller & More Precise */}
            {mockUsers.map((user) => {
            const isMe = user.id === '1';
            const isDanger = user.aqi > 100;
            
            // Smaller dots (w-3 h-3)
            let colorClass = 'bg-primary shadow-[0_0_10px_rgba(0,230,118,0.8)]';
            if (isDanger) colorClass = 'bg-danger shadow-[0_0_10px_rgba(239,68,68,0.8)]';

            return (
                <div 
                key={user.id}
                className="absolute group cursor-pointer transition-all hover:scale-125 hover:z-50"
                style={{ left: `${user.x}%`, top: `${user.y}%` }}
                >
                {/* Ping Animation - Larger & Thinner */}
                <div className={`absolute -inset-3 rounded-full opacity-30 animate-ping ${isDanger ? 'bg-danger' : 'bg-primary'}`} />
                
                {/* Dot */}
                <div className={`relative w-3 h-3 rounded-full border-[2px] border-[#0a0a0a] ${colorClass}`}>
                    {isMe && <div className="absolute inset-0 flex items-center justify-center"><div className="w-0.5 h-0.5 bg-black rounded-full"></div></div>}
                </div>

                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-xl whitespace-nowrap z-50 pointer-events-none ${isMe ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-300 scale-90 group-hover:scale-100`}>
                    <div className="text-[10px] font-bold text-white">{user.name}</div>
                    <div className={`text-[9px] font-medium ${isDanger ? 'text-danger' : 'text-primary'}`}>AQI: {user.aqi}</div>
                    {/* Tiny arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/80"></div>
                </div>
                </div>
            );
            })}
        </div>

        {/* Locate Button */}
        <button 
            onClick={handleLocate}
            className="absolute bottom-8 right-6 w-12 h-12 bg-white text-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center hover:scale-110 transition-all active:scale-95 z-30"
        >
            {isLocating ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <Navigation className="w-5 h-5 fill-black" />
            )}
        </button>
      </div>
    </div>
  );
};
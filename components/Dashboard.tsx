import React, { useEffect, useState } from 'react';
import { Wind, Zap, RefreshCw, Check, Clock } from 'lucide-react';
import { DeviceStatus } from '../types';

interface DashboardProps {
  deviceStatus: DeviceStatus;
}

export const Dashboard: React.FC<DashboardProps> = ({ deviceStatus }) => {
  const [aqi, setAqi] = useState(42);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationSuccess, setCalibrationSuccess] = useState(false);

  // Simulate live data fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setAqi(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1 to +1
        const newValue = prev + change;
        return newValue < 35 ? 35 : newValue > 55 ? 55 : newValue;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const handleCalibrate = () => {
    if (isCalibrating) return;
    setIsCalibrating(true);
    setCalibrationSuccess(false);
    
    // 2 second calibration simulation
    setTimeout(() => {
        setIsCalibrating(false);
        setCalibrationSuccess(true);
        setTimeout(() => setCalibrationSuccess(false), 3000); // Hide success msg after 3s
    }, 2000);
  };

  // Ring Calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(aqi, 100); 
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  let aqiColor = 'text-primary';
  let ringColor = '#00E676';
  let statusText = 'Good';

  if (aqi > 50) { aqiColor = 'text-yellow-400'; ringColor = '#FACC15'; statusText = 'Moderate'; }
  if (aqi > 100) { aqiColor = 'text-danger'; ringColor = '#EF4444'; statusText = 'Unhealthy'; }

  return (
    <div className="px-6 py-2 animate-fade-in relative flex flex-col h-full justify-between gap-4">
      {/* Header with Compact Actions */}
      <header className="flex justify-between items-start pt-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Morning, Amirul</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">KLCC Park area is clear.</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Compact Action Buttons */}
          <button 
            onClick={handleSync}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Sync"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-brand' : ''}`} />
          </button>
          
          <button 
            onClick={handleCalibrate}
            disabled={isCalibrating || calibrationSuccess}
            className={`w-8 h-8 rounded-full border flex items-center justify-center active:scale-95 transition-all ${
              calibrationSuccess 
                ? 'bg-primary/20 border-primary/50 text-primary' 
                : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Calibrate"
          >
            {isCalibrating ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : calibrationSuccess ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Zap className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Status Badge */}
          <div className={`h-8 px-2.5 rounded-full text-[10px] font-bold border flex items-center gap-1.5 backdrop-blur-md ${
            deviceStatus.isConnected ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-red-500/5 border-red-500/20 text-red-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${deviceStatus.isConnected ? 'bg-primary shadow-[0_0_8px_rgba(0,230,118,0.6)]' : 'bg-red-500'}`} />
            {deviceStatus.isConnected ? 'Online' : 'Offline'}
          </div>
        </div>
      </header>

      {/* Main Stats Area - AQI Ring Card */}
      <div className="bg-gradient-to-br from-white/10 to-transparent rounded-[32px] p-6 border border-white/5 relative overflow-hidden shadow-2xl backdrop-blur-sm flex-shrink-0 flex-1 flex flex-col justify-center min-h-[320px] max-h-[400px]">
        <div className="absolute top-[-20px] right-[-20px] opacity-[0.03] pointer-events-none">
          <Wind className="w-48 h-48" />
        </div>
        
        <div className="flex flex-col items-center justify-center z-10 relative py-2">
          <div className="relative mb-8">
             {/* SVG Ring */}
            <svg width="200" height="200" className="transform -rotate-90">
              <circle cx="100" cy="100" r={radius} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="10" fill="transparent" />
              <circle
                cx="100" cy="100" r={radius}
                stroke={ringColor} strokeWidth="10" fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(0,230,118,0.2)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-6xl font-light ${aqiColor} transition-colors tracking-tighter`}>{aqi}</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">AQI MY</span>
            </div>
          </div>

          <div className="text-center w-full">
            <h2 className="text-xl font-medium text-white mb-6 tracking-tight">{statusText} Air Quality</h2>
            
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <span className="text-[10px] text-gray-500 block mb-1 font-semibold uppercase tracking-wider">PM2.5</span>
                <span className="text-lg font-medium text-white">12 <span className="text-[10px] text-gray-500 font-normal">µg/m³</span></span>
              </div>
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <span className="text-[10px] text-gray-500 block mb-1 font-semibold uppercase tracking-wider">Humidity</span>
                <span className="text-lg font-medium text-white">78 <span className="text-[10px] text-gray-500 font-normal">%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast Section */}
      <div className="space-y-3 pb-2">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            Hourly Forecast
          </h3>
          <span className="text-[10px] text-gray-500 font-medium">KLCC Station</span>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
           {/* Now */}
           <div className="bg-white/5 border border-white/5 rounded-2xl p-3 pt-4 pb-4 flex flex-col items-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <span className="text-[10px] text-gray-400 font-medium">Now</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,230,118,0.8)]"></div>
              <span className="text-lg font-semibold text-white">12</span>
           </div>
           
           {/* 10 AM */}
           <div className="bg-white/5 border border-white/5 rounded-2xl p-3 pt-4 pb-4 flex flex-col items-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <span className="text-[10px] text-gray-400 font-medium">10 AM</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-50"></div>
              <span className="text-lg font-medium text-white/90">15</span>
           </div>
           
           {/* 11 AM - Warning */}
           <div className="bg-white/10 border border-white/10 rounded-2xl p-3 pt-4 pb-4 flex flex-col items-center gap-2 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-yellow-400/5 pointer-events-none"></div>
              <span className="text-[10px] text-yellow-100 font-medium">11 AM</span>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse"></div>
              <span className="text-lg font-bold text-white">45</span>
           </div>
           
           {/* 12 PM */}
           <div className="bg-white/5 border border-white/5 rounded-2xl p-3 pt-4 pb-4 flex flex-col items-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <span className="text-[10px] text-gray-400 font-medium">12 PM</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-50"></div>
              <span className="text-lg font-medium text-white/90">12</span>
           </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { DeviceStatus } from '../types';
import { Search, Bluetooth, Smartphone, XCircle } from 'lucide-react';

interface DeviceManagerProps {
  deviceStatus: DeviceStatus;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const DeviceManager: React.FC<DeviceManagerProps> = ({ deviceStatus, onConnect, onDisconnect }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [autoSyncOn, setAutoSyncOn] = useState(true);

  const handleScan = () => {
    if (deviceStatus.isConnected) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onConnect();
    }, 3000);
  };

  // iOS-style Switch Component - Standard Size
  const Switch = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
    <div 
        onClick={onToggle}
        className={`w-11 h-6 rounded-full p-[2px] cursor-pointer transition-colors duration-300 ease-in-out ${
            isOn ? 'bg-primary' : 'bg-white/20'
        }`}
    >
        <div 
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isOn ? 'translate-x-5' : 'translate-x-0'
            }`} 
        />
    </div>
  );

  return (
    <div className="px-6 py-6 space-y-8 animate-fade-in pb-24">
      <header>
         <h1 className="text-2xl font-bold text-white tracking-tight">My Device</h1>
         <p className="text-gray-400 text-sm">Manage your AirSense Clip.</p>
      </header>

      {/* Device Visualizer Card */}
      <div className="relative group">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-black rounded-[3rem] blur-xl opacity-70"></div>
          
          <div className="bg-gradient-to-br from-[#1c1c1e] to-black rounded-[32px] border border-white/5 p-8 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden shadow-2xl z-10">
               
               {/* Spotlight */}
               <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[150%] h-full bg-gradient-to-b from-white/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-30"></div>
               
               {/* Connection Animation */}
               {(isScanning || deviceStatus.isConnected) && (
                 <>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-primary/5 rounded-full animate-ping opacity-20 pointer-events-none duration-[3s]"></div>
                 </>
               )}
               
               {/* Image Device Representation */}
               <div className={`relative z-20 transition-all duration-700 ${isScanning ? 'animate-bounce' : ''} mb-6`}>
                 <img 
                    src="https://i.imgur.com/MRHyMIi.png" 
                    alt="AirSense Clip"
                    className={`w-60 h-60 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${
                        deviceStatus.isConnected 
                        ? 'brightness-105' 
                        : 'grayscale opacity-60 blur-[1px]'
                    } transition-all duration-700`}
                 />
               </div>

               {/* Text Status - moved below image */}
               <div className="flex flex-col items-center gap-1 z-20">
                    <div className="flex items-center gap-2">
                         <h2 className="text-lg font-bold text-white tracking-tight">AirSense Clip</h2>
                         {deviceStatus.isConnected && (
                             <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                                 <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_5px_#00E676]"></span>
                                 <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Online</span>
                             </div>
                         )}
                    </div>
                    <p className="text-xs font-medium text-gray-500">
                        {isScanning ? 'Searching nearby...' : deviceStatus.isConnected ? 'Connected to iPhone 14 Pro' : 'Not Connected'}
                    </p>
               </div>
          </div>
      </div>

      {/* Settings Controls - Grouped & Compact */}
      <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-2">Configurations</h3>
            
            <div className="bg-[#1c1c1e] border border-white/5 rounded-[24px] overflow-hidden divide-y divide-white/5">
                {/* Bluetooth */}
                <div className="flex items-center justify-between p-4 pl-5">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Bluetooth className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-sm font-semibold text-white">Bluetooth</h4>
                        </div>
                    </div>
                    <Switch isOn={bluetoothOn} onToggle={() => setBluetoothOn(!bluetoothOn)} />
                </div>
                
                {/* Auto-Sync */}
                <div className="flex items-center justify-between p-4 pl-5">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-purple-500" />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-sm font-semibold text-white">Auto-Sync</h4>
                        </div>
                    </div>
                    <Switch isOn={autoSyncOn} onToggle={() => setAutoSyncOn(!autoSyncOn)} />
                </div>
            </div>

          <div className="pt-2">
            {!deviceStatus.isConnected ? (
              <button
                onClick={handleScan}
                disabled={isScanning}
                className={`w-full py-4 rounded-[24px] font-bold text-black text-sm tracking-wide transition-all flex items-center justify-center gap-2 relative overflow-hidden group ${
                  isScanning 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-primary hover:bg-green-400 shadow-[0_0_30px_rgba(0,230,118,0.2)] hover:shadow-[0_0_50px_rgba(0,230,118,0.4)] transform active:scale-98'
                }`}
              >
                {isScanning ? 'Scanning...' : (
                  <>
                    <Search className="w-4 h-4" />
                    Scan for Device
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={onDisconnect}
                className="w-full py-4 rounded-[24px] font-bold text-red-500 text-sm bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <XCircle className="w-4 h-4" />
                Disconnect Device
              </button>
            )}
          </div>
      </div>
    </div>
  );
};
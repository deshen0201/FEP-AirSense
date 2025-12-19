import React, { useState } from 'react';
import { ViewState, DeviceStatus } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { Map } from './components/Map';
import { DeviceManager } from './components/DeviceManager';
import { Wind, Lock, ArrowRight, Signal, Wifi, Battery } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  
  // Shared state for device simulated status
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    isConnected: true,
    batteryLevel: 84,
    lastSynced: new Date(),
    isScanning: false
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleDeviceConnect = () => {
    setDeviceStatus(prev => ({ ...prev, isConnected: true }));
  };

  const handleDeviceDisconnect = () => {
    setDeviceStatus(prev => ({ ...prev, isConnected: false }));
  };

  // Status Bar Component
  const StatusBar = () => (
    <div className="absolute top-0 left-0 right-0 h-12 px-6 flex justify-between items-center text-white text-[10px] font-medium z-50 pointer-events-none tracking-widest">
      <span className="font-bold">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-3 h-3 fill-current" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-4 h-4 fill-current" />
      </div>
    </div>
  );

  // Dynamic Island
  const DynamicIsland = () => (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-[20px] z-50 flex items-center justify-center pointer-events-none ring-1 ring-white/5 shadow-2xl">
      <div className="w-full h-full relative overflow-hidden rounded-[20px]">
         {/* Internal reflection */}
         <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20"></div>
         {/* Sensor cutout simulation */}
         <div className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1a1a1a] blur-[2px]"></div>
      </div>
    </div>
  );

  // Auth View Content
  const AuthScreen = () => (
    <div className="h-full bg-[#0a0a0a] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="absolute top-[-20%] right-[-50%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-50%] w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-[24px] bg-gradient-to-tr from-brand to-primary flex items-center justify-center shadow-[0_0_60px_rgba(0,230,118,0.2)] mb-8 ring-1 ring-white/20">
          <Wind className="w-10 h-10 text-black" />
        </div>
        
        <h1 className="text-3xl font-light text-center text-white mb-2 tracking-tight">AirSense</h1>
        <p className="text-gray-500 text-center mb-10 text-sm font-medium">Breathe smarter.</p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="space-y-1">
            <input 
              type="email" 
              placeholder="Email Address"
              defaultValue="amirul@airsense.my"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all backdrop-blur-md"
            />
          </div>
          <div className="space-y-1">
            <input 
              type="password" 
              placeholder="Password"
              defaultValue="password123"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all backdrop-blur-md"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-green-400 text-black font-bold text-sm py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(0,230,118,0.2)] hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] flex items-center justify-center gap-2 mt-4 transform active:scale-95 tracking-wide"
          >
            <Lock className="w-4 h-4" />
            Sign In
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-gray-600 font-medium tracking-wide">
          By continuing, you agree to our <span className="text-gray-400">Terms of Service</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans selection:bg-primary/30">
      {/* Phone Chassis - iPhone 14 Pro Simulation */}
      <div className="relative w-full max-w-[400px] h-[850px] bg-[#000] rounded-[3.5rem] border-[8px] border-[#1a1a1a] overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col z-0">
        
        {/* Ambient Light Source */}
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-black to-transparent pointer-events-none z-0" />

        <DynamicIsland />
        <StatusBar />

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col z-10">
          {!isAuthenticated ? (
            <AuthScreen />
          ) : (
            <Layout 
              currentView={currentView} 
              onChangeView={setCurrentView}
              onLogout={() => setIsAuthenticated(false)}
            >
              {currentView === 'dashboard' && <Dashboard deviceStatus={deviceStatus} />}
              {currentView === 'analytics' && <Analytics />}
              {currentView === 'map' && <Map />}
              {currentView === 'device' && (
                <DeviceManager 
                  deviceStatus={deviceStatus} 
                  onConnect={handleDeviceConnect}
                  onDisconnect={handleDeviceDisconnect}
                />
              )}
            </Layout>
          )}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none backdrop-blur-md" />
      </div>
    </div>
  );
}

export default App;
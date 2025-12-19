import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Activity, Map as MapIcon, Cpu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'analytics', label: 'Biometrics', icon: Activity },
    { id: 'map', label: 'Community', icon: MapIcon },
    { id: 'device', label: 'Device', icon: Cpu },
  ];

  return (
    <div className="flex flex-col h-full w-full text-white relative">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-14 pb-24 scrollbar-hide">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar - iOS Style */}
      <nav className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 z-40 rounded-b-[3.5rem]">
        <div className="flex justify-around items-center px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`flex flex-col items-center justify-center w-full space-y-1 transition-all duration-300 active:scale-95 group`}
              >
                <div className={`relative p-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-400'}`}>
                   <Icon className="w-6 h-6 stroke-[1.5px]" />
                </div>
                <span className={`text-[10px] font-medium tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
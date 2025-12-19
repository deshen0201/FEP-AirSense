import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  Tooltip,
  Area,
  XAxis,
  YAxis
} from 'recharts';
import { AlertCircle, ChevronRight, X, TrendingUp } from 'lucide-react';

// Mock Data Sets (Same as before)
const data1H = [
  { time: '08:00', heartRate: 72, pm25: 12 },
  { time: '08:10', heartRate: 85, pm25: 15 },
  { time: '08:20', heartRate: 145, pm25: 45 },
  { time: '08:30', heartRate: 158, pm25: 52 },
  { time: '08:40', heartRate: 145, pm25: 25 },
  { time: '08:50', heartRate: 95, pm25: 14 },
  { time: '09:00', heartRate: 74, pm25: 12 },
];

const data24H = [
  { time: '12AM', heartRate: 60, pm25: 10 },
  { time: '4AM', heartRate: 55, pm25: 8 },
  { time: '8AM', heartRate: 110, pm25: 45 },
  { time: '12PM', heartRate: 85, pm25: 30 },
  { time: '4PM', heartRate: 90, pm25: 55 },
  { time: '8PM', heartRate: 75, pm25: 25 },
  { time: '11PM', heartRate: 65, pm25: 15 },
];

const data7D = [
  { time: 'Mon', heartRate: 75, pm25: 20 },
  { time: 'Tue', heartRate: 72, pm25: 18 },
  { time: 'Wed', heartRate: 78, pm25: 45 },
  { time: 'Thu', heartRate: 74, pm25: 22 },
  { time: 'Fri', heartRate: 80, pm25: 55 },
  { time: 'Sat', heartRate: 140, pm25: 15 },
  { time: 'Sun', heartRate: 65, pm25: 10 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/90 border border-white/10 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-gray-400 text-[10px] mb-1 font-medium">{label}</p>
        <div className="space-y-1">
          <p className="text-xs font-bold text-danger flex items-center gap-2">
            Heart: {payload[0].value} bpm
          </p>
          <p className="text-xs font-bold text-primary flex items-center gap-2">
            PM2.5: {payload[1].value} µg/m³
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const Analytics: React.FC = () => {
  const [range, setRange] = useState<'1H' | '24H' | '7D'>('1H');
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);

  const getData = () => {
    switch(range) {
        case '1H': return data1H;
        case '24H': return data24H;
        case '7D': return data7D;
        default: return data1H;
    }
  };

  return (
    <div className="px-6 py-4 space-y-6 animate-fade-in relative pb-10">
      <div className="flex flex-col gap-4">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Biometrics</h1>
           <p className="text-gray-400 text-sm">Real-time correlation analysis.</p>
        </div>
        
        {/* Interactive Filters - iOS Segmented Control Style */}
        <div className="flex bg-white/5 p-1 rounded-xl">
            {(['1H', '24H', '7D'] as const).map((r) => (
                <button 
                    key={r}
                    onClick={() => setRange(r)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        range === r ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                    {r}
                </button>
            ))}
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-gradient-to-br from-white/5 to-transparent rounded-[32px] p-5 border border-white/5 h-[340px] relative shadow-2xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand" /> Trends
            </h3>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                    <span className="text-[10px] text-gray-400 font-medium">Heart</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,230,118,0.5)]"></div>
                    <span className="text-[10px] text-gray-400 font-medium">PM2.5</span>
                </div>
            </div>
        </div>

        <ResponsiveContainer width="100%" height="82%">
          <ComposedChart data={getData()} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E676" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#00E676" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#444" 
              tick={{fill: '#666', fontSize: 10, fontWeight: 500}} 
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              dy={10}
            />
            <YAxis yAxisId="left" hide={true} domain={['auto', 'auto']} />
            <YAxis yAxisId="right" hide={true} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} cursor={{stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1}} />
            
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="heartRate" 
              stroke="#EF4444" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorHr)" 
              animationDuration={1500}
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="pm25" 
              stroke="#00E676" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPm)" 
              animationDuration={1500}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Alert */}
      <div className="bg-brand/5 rounded-[24px] p-5 border border-brand/10 flex items-start gap-4">
        <div className="mt-0.5 p-1 bg-brand/10 rounded-full">
            <AlertCircle className="w-4 h-4 text-brand" />
        </div>
        <div>
            <h3 className="text-sm font-bold text-white mb-1">Correlation Alert</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Heart rate spiked to <span className="text-white">158 bpm</span> during high PM2.5 exposure (52 µg/m³).
            </p>
        </div>
      </div>
      
      {/* Weekly Report Button */}
      <button 
        onClick={() => setShowWeeklyReport(true)}
        className="w-full bg-white/5 hover:bg-white/10 rounded-[24px] p-5 border border-white/5 flex items-center justify-between group transition-all active:scale-98"
      >
        <div className="text-left">
            <h3 className="text-sm font-semibold text-white">Weekly Report</h3>
            <p className="text-gray-500 text-xs mt-1">Avg AQI Exposure: 15 (Excellent)</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white" />
        </div>
      </button>

      {/* Weekly Report Modal */}
      {showWeeklyReport && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-2">
           <div className="w-full bg-[#121212] rounded-[32px] border border-white/10 p-6 pb-12 shadow-2xl animate-slide-up mb-2">
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6"></div>
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold text-white tracking-tight">Weekly Summary</h2>
                 <button onClick={() => setShowWeeklyReport(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4 text-white" />
                 </button>
              </div>
              
              <div className="space-y-4">
                 <div className="p-5 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border border-primary/10">
                    <div className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Weekly Average</div>
                    <div className="text-4xl font-light text-white tracking-tighter">15 <span className="text-sm font-normal text-gray-400">AQI</span></div>
                 </div>

                 <div className="grid grid-cols-7 gap-2 mt-4 h-32 items-end">
                    {['M','T','W','T','F','S','S'].map((day, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                            <div className="w-full bg-white/5 rounded-full relative overflow-hidden flex items-end transition-all hover:bg-white/10" style={{ height: '100%' }}>
                                <div 
                                    className={`w-full rounded-full absolute bottom-0 transition-all duration-1000 ${i === 4 ? 'bg-yellow-400' : 'bg-primary'}`} 
                                    style={{ height: `${Math.random() * 60 + 20}%`}}
                                ></div>
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium group-hover:text-white transition-colors">{day}</span>
                        </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
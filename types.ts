export type ViewState = 'auth' | 'dashboard' | 'analytics' | 'map' | 'device';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface DeviceStatus {
  isConnected: boolean;
  batteryLevel: number;
  lastSynced: Date;
  isScanning: boolean;
}

export interface BiometricData {
  time: string;
  heartRate: number;
  pm25: number;
}

export interface MapUser {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  aqi: number;
  name: string;
}
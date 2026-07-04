import * as lucide from 'lucide-react';

const icons = [
  'ArrowRight', 'BarChart3', 'Leaf', 'Settings', 'ShieldCheck', 'Zap', 'Server', 'Trash2', 'Building', 'Building2', 'Cpu', 'LineChart', 'Wifi', 'Database', 'Map',
  'CheckCircle2', 'MonitorSmartphone', 'AlertTriangle', 'TrendingDown', 'BatteryCharging', 'Sun', 'Lock', 'Route', 'Smartphone',
  'Plane', 'Train', 'GraduationCap', 'Stethoscope', 'Factory', 'Home', 'Landmark',
  'Globe2', 'Lightbulb', 'Users'
];

const missing = [];
for (const icon of icons) {
  if (!lucide[icon]) {
    missing.push(icon);
  }
}

if (missing.length > 0) {
  console.log('Missing icons:', missing.join(', '));
} else {
  console.log('All icons exist.');
}

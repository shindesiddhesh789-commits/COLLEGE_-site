import React, { useState, useEffect, useMemo } from 'react';
import {
  Trash2, PieChart, AlertTriangle, DollarSign, Leaf, Clock, Eye,
  Wifi, Battery, Signal, CheckCircle2, XCircle, ArrowUp
} from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import KpiCard from '@/components/dashboard/KpiCard';
import { supabase } from '@/lib/supabase';

ChartJS.register(
  ArcElement, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Tooltip, Legend, Filler
);

ChartJS.defaults.font.family = "'Inter', sans-serif";
ChartJS.defaults.color = '#9ca3af';

// ─── TYPES ───────────────────────────────────
interface FloorData {
  floor: string;
  totalBins: number;
  avgFill: number;
  nearFull: number;
}

interface AlertItem {
  id: string;
  message: string;
  location: string;
  time: string;
  severity: 'High' | 'Medium' | 'Completed';
}


// ─── SEVERITY BADGE ──────────────────────────
function SeverityBadge({ severity }: { severity: string }) {
  const cls =
    severity === 'High'
      ? 'bg-red-100 text-red-600'
      : severity === 'Medium'
        ? 'bg-amber-100 text-amber-600'
        : 'bg-teal-100 text-teal-600';
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>
      {severity}
    </span>
  );
}

// ─── DASHBOARD ───────────────────────────────
export default function Dashboard() {
  const [liveTime, setLiveTime] = useState(new Date());
  const [wasteTrendTab, setWasteTrendTab] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [binsData, setBinsData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBins() {
      const { data, error } = await supabase.from('COLLEGE-BIN').select('*');
      if (error) console.error("Error fetching COLLEGE-BIN:", error);
      else if (data) {
        const mappedData = data.map((b: any, i: number) => ({
          binId: b.device_id || `BIN-${i + 1}`,
          location: b.location || 'Unknown Location',
          fillLevel: typeof b.status === 'number' ? b.status : 0,
          temperature: typeof b.temperature === 'number' ? b.temperature : 24,
          battery: typeof b.battery === 'number' ? b.battery : 100,
          wifi: b['Connection Status'] ? 'Connected' : 'Disconnected'
        }));
        setBinsData(mappedData);
      }
    }
    fetchBins();
    
    const subscription = supabase.channel('realtime-bins')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'COLLEGE-BIN' }, () => {
        fetchBins();
      })
      .subscribe();

    const pollTimer = setInterval(fetchBins, 15000);
    const clockTimer = setInterval(() => setLiveTime(new Date()), 1000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(pollTimer);
      supabase.removeChannel(subscription);
    };
  }, []);
  
  const totalSmartBins = binsData.length;
  const avgFillLevel = totalSmartBins > 0
    ? Math.round(binsData.reduce((acc, bin) => acc + (bin.fillLevel || bin.fill_level || 0), 0) / totalSmartBins)
    : 0;
  
  const bins0to60 = binsData.filter(b => (b.fillLevel || b.fill_level || 0) < 60).length;
  const bins60to80 = binsData.filter(b => (b.fillLevel || b.fill_level || 0) >= 60 && (b.fillLevel || b.fill_level || 0) < 80).length;
  const bins80to100 = binsData.filter(b => (b.fillLevel || b.fill_level || 0) >= 80).length;

  const getPercentage = (count: number) => totalSmartBins > 0 ? Math.round((count / totalSmartBins) * 100) : 0;

  const computedFloorData = useMemo(() => {
    const stats: Record<string, { floor: string, totalBins: number, fillSum: number, nearFull: number }> = {};
    binsData.forEach(bin => {
      const loc = bin.location || bin.Location || 'Various Locations';
      const fill = bin.fill_level || bin.fillLevel || bin['Fill Level'] || 0;
      if (!stats[loc]) {
        stats[loc] = { floor: loc, totalBins: 0, fillSum: 0, nearFull: 0 };
      }
      stats[loc].totalBins += 1;
      stats[loc].fillSum += fill;
      if (fill >= 80) stats[loc].nearFull += 1;
    });

    const floorWeights: Record<string, number> = {
      'Ground Floor': 0,
      'First Floor': 1,
      'Second Floor': 2,
      'Third Floor': 3,
      'Fourth Floor': 4,
      'Fifth Floor': 5,
    };

    return Object.values(stats)
      .map(stat => ({
        floor: stat.floor,
        totalBins: stat.totalBins,
        avgFill: Math.round(stat.fillSum / stat.totalBins),
        nearFull: stat.nearFull
      }))
      .sort((a, b) => {
        const weightA = floorWeights[a.floor] !== undefined ? floorWeights[a.floor] : 99;
        const weightB = floorWeights[b.floor] !== undefined ? floorWeights[b.floor] : 99;
        if (weightA !== weightB) return weightA - weightB;
        return a.floor.localeCompare(b.floor);
      });
  }, [binsData]);

  const computedAlerts = useMemo(() => {
    const newAlerts: AlertItem[] = [];
    binsData.forEach(bin => {
      if (bin.wifi === 'Disconnected') {
        newAlerts.push({ id: `${bin.binId}-wifi`, message: `Bin ${bin.binId} lost connection`, location: bin.location, time: 'Just now', severity: 'High' });
      } else if (bin.battery <= 20) {
        newAlerts.push({ id: `${bin.binId}-battery`, message: `Bin ${bin.binId} battery low (${bin.battery}%)`, location: bin.location, time: 'Just now', severity: 'High' });
      } else if (bin.fillLevel >= 90) {
        newAlerts.push({ id: `${bin.binId}-fill90`, message: `Bin ${bin.binId} is ${bin.fillLevel}% full`, location: bin.location, time: 'Just now', severity: 'High' });
      } else if (bin.fillLevel >= 80) {
        newAlerts.push({ id: `${bin.binId}-fill80`, message: `Bin ${bin.binId} is ${bin.fillLevel}% full`, location: bin.location, time: 'Just now', severity: 'Medium' });
      } else if (bin.fillLevel <= 5) {
        newAlerts.push({ id: `${bin.binId}-empty`, message: `Bin ${bin.binId} was recently emptied`, location: bin.location, time: 'Just now', severity: 'Completed' });
      }
    });
    return newAlerts.sort((a, b) => a.severity === 'High' ? -1 : 1).slice(0, 4);
  }, [binsData]);

  const timeStr = liveTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateStr = `${liveTime.getDate()} ${months[liveTime.getMonth()]} ${liveTime.getFullYear()}`;

  // ─── CHART DATA ────────────────────────────

  // Fill Level Overview Doughnut (left panel)
  const overviewDoughnut = {
    labels: ['0–60%', '60–80%', '80–100%'],
    datasets: [{
      data: [bins0to60, bins60to80, bins80to100],
      backgroundColor: ['#14b8a6', '#f59e0b', '#ef4444'],
      borderWidth: 0,
    }],
  };

  // Fill Level Distribution Doughnut (middle panel)
  const distributionDoughnut = {
    labels: ['0–60%', '60–80%', '80–100%'],
    datasets: [{
      data: [bins0to60, bins60to80, bins80to100],
      backgroundColor: ['#14b8a6', '#f59e0b', '#ef4444'],
      borderWidth: 0,
    }],
  };


  // Fill Level Trend Line
  const fillTrendLine = {
    labels: ['26 Jun', '27 Jun', '28 Jun', '29 Jun', '30 Jun', '1 Jul', '2 Jul'],
    datasets: [{
      label: 'Avg Fill %',
      data: [55, 48, 62, 45, 58, 52, 62],
      borderColor: '#14b8a6',
      backgroundColor: 'rgba(20, 184, 166, 0.08)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#14b8a6',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }],
  };

  // Waste Collected Bar
  const wasteBar = {
    labels: ['26 Jun', '27 Jun', '28 Jun', '29 Jun', '30 Jun', '1 Jul', '2 Jul'],
    datasets: [{
      label: 'Waste (kg)',
      data: [35, 45, 25, 48, 28, 32, 45.6],
      backgroundColor: (ctx: any) => {
        return ctx.dataIndex === 6 ? '#14b8a6' : '#99f6e4';
      },
      borderRadius: 4,
      barPercentage: 0.5,
    }],
  };

  const doughnutCenterPlugin = {
    id: 'doughnutCenter',
    beforeDraw: (chart: any) => {
      const { ctx, chartArea: { width, height, top, left } } = chart;
      ctx.save();
      ctx.font = 'bold 22px Inter, sans-serif';
      ctx.fillStyle = '#1f2937';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const total = chart.data.datasets[0].data.reduce((a: number, b: number) => a + (Number(b) || 0), 0);
      ctx.fillText(total.toString(), left + width / 2, top + height / 2 - 8);
      ctx.font = '500 10px Inter, sans-serif';
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('Total Bins', left + width / 2, top + height / 2 + 12);
      ctx.restore();
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-xl font-bold text-gray-800">SmartBin Dashboard</h1>
          <span className="flex items-center gap-1.5 text-[10px] text-teal-600 font-semibold bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Live
          </span>
        </div>
        <p className="text-sm text-gray-400">Real-time overview of SmartBins across the campus</p>
      </div>

      {/* ─── ROW 1: KPI CARDS ─── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard title="Total SmartBins" value={totalSmartBins} icon={Trash2} subtitle="Tracked in Supabase" />
        <KpiCard title="Average Fill Level" value={`${avgFillLevel}%`} icon={PieChart} trend="Live metrics" trendUp />
        <KpiCard title="Bins Near Full (≥ 80%)" value={bins80to100} icon={AlertTriangle} iconColor="text-red-500" trend={bins80to100 > 0 ? "Requires Attention" : "All Good"} trendUp={false} />
        <KpiCard title="Waste Collected Today" value="45.6" unit="kg" icon={DollarSign} trend="12% vs yesterday" trendUp />
        <KpiCard title="CO₂ Prevented Today" value="6.8" unit="kg" icon={Leaf} trend="10% vs yesterday" trendUp />
        <KpiCard title="Last Updated" value={timeStr} icon={Clock} subtitle={dateStr} />
      </div>

      {/* ─── ROW 2: OVERVIEW + DISTRIBUTION + ALERTS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* SmartBin Fill Level Overview */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700">SmartBin Fill Level Overview</h2>
            <button className="text-[11px] text-teal-600 font-semibold hover:underline flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> View as List
            </button>
          </div>
          <div className="flex gap-5">
            {/* Doughnut */}
            <div className="w-[130px] h-[130px] shrink-0 relative">
              <Doughnut
                data={overviewDoughnut}
                plugins={[doughnutCenterPlugin]}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '72%',
                  plugins: { legend: { display: false }, tooltip: { enabled: false } },
                }}
              />
            </div>
            {/* Floor Table */}
            <div className="flex-1 min-w-0">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-gray-400 font-semibold border-b border-gray-100">
                    <td className="pb-2">Floor</td>
                    <td className="pb-2 text-center">Total Bins</td>
                    <td className="pb-2">Average Fill Level</td>
                    <td className="pb-2 text-center">Bins Near Full (≥80%)</td>
                  </tr>
                </thead>
                <tbody>
                  {computedFloorData.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500 italic">No location data available yet.</td>
                    </tr>
                  ) : computedFloorData.map((f) => (
                    <tr key={f.floor} className="border-b border-gray-50">
                      <td className="py-2 text-gray-700 font-medium">{f.floor}</td>
                      <td className="py-2 text-center text-gray-600">{f.totalBins}</td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${f.avgFill >= 80 ? 'bg-red-500' : f.avgFill >= 60 ? 'bg-teal-500' : 'bg-teal-400'}`}
                              style={{ width: `${f.avgFill}%` }}
                            />
                          </div>
                          <span className="text-gray-500 w-8 text-right">{f.avgFill}%</span>
                        </div>
                      </td>
                      <td className={`py-2 text-center font-bold ${f.nearFull > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                        {f.nearFull}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Legend */}
              <div className="flex gap-4 mt-3 text-[10px] text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> 0 - 60% <span className="font-bold text-gray-700">{bins0to60} ({getPercentage(bins0to60)}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 60 - 80% <span className="font-bold text-gray-700">{bins60to80} ({getPercentage(bins60to80)}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> 80 - 100% <span className="font-bold text-gray-700">{bins80to100} ({getPercentage(bins80to100)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fill Level Distribution */}
        <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Fill Level Distribution</h2>
          <div className="h-[150px] relative mx-auto max-w-[200px]">
            <Doughnut
              data={distributionDoughnut}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: { legend: { display: false } },
              }}
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="text-gray-600">0 - 60%</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-800">{bins0to60} Bins</span>
                <span className="text-gray-400 ml-1">({getPercentage(bins0to60)}%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-gray-600">60 - 80%</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-800">{bins60to80} Bins</span>
                <span className="text-gray-400 ml-1">({getPercentage(bins60to80)}%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-gray-600">80 - 100%</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-800">{bins80to100} Bins</span>
                <span className="text-gray-400 ml-1">({getPercentage(bins80to100)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700">Recent Alerts</h2>
            <button className="text-[11px] text-teal-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {computedAlerts.length === 0 ? (
              <div className="py-4 text-center text-[12px] text-gray-500 italic">No recent alerts</div>
            ) : computedAlerts.map((a) => (
              <div key={a.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  a.severity === 'High' ? 'bg-red-50' : a.severity === 'Medium' ? 'bg-amber-50' : 'bg-teal-50'
                }`}>
                  {a.severity === 'Completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  ) : (
                    <AlertTriangle className={`w-4 h-4 ${a.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-700 leading-tight">{a.message}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{a.location}</p>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[10px] text-gray-400 font-medium">{a.time}</span>
                  <SeverityBadge severity={a.severity} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ROW 3: FILL TREND + WASTE TREND ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Fill Level Trend */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 mb-1">
            Fill Level Trend <span className="text-gray-400 font-normal text-[11px]">(Last 7 Days)</span>
          </h2>
          <div className="h-[200px] w-full relative mt-2">
            <Line
              data={fillTrendLine}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: '#1f2937',
                    titleFont: { size: 10 },
                    bodyFont: { size: 12, weight: 'bold' },
                    padding: 8,
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                      label: (ctx: any) => `${ctx.parsed.y}%`,
                    },
                  },
                },
                scales: {
                  y: {
                    max: 100, min: 0,
                    ticks: { stepSize: 25, callback: (val: any) => val + '%', font: { size: 10 } },
                    grid: { color: '#f3f4f6' },
                    border: { display: false },
                  },
                  x: { grid: { display: false }, ticks: { font: { size: 10 } }, border: { display: false } },
                },
              }}
            />
          </div>
        </div>

        {/* Waste Collected Trend */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-gray-700">Waste Collected Trend</h2>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {(['Daily', 'Weekly', 'Monthly'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setWasteTrendTab(tab)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                    wasteTrendTab === tab ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[200px] w-full relative mt-2">
            <Bar
              data={wasteBar}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: '#1f2937',
                    bodyFont: { size: 12, weight: 'bold' },
                    padding: 8,
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                      label: (ctx: any) => `${ctx.parsed.y} kg`,
                    },
                  },
                },
                scales: {
                  y: {
                    max: 60, min: 0,
                    ticks: { stepSize: 15, callback: (val: any) => val + ' kg', font: { size: 10 } },
                    grid: { color: '#f3f4f6' },
                    border: { display: false },
                  },
                  x: { grid: { display: false }, ticks: { font: { size: 10 } }, border: { display: false } },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── ROW 4: BIN STATUS + SYSTEM HEALTH ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bin Status Summary */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Bin Status Summary</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Normal (0-60%)', value: bins0to60, icon: Trash2, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'Moderate (60-80%)', value: bins60to80, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'Near Full (80-100%)', value: bins80to100, icon: Trash2, color: 'text-red-500', bg: 'bg-red-50' },
              { label: 'Out of Service', value: 0, icon: XCircle, color: 'text-gray-400', bg: 'bg-gray-100' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-700 mb-4">System Health</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Connectivity', value: 'Online', sub: 'All Bins Connected', icon: Wifi, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'Battery Status', value: 'Good', sub: 'All Bins', icon: Battery, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'Signal Strength', value: 'Strong', sub: 'Average RSSI -45 dBm', icon: Signal, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'System Uptime', value: '99.6%', sub: 'This Month', icon: CheckCircle2, color: 'text-teal-600', bg: 'bg-teal-50' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <p className="text-sm font-bold text-teal-600">{item.value}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

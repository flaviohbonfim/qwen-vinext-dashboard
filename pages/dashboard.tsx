'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ShoppingCart,
  Eye,
  TrendingUp,
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Fev', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Abr', revenue: 4500 },
  { month: 'Mai', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
  { month: 'Jul', revenue: 7000 },
  { month: 'Ago', revenue: 6500 },
  { month: 'Set', revenue: 8000 },
  { month: 'Out', revenue: 7500 },
  { month: 'Nov', revenue: 9000 },
  { month: 'Dez', revenue: 8500 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
const chartHeight = 280;
const chartWidth = 800;
const padding = 40;

function RevenueChart() {
  const points = revenueData.map((d, i) => {
    const x = padding + (i / (revenueData.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - ((d.revenue / maxRevenue) * (chartHeight - padding * 2));
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = pathD + ` L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`} className="w-full h-full">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const y = chartHeight - padding - ratio * (chartHeight - padding * 2);
        const value = Math.round(maxRevenue * ratio);
        return (
          <g key={ratio}>
            <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#1e293b" strokeDasharray="4 4" />
            <text x={padding - 10} y={y + 4} textAnchor="end" fill="#64748b" fontSize={11}>
              {value >= 1000 ? `${value / 1000}k` : value}
            </text>
          </g>
        );
      })}
      {points.map((p) => (
        <text key={p.month} x={p.x} y={chartHeight - 10} textAnchor="middle" fill="#64748b" fontSize={11}>
          {p.month}
        </text>
      ))}
      <path d={areaD} fill="url(#chartGradient)" />
      <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth={2} />
      {points.map((p) => (
        <circle key={p.month} cx={p.x} cy={p.y} r={4} fill="#3b82f6" stroke="#0f172a" strokeWidth={2} />
      ))}
    </svg>
  );
}

const orders = [
  { id: '#ORD-001', customer: 'Maria Silva', amount: 'R$ 250,00', status: 'Concluído', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'João Santos', amount: 'R$ 180,50', status: 'Pendente', date: '2024-01-14' },
  { id: '#ORD-003', customer: 'Ana Oliveira', amount: 'R$ 320,00', status: 'Concluído', date: '2024-01-14' },
  { id: '#ORD-004', customer: 'Carlos Lima', amount: 'R$ 95,00', status: 'Cancelado', date: '2024-01-13' },
  { id: '#ORD-005', customer: 'Fernanda Costa', amount: 'R$ 410,75', status: 'Concluído', date: '2024-01-13' },
  { id: '#ORD-006', customer: 'Ricardo Alves', amount: 'R$ 175,25', status: 'Pendente', date: '2024-01-12' },
];

const statusColors: Record<string, string> = {
  'Concluído': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Pendente': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Cancelado': 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function handleLogout() {
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).finally(() => {
      router.push('/login');
    });
  }

  return (
    <div className="h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <div className="relative flex h-full">
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-slate-900/50 border-r border-slate-800 flex flex-col h-full min-h-0 transition-all duration-300 shrink-0`}
        >
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-5 h-5 text-blue-400" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-white text-lg truncate">Green Field</span>
            )}
          </div>

        <div className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: Users, label: 'Clientes' },
              { icon: ShoppingCart, label: 'Pedidos' },
              { icon: Eye, label: 'Produtos' },
              { icon: TrendingUp, label: 'Analytics' },
              { icon: Settings, label: 'Configurações' },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                  item.active
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 space-y-1 border-t border-slate-800 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-white transition"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5 shrink-0" /> : <ChevronRight className="w-5 h-5 shrink-0" />}
            {sidebarOpen && <span className="text-sm font-medium">Recolher</span>}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Sair</span>}
          </button>
        </div>
      </aside>
    </div>

    {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between px-6 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64"
              />
            </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <span className="text-blue-400 text-sm font-medium">A</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Receita Total', value: 'R$ 89.250', change: '+12.5%', icon: DollarSign, color: 'blue' },
              { label: 'Total de Pedidos', value: '1.234', change: '+8.2%', icon: ShoppingCart, color: 'emerald' },
              { label: 'Visitantes', value: '45.678', change: '+23.1%', icon: Eye, color: 'purple' },
              { label: 'Taxa de Conversão', value: '3.2%', change: '+2.1%', icon: TrendingUp, color: 'amber' },
            ].map((card) => (
              <div key={card.label} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-sm">{card.label}</span>
                  <div className={`w-10 h-10 rounded-lg bg-${card.color}-500/10 border border-${card.color}-500/20 flex items-center justify-center`}>
                    <card.icon className={`w-5 h-5 text-${card.color}-400`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
                <span className="text-emerald-400 text-sm font-medium">{card.change} este mês</span>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Receita Mensal</h2>
            <div className="h-80">
              <RevenueChart />
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-lg font-semibold text-white">Pedidos Recentes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Cliente</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Valor</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/30 transition">
                      <td className="px-6 py-4 text-sm text-blue-400 font-mono">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-white">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

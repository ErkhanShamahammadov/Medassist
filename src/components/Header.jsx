import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Activity, 
  Stethoscope, 
  Sliders, 
  UserCheck, 
  BarChart3, 
  Bell, 
  Sparkles, 
  Radio, 
  Clock, 
  HeartHandshake,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const Header = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    requests, 
    volunteers, 
    notifications, 
    isSimulating, 
    setIsSimulating,
    setShowSecurityModal 
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  const pendingCount = requests.filter(r => r.status === 'PENDING').length;
  const activeVolunteersCount = volunteers.filter(v => v.status === 'ACTIVE_SHIFT').length;
  const urgentCount = requests.filter(r => r.priority === 'URGENT' && r.status !== 'COMPLETED').length;

  const roles = [
    {
      id: 'STAFF',
      title: 'Медперсонал / Врач',
      subtitle: 'Быстрый вызов',
      icon: Stethoscope,
      badge: null,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300'
    },
    {
      id: 'COORDINATOR',
      title: 'Диспетчер / Координатор',
      subtitle: 'Управление потоком',
      icon: Sliders,
      badge: pendingCount > 0 ? `${pendingCount}` : null,
      badgeColor: 'bg-amber-500 text-slate-950',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300'
    },
    {
      id: 'VOLUNTEER',
      title: 'Терминал Волонтера',
      subtitle: 'Смена и задачи',
      icon: UserCheck,
      badge: 'PRO',
      badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300'
    },
    {
      id: 'ANALYTICS',
      title: 'Research & Data Hub',
      subtitle: 'Наука и метрики',
      icon: BarChart3,
      badge: '742 ops',
      badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300'
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border-b border-slate-800/50 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 overflow-x-auto py-0.5 no-scrollbar">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-medium whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Статус системы: Штатный режим</span>
            </div>

            <div className="flex items-center space-x-4 text-slate-400 text-[11px] whitespace-nowrap">
              <span className="flex items-center space-x-1">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>На смене волонтеров: <strong className="text-slate-200 font-semibold">{activeVolunteersCount} чел.</strong></span>
              </span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>В очереди: <strong className="text-slate-200 font-semibold">{pendingCount} заявок</strong></span>
              </span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center space-x-1">
                <HeartHandshake className="w-3 h-3 text-pink-400" />
                <span>Сэкономлено времени врачей: <strong className="text-slate-200 font-semibold">486.2 ч.</strong></span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            {/* Zero PII Security Badge */}
            <button
              onClick={() => setShowSecurityModal(true)}
              className="group flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-400/60 transition"
              title="Нажмите для аудита безопасности и политики Zero-PII"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium tracking-wide">Zero-PII HIPAA Compliant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Project Title */}
          <div className="flex items-center space-x-3.5 flex-shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 shadow-glow-teal p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse-subtle" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                  CareFlow
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  MedAssist
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium -mt-0.5 hidden sm:block">
                Hospital Volunteer Hub & Non-Clinical Dispatch
              </p>
            </div>
          </div>

          {/* Role Switcher Pills */}
          <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = currentRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setCurrentRole(role.id)}
                  className={`relative flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? `bg-slate-800 text-white shadow-md border border-slate-700`
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{role.title}</span>
                  {role.badge && (
                    <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${role.badgeColor || 'bg-slate-700 text-slate-300'}`}>
                      {role.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2.5">
            {/* Auto-Simulation Toggle */}
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                isSimulating
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 animate-pulse'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="Включить реалистичную симуляцию потока заявок в реальном времени"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">
                {isSimulating ? 'Симуляция: ВКЛ' : 'Симуляция потока'}
              </span>
            </button>

            {/* Notification Center */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              >
                <Bell className="w-4 h-4" />
                {urgentCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-slate-950 animate-bounce">
                    {urgentCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-white">Журнал событий</span>
                    </div>
                    <span className="text-xs text-slate-400">{notifications.length} событий</span>
                  </div>

                  <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs transition ${
                          n.type === 'urgent'
                            ? 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                            : n.type === 'success'
                            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                            : 'bg-slate-800/40 border-slate-700/40 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold mb-0.5">
                          <span className="flex items-center space-x-1.5">
                            {n.type === 'urgent' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                            {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            <span>{n.title}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Role Switcher (Scrollable) */}
        <div className="md:hidden flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-800/60">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setCurrentRole(role.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-glow-teal'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{role.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

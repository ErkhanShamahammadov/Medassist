import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ClipboardList, 
  Users, 
  Building2, 
  BarChart2, 
  Plus, 
  HeartHandshake,
  Clock,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export const Navbar = ({ onOpenNewRequest }) => {
  const { activeTab, setActiveTab, requests, volunteers, clearAllData } = useApp();

  const activeVolunteersCount = volunteers.filter(v => v.isOnShift).length;
  const pendingRequestsCount = requests.filter(r => r.status === 'NEW' || r.status === 'ASSIGNED').length;
  const completedTodayCount = requests.filter(r => r.status === 'COMPLETED').length;

  const navItems = [
    {
      id: 'requests',
      label: 'Заявки на помощь',
      icon: ClipboardList,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'volunteers',
      label: 'Волонтеры и смены',
      icon: Users,
      badge: activeVolunteersCount > 0 ? `${activeVolunteersCount} на смене` : null,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'departments',
      label: 'Отделения больницы',
      icon: Building2,
      badge: null
    },
    {
      id: 'analytics',
      label: 'Статистика и отчеты',
      icon: BarChart2,
      badge: null
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      
      {/* Top micro summary strip */}
      <div className="bg-slate-100/80 border-b border-slate-200/80 px-4 py-1.5 text-xs text-slate-600">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
            <span className="flex items-center space-x-1.5 font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Система готова к работе</span>
            </span>
            <span className="text-slate-300">|</span>
            <span>На смене: <strong className="text-slate-900 font-semibold">{activeVolunteersCount} чел.</strong></span>
            <span className="text-slate-300">|</span>
            <span>В обработке: <strong className="text-slate-900 font-semibold">{pendingRequestsCount} заявок</strong></span>
            <span className="text-slate-300">|</span>
            <span>Выполнено: <strong className="text-emerald-700 font-semibold">{completedTodayCount}</strong></span>
          </div>

          <button
            onClick={clearAllData}
            className="text-[11px] text-slate-500 hover:text-rose-600 transition flex items-center space-x-1"
            title="Очистить все данные и начать с чистого листа"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Сбросить данные</span>
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  MedAssist
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  Волонтеры
                </span>
              </div>
              <p className="text-xs text-slate-500 -mt-0.5 hidden sm:block">
                Помощь пациентам и разгрузка персонала
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-100 text-sky-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.2 rounded-full font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenNewRequest}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Создать заявку</span>
            </button>
          </div>

        </div>

        {/* Mobile Tabs bar */}
        <div className="md:hidden flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};

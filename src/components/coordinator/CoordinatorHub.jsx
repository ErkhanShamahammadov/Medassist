import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, 
  Layers, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  UserPlus, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Search,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { DepartmentMap } from './DepartmentMap';

export const CoordinatorHub = () => {
  const { 
    requests, 
    volunteers, 
    assignVolunteer, 
    startTask, 
    completeTask, 
    activeTab, 
    setActiveTab 
  } = useApp();

  const [selectedReqForAssign, setSelectedReqForAssign] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Kanban Columns
  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const assignedRequests = requests.filter(r => r.status === 'ASSIGNED');
  const inProgressRequests = requests.filter(r => r.status === 'IN_PROGRESS');
  const completedRequests = requests.filter(r => r.status === 'COMPLETED');

  // Smart Matching Recommendation Engine
  const getRecommendedVolunteer = (request) => {
    const activeVols = volunteers.filter(v => v.status === 'ACTIVE_SHIFT');
    if (activeVols.length === 0) return null;

    // Prioritize volunteers in same department or lowest workload
    const sameDept = activeVols.find(v => v.departmentId === request.departmentId);
    if (sameDept) return { vol: sameDept, reason: 'Находится на этом этаже' };

    // Otherwise volunteer with highest rating
    const topRated = [...activeVols].sort((a, b) => b.rating - a.rating)[0];
    return { vol: topRated, reason: 'Высокий рейтинг надежности (SLA)' };
  };

  const handleAutoAssign = (req) => {
    const recommendation = getRecommendedVolunteer(req);
    if (recommendation) {
      assignVolunteer(req.id, recommendation.vol.id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Coordinator Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Диспетчерский центр координации волонтеров</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Оперативное распределение потока заявок
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Контролируйте очередь, распределяйте задачи между волонтерами на смене и отслеживайте выполнение.
          </p>
        </div>

        {/* View mode tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-800 flex-shrink-0">
          {[
            { id: 'dispatch', label: 'Канбан-очередь', icon: Sliders },
            { id: 'map', label: '2.5D Карта этажей', icon: Layers },
            { id: 'team', label: 'Волонтеры & Смены', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-glow-teal'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View Switcher */}
      {activeTab === 'map' && <DepartmentMap />}

      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Список волонтеров отряда (12 школьников)
            </h2>
            <span className="text-xs text-slate-400">
              Активны сейчас: {volunteers.filter(v => v.status === 'ACTIVE_SHIFT').length} чел.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {volunteers.map((vol) => {
              const isActive = vol.status === 'ACTIVE_SHIFT';
              return (
                <div
                  key={vol.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    isActive
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-glow-teal'
                      : 'bg-slate-900/50 border-slate-800 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={vol.avatar}
                        alt={vol.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-white">{vol.name}</h4>
                        <p className="text-[11px] text-slate-400">{vol.school} • {vol.grade}</p>
                        <span className="text-[10px] font-mono text-cyan-400">{vol.phoneToken}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isActive ? 'На смене' : 'Не на смене'}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Часов:</span>
                      <strong className="text-emerald-400 font-bold">{vol.totalHours} ч</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Задач:</span>
                      <strong className="text-cyan-400 font-bold">{vol.completedTasks}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Рейтинг:</span>
                      <strong className="text-amber-400 font-bold">{vol.rating}★</strong>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {vol.badges.map((b, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px]">Локация: {vol.currentLocation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'dispatch' && (
        <div className="space-y-4">
          
          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Column 1: Pending Requests */}
            <div className="flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800 p-4 min-h-[500px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Ожидают волонтера
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                  {pendingRequests.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {pendingRequests.length === 0 ? (
                  <div className="h-40 flex items-center justify-center text-center text-xs text-slate-500">
                    Все заявки распределены 🎉
                  </div>
                ) : (
                  pendingRequests.map((req) => {
                    const recommendation = getRecommendedVolunteer(req);
                    return (
                      <div
                        key={req.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          req.priority === 'URGENT'
                            ? 'bg-rose-950/20 border-rose-500/40 shadow-glow-rose'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[11px] font-bold text-slate-400">
                            {req.id}
                          </span>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              req.priority === 'URGENT' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {req.priority}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs text-white leading-snug">
                          {req.helpTitle}
                        </h4>
                        
                        <p className="text-[11px] text-slate-400 mt-1 flex items-center">
                          <MapPin className="w-3 h-3 text-cyan-400 mr-1 flex-shrink-0" />
                          <span className="truncate">{req.departmentName}</span>
                        </p>

                        <p className="text-[10px] text-slate-400 italic mt-2 line-clamp-2">
                          "{req.staffNote}"
                        </p>

                        {/* Smart AI Match Box */}
                        {recommendation && (
                          <div className="mt-3 p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-[11px]">
                            <div className="flex items-center justify-between text-emerald-300 font-semibold mb-1">
                              <span className="flex items-center">
                                <Sparkles className="w-3 h-3 mr-1 text-emerald-400" />
                                Рекомендация:
                              </span>
                              <span className="text-[10px] text-slate-400">{recommendation.vol.rating}★</span>
                            </div>
                            <p className="text-slate-300 font-medium">{recommendation.vol.name}</p>
                            <p className="text-[10px] text-emerald-400/80">{recommendation.reason}</p>

                            <button
                              onClick={() => handleAutoAssign(req)}
                              className="mt-2 w-full py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-sm transition"
                            >
                              Назначить ({recommendation.vol.name.split(' ')[0]})
                            </button>
                          </div>
                        )}

                        {/* Manual Assignment Selector */}
                        <div className="mt-2">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                assignVolunteer(req.id, e.target.value);
                              }
                            }}
                            defaultValue=""
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[11px] focus:outline-none"
                          >
                            <option value="" disabled>Выбрать вручную...</option>
                            {volunteers.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.name} ({v.status === 'ACTIVE_SHIFT' ? 'На смене' : 'Оффлайн'})
                              </option>
                            ))}
                          </select>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Column 2: Assigned */}
            <div className="flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800 p-4 min-h-[500px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Назначен волонтер
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs">
                  {assignedRequests.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {assignedRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-slate-400">{req.id}</span>
                      <span className="text-[10px] text-cyan-400 font-semibold">{req.acceptedAt}</span>
                    </div>
                    <h4 className="font-bold text-xs text-white">{req.helpTitle}</h4>
                    <p className="text-[11px] text-slate-400">{req.departmentName}</p>
                    
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <span className="text-[10px] text-slate-500 block">Исполнитель:</span>
                      <span className="font-bold text-emerald-400">{req.assignedVolunteerName}</span>
                    </div>

                    <button
                      onClick={() => startTask(req.id)}
                      className="w-full py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-semibold text-xs transition"
                    >
                      Перевести: В пути →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: In Progress */}
            <div className="flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800 p-4 min-h-[500px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    В процессе
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs">
                  {inProgressRequests.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {inProgressRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-purple-300">{req.id}</span>
                      <span className="text-[10px] text-purple-300 font-mono">Старт: {req.startedAt || '13:10'}</span>
                    </div>
                    <h4 className="font-bold text-xs text-white">{req.helpTitle}</h4>
                    <p className="text-[11px] text-slate-300">{req.assignedVolunteerName}</p>

                    <button
                      onClick={() => completeTask(req.id, 25)}
                      className="w-full py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-glow-teal transition"
                    >
                      Завершить заявку ✓
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Completed */}
            <div className="flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800 p-4 min-h-[500px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Выполнено
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                  {completedRequests.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {completedRequests.slice(0, 5).map((req) => (
                  <div key={req.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1 opacity-80 hover:opacity-100 transition">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-400">{req.id}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">+{req.durationMinutes || 20} мин</span>
                    </div>
                    <p className="font-semibold text-slate-200 text-xs">{req.helpTitle}</p>
                    <p className="text-[10px] text-slate-500">Волонтер: {req.assignedVolunteerName}</p>
                    {req.rating && (
                      <p className="text-[10px] text-amber-300 font-bold">★ {req.rating}.0 отзыв врача</p>
                    )}
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

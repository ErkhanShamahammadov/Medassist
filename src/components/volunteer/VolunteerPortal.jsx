import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Play, 
  Pause, 
  Power, 
  Sparkles, 
  AlertTriangle, 
  ChevronRight, 
  Star, 
  ShieldCheck,
  Building,
  Timer
} from 'lucide-react';
import { VolunteerCertificate } from './VolunteerCertificate';

export const VolunteerPortal = () => {
  const { 
    volunteers, 
    selectedVolunteerId, 
    setSelectedVolunteerId, 
    activeVolunteer, 
    requests, 
    toggleVolunteerShift, 
    assignVolunteer,
    startTask, 
    completeTask 
  } = useApp();

  const [isCertOpen, setIsCertOpen] = useState(false);
  const [taskStopwatch, setTaskStopwatch] = useState(0);

  // Active volunteer's current tasks
  const myAssignedRequests = requests.filter(
    r => r.assignedVolunteerId === selectedVolunteerId && (r.status === 'ASSIGNED' || r.status === 'IN_PROGRESS')
  );
  
  const currentActiveTask = myAssignedRequests[0];

  const myCompletedRequests = requests.filter(
    r => r.assignedVolunteerId === selectedVolunteerId && r.status === 'COMPLETED'
  );

  const availablePendingRequests = requests.filter(r => r.status === 'PENDING');

  // Active stopwatch when in progress
  useEffect(() => {
    let timer = null;
    if (currentActiveTask?.status === 'IN_PROGRESS') {
      timer = setInterval(() => {
        setTaskStopwatch(prev => prev + 1);
      }, 1000);
    } else {
      setTaskStopwatch(0);
    }
    return () => clearInterval(timer);
  }, [currentActiveTask?.status]);

  const formatStopwatch = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isOnShift = activeVolunteer.status === 'ACTIVE_SHIFT';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Volunteer Profile Header & Switcher */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={activeVolunteer.avatar}
                alt={activeVolunteer.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-glow-teal"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                  isOnShift ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{activeVolunteer.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-bold border border-emerald-500/30">
                  {activeVolunteer.rating} ★
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeVolunteer.school} • {activeVolunteer.grade}
              </p>
              <p className="text-[11px] text-cyan-400 mt-0.5">
                {isOnShift ? `На смене с ${activeVolunteer.shiftStartTime}` : 'Смена закрыта (Оффлайн)'}
              </p>
            </div>
          </div>

          {/* Action buttons: Shift Toggle & Certificate */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => toggleVolunteerShift(activeVolunteer.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-md ${
                isOnShift
                  ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                  : 'bg-emerald-500 hover:brightness-110 text-slate-950 shadow-glow-teal'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isOnShift ? 'Завершить смену' : 'Выйти на смену (Check-In)'}</span>
            </button>

            <button
              onClick={() => setIsCertOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-bold transition"
              title="Открыть официальный сертификат волонтера с подтвержденными часами"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Сертификат</span>
            </button>
          </div>

        </div>

        {/* Volunteer Identity Switcher Pill for Demo Pair Programming */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-500 text-[11px] whitespace-nowrap">Сменить профиль:</span>
          {volunteers.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVolunteerId(v.id)}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition ${
                selectedVolunteerId === v.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              {v.name.split(' ')[0]} ({v.totalHours}ч)
            </button>
          ))}
        </div>

      </div>

      {/* Volunteer Live Shift Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Всего часов:</span>
          <span className="text-2xl font-black text-emerald-400">{activeVolunteer.totalHours} ч</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Выполнено задач:</span>
          <span className="text-2xl font-black text-cyan-400">{activeVolunteer.completedTasks}</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Средний SLA отклика:</span>
          <span className="text-2xl font-black text-purple-400">3.8 мин</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Рейтинг от врачей:</span>
          <span className="text-2xl font-black text-amber-400">{activeVolunteer.rating} ★</span>
        </div>
      </div>

      {/* Current Active Task in Focus */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span>Текущее активное задание</span>
          {currentActiveTask && (
            <span className="text-emerald-400 text-[11px] font-bold animate-pulse">
              В работе прямо сейчас
            </span>
          )}
        </h3>

        {currentActiveTask ? (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border-2 border-emerald-500/50 p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-lg">
                  {currentActiveTask.id}
                </span>
                <span className="text-xs font-bold text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded-lg border border-rose-500/30">
                  {currentActiveTask.priority}
                </span>
              </div>

              {currentActiveTask.status === 'IN_PROGRESS' && (
                <div className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-400 font-mono text-sm font-bold">
                  <Timer className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>{formatStopwatch(taskStopwatch)}</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-white">
                {currentActiveTask.helpTitle}
              </h2>
              <p className="text-xs text-slate-300 mt-1 flex items-center">
                <MapPin className="w-4 h-4 text-cyan-400 mr-1.5 flex-shrink-0" />
                {currentActiveTask.departmentName}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Инструкция от врача:</span>
              "{currentActiveTask.staffNote}"
            </div>

            {/* Step Progression Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentActiveTask.status === 'ASSIGNED' ? (
                <button
                  onClick={() => startTask(currentActiveTask.id)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold text-sm hover:brightness-110 shadow-glow-cyan transition"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Я на месте • Начать выполнение</span>
                </button>
              ) : (
                <button
                  onClick={() => completeTask(currentActiveTask.id, 25)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm hover:brightness-110 shadow-glow-teal transition"
                >
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  <span>Завершить задачу (+25 мин к часам)</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">У вас нет активных заданий</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Вы можете взять свободную заявку из списка ниже или дождаться назначения координатором.
            </p>
          </div>
        )}
      </div>

      {/* Available Pending Hospital Calls to Self-Claim */}
      {availablePendingRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Доступные свободные вызовы в больнице ({availablePendingRequests.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availablePendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-400">{req.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.priority === 'URGENT' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {req.priority}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white">{req.helpTitle}</h4>
                  <p className="text-[11px] text-slate-400">{req.departmentName}</p>
                </div>

                <button
                  onClick={() => assignVolunteer(req.id, activeVolunteer.id)}
                  disabled={!isOnShift}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition ${
                    isOnShift
                      ? 'bg-emerald-500 text-slate-950 hover:brightness-110 shadow-glow-teal'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isOnShift ? 'Взять в работу →' : 'Сначала выйдите на смену'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed tasks history */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          История выполненных вами вызовов ({myCompletedRequests.length})
        </h3>

        <div className="space-y-2">
          {myCompletedRequests.map((req) => (
            <div
              key={req.id}
              className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-slate-400">{req.id}</span>
                  <span className="font-bold text-slate-200">{req.helpTitle}</span>
                </div>
                <p className="text-[11px] text-slate-500">{req.departmentName} • {req.staffMember}</p>
                {req.feedback && (
                  <p className="text-[11px] text-amber-300 italic mt-0.5">
                    ★ {req.rating}.0 "{req.feedback}"
                  </p>
                )}
              </div>

              <span className="font-mono text-emerald-400 font-bold text-xs">
                +{req.durationMinutes || 20} мин
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <VolunteerCertificate
        volunteer={activeVolunteer}
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
      />

    </div>
  );
};

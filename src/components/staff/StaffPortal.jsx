import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Stethoscope, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  MessageSquare, 
  Send, 
  Users, 
  Timer, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight
} from 'lucide-react';
import { NewRequestModal } from './NewRequestModal';
import { DEPARTMENTS } from '../../data/departments';
import { HELP_TYPES } from '../../data/helpTypes';

export const StaffPortal = () => {
  const { requests, volunteers, submitFeedback } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [feedbackRating, setFeedbackRating] = useState({});
  const [feedbackText, setFeedbackText] = useState({});
  const [activeFeedbackId, setActiveFeedbackId] = useState(null);

  const filteredRequests = requests.filter(r => {
    if (selectedDeptFilter === 'ALL') return true;
    return r.departmentId === selectedDeptFilter;
  });

  const activeVolunteersCount = volunteers.filter(v => v.status === 'ACTIVE_SHIFT').length;
  const pendingRequestsCount = requests.filter(r => r.status === 'PENDING').length;
  const completedToday = requests.filter(r => r.status === 'COMPLETED').length;

  const handleSendFeedback = (reqId) => {
    const rating = feedbackRating[reqId] || 5;
    const text = feedbackText[reqId] || 'Спасибо за оперативную и бережную помощь пациенту!';
    submitFeedback(reqId, rating, text);
    setActiveFeedbackId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Welcome / Action Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Панель медицинского персонала стационара</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Заявки на немедицинскую помощь пациентам
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Освободите время врачей и медсестер для лечения. Волонтерская служба возьмет на себя сопровождение на диагностику, перевозку на креслах-колясках и доставку анализов.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-glow-teal hover:brightness-110 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Создать вызов волонтера</span>
            </button>
          </div>
        </div>

        {/* Quick stat cards inside banner */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <span className="text-slate-400 block text-[11px]">Волонтеров на смене:</span>
            <span className="text-lg font-bold text-emerald-400">{activeVolunteersCount} чел.</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <span className="text-slate-400 block text-[11px]">Среднее время подачи:</span>
            <span className="text-lg font-bold text-cyan-400">~4.5 мин</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <span className="text-slate-400 block text-[11px]">Заявок в очереди:</span>
            <span className="text-lg font-bold text-amber-400">{pendingRequestsCount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
            <span className="text-slate-400 block text-[11px]">Успешно выполнено сегодня:</span>
            <span className="text-lg font-bold text-slate-200">{completedToday} задач</span>
          </div>
        </div>
      </div>

      {/* Department Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center space-x-2 overflow-x-auto py-1 no-scrollbar">
          <button
            onClick={() => setSelectedDeptFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedDeptFilter === 'ALL'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-glow-teal'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Все отделения ({requests.length})
          </button>

          {DEPARTMENTS.slice(0, 5).map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDeptFilter(d.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                selectedDeptFilter === d.id
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800/60 hover:text-slate-200'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Текущие и завершенные вызовы
          </h2>
          <span className="text-xs text-slate-400">
            Показано: {filteredRequests.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRequests.map((req) => {
            const isCompleted = req.status === 'COMPLETED';
            const isPending = req.status === 'PENDING';
            const isInProgress = req.status === 'IN_PROGRESS';
            const isAssigned = req.status === 'ASSIGNED';

            return (
              <div
                key={req.id}
                className={`group relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 glass-card-glow ${
                  req.priority === 'URGENT' && !isCompleted
                    ? 'bg-rose-950/20 border-rose-500/40 shadow-glow-rose'
                    : isCompleted
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-90'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                <div>
                  {/* Top status line */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                      {req.id}
                    </span>

                    {/* Priority badge */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        req.priority === 'URGENT'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                          : req.priority === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {req.priority === 'URGENT' ? 'Экстренно' : req.priority === 'HIGH' ? 'Высокий' : 'Плановый'}
                    </span>
                  </div>

                  {/* Title & Help Type */}
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    {req.helpTitle}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1 flex-shrink-0" />
                    <span className="truncate">{req.departmentName}</span>
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                    <p className="line-clamp-2 italic">"{req.staffNote}"</p>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Автор: {req.staffMember}</span>
                      <span>Токен: {req.anonymousPatientTag}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom status & action block */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Статус:</span>
                      <span
                        className={`text-xs font-semibold flex items-center space-x-1.5 ${
                          isPending
                            ? 'text-amber-400'
                            : isAssigned
                            ? 'text-cyan-400'
                            : isInProgress
                            ? 'text-purple-400 animate-pulse'
                            : 'text-emerald-400'
                        }`}
                      >
                        {isPending && <Clock className="w-3.5 h-3.5" />}
                        {isAssigned && <Users className="w-3.5 h-3.5" />}
                        {isInProgress && <Timer className="w-3.5 h-3.5" />}
                        {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                        <span>
                          {isPending && 'Ожидает волонтера'}
                          {isAssigned && `Назначен: ${req.assignedVolunteerName}`}
                          {isInProgress && `В пути: ${req.assignedVolunteerName}`}
                          {isCompleted && `Выполнено (+${req.durationMinutes || 20}м)`}
                        </span>
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-500 font-mono">
                      {req.createdAt}
                    </span>
                  </div>

                  {/* Feedback button for staff on completed tasks */}
                  {isCompleted && !req.rating && (
                    <div className="mt-3">
                      {activeFeedbackId === req.id ? (
                        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2 animate-in fade-in">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setFeedbackRating({ ...feedbackRating, [req.id]: star })}
                                className="p-1 hover:scale-125 transition-transform"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    star <= (feedbackRating[req.id] || 5)
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-slate-600'
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="text-[11px] text-amber-300 font-bold ml-1">
                              {feedbackRating[req.id] || 5} из 5
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Короткий отзыв врачу/координатору..."
                            value={feedbackText[req.id] || ''}
                            onChange={(e) => setFeedbackText({ ...feedbackText, [req.id]: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setActiveFeedbackId(null)}
                              className="text-[10px] text-slate-400 px-2 py-1"
                            >
                              Отмена
                            </button>
                            <button
                              onClick={() => handleSendFeedback(req.id)}
                              className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:brightness-110"
                            >
                              Отправить
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveFeedbackId(req.id)}
                          className="w-full flex items-center justify-center space-x-1.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-400" />
                          <span>Оценить работу волонтера</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Rating already given */}
                  {req.rating && (
                    <div className="mt-2.5 p-2 rounded-xl bg-slate-950/80 border border-amber-500/20 flex items-center justify-between text-xs text-amber-300">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold">{req.rating}.0 / 5.0</span>
                      </div>
                      <span className="text-[11px] text-slate-400 italic truncate max-w-[180px]">
                        "{req.feedback}"
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Request Modal */}
      <NewRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

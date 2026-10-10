import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Search, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Trash2, 
  Star, 
  MapPin, 
  AlertCircle,
  Play,
  Check,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

export const RequestsView = ({ onOpenNewRequest }) => {
  const { 
    requests, 
    volunteers, 
    assignVolunteerToRequest, 
    startRequestTask, 
    completeRequestTask, 
    rateRequest, 
    deleteRequest,
    exportToCSV
  } = useApp();

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDurationMap, setActiveDurationMap] = useState({});
  const [ratingInputs, setRatingInputs] = useState({});
  const [feedbackInputs, setFeedbackInputs] = useState({});

  // Filter requests
  const filteredRequests = requests.filter(req => {
    if (filterStatus !== 'ALL' && req.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = req.id.toLowerCase().includes(q);
      const matchDept = req.departmentName.toLowerCase().includes(q);
      const matchType = req.helpCategoryTitle.toLowerCase().includes(q);
      const matchVol = req.assignedVolunteerName && req.assignedVolunteerName.toLowerCase().includes(q);
      if (!matchId && !matchDept && !matchType && !matchVol) return false;
    }
    return true;
  });

  const activeVolunteers = volunteers.filter(v => v.isOnShift);

  const handleComplete = (reqId) => {
    const mins = activeDurationMap[reqId] || 20;
    completeRequestTask(reqId, mins);
  };

  const handleSaveRating = (reqId) => {
    const r = ratingInputs[reqId] || 5;
    const f = feedbackInputs[reqId] || 'Отличная и своевременная работа волонтера!';
    rateRequest(reqId, r, f);
  };

  return (
    <div className="space-y-5">
      
      {/* Top action & filters bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Status filters */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'Все заявки', count: requests.length },
            { id: 'NEW', label: 'Ожидают', count: requests.filter(r => r.status === 'NEW').length },
            { id: 'IN_PROGRESS', label: 'В работе', count: requests.filter(r => r.status === 'IN_PROGRESS' || r.status === 'ASSIGNED').length },
            { id: 'COMPLETED', label: 'Выполнены', count: requests.filter(r => r.status === 'COMPLETED').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterStatus === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Search & Export */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по номеру, отделению..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            title="Выгрузить в Excel / CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden md:inline">Экспорт в Excel</span>
          </button>
        </div>

      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {requests.length === 0 ? 'Заявок пока нет' : 'Нет заявок по выбранному фильтру'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {requests.length === 0 
              ? 'Создайте первую реальную заявку на сопровождение пациента, транспортировку или доставку документов.'
              : 'Попробуйте изменить поисковый запрос или сбросить фильтр статусов.'}
          </p>
          {requests.length === 0 && (
            <button
              onClick={onOpenNewRequest}
              className="mt-2 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Создать первую заявку</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRequests.map((req) => {
            const isCompleted = req.status === 'COMPLETED';
            const isNew = req.status === 'NEW';
            const isAssigned = req.status === 'ASSIGNED';
            const isInProgress = req.status === 'IN_PROGRESS';

            return (
              <div
                key={req.id}
                className={`bg-white rounded-2xl border p-4 shadow-sm flex flex-col justify-between transition ${
                  req.priority === 'Срочно' && !isCompleted
                    ? 'border-rose-300 ring-1 ring-rose-200'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  
                  {/* Top card bar */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {req.id}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {req.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.priority === 'Срочно'
                            ? 'bg-rose-100 text-rose-800'
                            : req.priority === 'Обычный'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {req.priority}
                      </span>

                      <button
                        onClick={() => deleteRequest(req.id)}
                        className="text-slate-300 hover:text-rose-600 p-1 rounded transition"
                        title="Удалить заявку"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Help info */}
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {req.helpCategoryTitle}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-sky-600 mr-1 flex-shrink-0" />
                    <span className="font-medium">{req.departmentName}</span>
                    <span className="text-slate-400 ml-1">({req.location})</span>
                  </p>

                  {req.note && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2 italic">
                      "{req.note}"
                    </p>
                  )}

                  <div className="text-[11px] text-slate-400 mt-1">
                    Врач: {req.staffName}
                  </div>

                </div>

                {/* Bottom Workflow Action Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  
                  {/* Status: NEW - assign volunteer */}
                  {isNew && (
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Назначить волонтера:
                      </label>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            assignVolunteerToRequest(req.id, e.target.value);
                          }
                        }}
                        defaultValue=""
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="" disabled>Выберите человека из отряда...</option>
                        {volunteers.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name} ({v.isOnShift ? '✓ На смене' : 'Оффлайн'}) — {v.totalHours}ч
                          </option>
                        ))}
                      </select>
                      {volunteers.length === 0 && (
                        <p className="text-[10px] text-amber-700">
                          * Волонтеры еще не добавлены. Перейдите во вкладку «Волонтеры».
                        </p>
                      )}
                    </div>
                  )}

                  {/* Status: ASSIGNED - start work */}
                  {isAssigned && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Исполнитель:</span>
                        <strong className="text-sky-800 font-semibold">{req.assignedVolunteerName}</strong>
                      </div>
                      <button
                        onClick={() => startRequestTask(req.id)}
                        className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Волонтер прибыл • В работу</span>
                      </button>
                    </div>
                  )}

                  {/* Status: IN_PROGRESS - complete task */}
                  {isInProgress && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Выполняет:</span>
                        <strong className="text-sky-800 font-semibold">{req.assignedVolunteerName}</strong>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <input
                            type="number"
                            min="5"
                            max="180"
                            placeholder="Минут (напр. 20)"
                            defaultValue={20}
                            onChange={(e) => setActiveDurationMap({ ...activeDurationMap, [req.id]: e.target.value })}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs text-center"
                          />
                        </div>
                        <button
                          onClick={() => handleComplete(req.id)}
                          className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Завершить ✓</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Status: COMPLETED - view feedback or add rating */}
                  {isCompleted && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-emerald-700 font-semibold flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Выполнено (+{req.durationMinutes} мин)
                        </span>
                        <span className="text-slate-400 text-[11px]">{req.assignedVolunteerName}</span>
                      </div>

                      {/* Rating section */}
                      {!req.rating ? (
                        <div className="mt-2 p-2 rounded-lg bg-slate-100 space-y-1.5 text-xs">
                          <span className="text-slate-600 block text-[11px] font-medium">Оценить работу (1-5):</span>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRatingInputs({ ...ratingInputs, [req.id]: star })}
                                className="p-0.5 hover:scale-110"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    star <= (ratingInputs[req.id] || 5)
                                      ? 'text-amber-500 fill-amber-500'
                                      : 'text-slate-300'
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="text-[11px] text-slate-700 font-semibold ml-1">
                              {ratingInputs[req.id] || 5} из 5
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Отзыв медсестры/врача..."
                            value={feedbackInputs[req.id] || ''}
                            onChange={(e) => setFeedbackInputs({ ...feedbackInputs, [req.id]: e.target.value })}
                            className="w-full px-2 py-1 rounded border border-slate-300 text-xs"
                          />
                          <button
                            onClick={() => handleSaveRating(req.id)}
                            className="w-full py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold rounded"
                          >
                            Сохранить оценку
                          </button>
                        </div>
                      ) : (
                        <div className="mt-1 p-2 rounded-lg bg-amber-50/80 border border-amber-200 text-xs">
                          <div className="flex items-center space-x-1 text-amber-800 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{req.rating} / 5</span>
                          </div>
                          {req.feedback && (
                            <p className="text-[11px] text-amber-900 mt-0.5 italic">"{req.feedback}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

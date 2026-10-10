import React, { useState } from 'react';
import { 
  PlusCircle, 
  X, 
  Clock, 
  MapPin, 
  Shield, 
  Send, 
  Compass, 
  Accessibility, 
  FileText, 
  Smile, 
  Coffee, 
  Package,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS } from '../../data/departments';
import { HELP_TYPES } from '../../data/helpTypes';

const iconMap = {
  Compass,
  Accessibility,
  FileText,
  Smile,
  Coffee,
  Package
};

export const NewRequestModal = ({ isOpen, onClose }) => {
  const { createRequest } = useApp();

  const [departmentId, setDepartmentId] = useState('cardiology');
  const [helpTypeId, setHelpTypeId] = useState('navigation');
  const [priority, setPriority] = useState('NORMAL');
  const [room, setRoom] = useState('');
  const [staffMember, setStaffMember] = useState('Др. Смирнова Е.В.');
  const [staffNote, setStaffNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    createRequest({
      departmentId,
      helpTypeId,
      priority,
      room: room || 'Пост дежурной сестры',
      staffMember: staffMember || 'Дежурный персонал',
      staffNote: staffNote || 'Требуется сопровождение / немедицинская помощь.'
    });
    onClose();
  };

  const selectedHelp = HELP_TYPES.find(h => h.id === helpTypeId) || HELP_TYPES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Экспресс-создание немедицинской заявки</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Новая заявка на помощь волонтера
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Заполните параметры задачи. Система автоматически уведомит координатора и волонтеров на смене.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. Выберите тип помощи */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              1. Категория необходимой помощи
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {HELP_TYPES.map((ht) => {
                const IconComponent = iconMap[ht.icon] || Compass;
                const isSelected = helpTypeId === ht.id;
                return (
                  <button
                    type="button"
                    key={ht.id}
                    onClick={() => {
                      setHelpTypeId(ht.id);
                      if (ht.urgencyDefault === 'HIGH' && priority === 'LOW') {
                        setPriority('HIGH');
                      }
                    }}
                    className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30 text-white shadow-glow-teal'
                        : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className={`p-2 rounded-xl mb-2 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700/60 text-slate-300'}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold leading-snug line-clamp-2">{ht.title}</span>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1 inline" /> ~{ht.estimatedMinutes} мин
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Отделение и палата */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                2. Отделение стационара
              </label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.building}, {dept.floor} эт.)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Палата / Точка встречи
              </label>
              <input
                type="text"
                placeholder="напр. Палата 312 / Кабинет МРТ"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 3. Приоритет срочности */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              3. Срочность выполнения
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'URGENT', label: 'Экстренно (< 10 мин)', color: 'border-rose-500 text-rose-300 bg-rose-950/40 ring-rose-500/30' },
                { id: 'NORMAL', label: 'Обычный (плановый)', color: 'border-emerald-500 text-emerald-300 bg-emerald-950/40 ring-emerald-500/30' },
                { id: 'LOW', label: 'Низкий (в течение дня)', color: 'border-slate-500 text-slate-300 bg-slate-800/80 ring-slate-500/30' }
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium text-center transition ${
                    priority === p.id ? `${p.color} ring-2 font-bold` : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Примечание и сотрудник */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                ФИО врача/медсестры (для обратной связи)
              </label>
              <input
                type="text"
                value={staffMember}
                onChange={(e) => setStaffMember(e.target.value)}
                placeholder="напр. Др. Смирнова Е.В."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Инструкция для волонтера
              </label>
              <textarea
                rows={2}
                value={staffNote}
                onChange={(e) => setStaffNote(e.target.value)}
                placeholder="напр. Встретить у поста и проводить до кабинета 104 на ЭКГ, затем вернуть обратно."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Zero-PII notice box */}
          <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Заявка будет создана под анонимным кодом без разглашения медицинских данных пациента.</span>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-glow-teal transition transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Создать и отправить вызов</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
